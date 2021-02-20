import React, { useEffect, useState } from 'react';
import '../containers/stylesheets/product/style.css';
import Layout from './layout';
import { Container, Col, Row, Button, Form, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct } from '../redux/store';
import Modal from '../components/UI/Modals';
import { urlgenerate } from '../urlConfig';

function Product(props) {
    const [show, setShow] = useState(false);
    const [ProductShow,setProductShow]=useState(false);

    const category = useSelector(state => state.category);
    const product = useSelector(state => state.product);

    const [ProductName, setProductName] = useState('');
    const [ProductPrice, setProductPrice] = useState('');
    const [ProductQuantity, setProductQuantity] = useState('');
    const [ProductDescription, setProductDescription] = useState('');
    const [productDetails,setproductDetails] = useState(null);
    const [ProductCategoryId, setProductCategoryId] = useState('');
    const [productPictures, setProductPictures] = useState([]);

    const dispatch = useDispatch();

    const handleClose = () => setShow(false);
    


    const SavehandleClose = () => { 
        let form = new FormData();
        form.append("name", ProductName);
        form.append("price", ProductPrice);
        form.append("quantity", ProductQuantity);
        form.append("description", ProductDescription);
        form.append("category", ProductCategoryId);

        for (let pic of productPictures) {
            form.append("productPictures", pic);
        }


        dispatch(addProduct(form));



        setProductName('');
        setProductPrice('');
        setProductQuantity('');
        setProductDescription('');
        setProductCategoryId('');
        setShow(false)
    };

    const handleShow = () => setShow(true);
    

    const ProducthandleClose = () => setProductShow(false);
    
    const ProducthandleShow =(product) => {
        setproductDetails(product);
        setProductShow(true);
    }

    const handleProductPictures = (e) => {
        setProductPictures([
            ...productPictures,
            e.target.files[0]
        ]);

    }


    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({
                value: category._id, name: category.name,type: category.type

            })
            if (category.children.length > 0) {
                createCategoryList(category.children, options);
            }

        }
        return options;
    }

    const renderTableModalDetails = () => {
        return (
            <Modal
                show={show}
                handleClose={handleClose}
                SavehandleClose={SavehandleClose}
                ModalTitle={'Add New Product'}
            >

                <Form.Group controlId="Product Name" style={{ marginTop: '1rem' }}>
                    <Form.Control type="text" value={ProductName} placeholder="ProductName" onChange={e => setProductName(e.target.value)} autoComplete="off" />
                </Form.Group>
                <Form.Group controlId="Product Price" style={{ marginTop: '1rem' }}>
                    <Form.Control type="text" value={ProductPrice} placeholder="ProductPrice" onChange={e => setProductPrice(e.target.value)} autoComplete="off" />
                </Form.Group>
                <Form.Group controlId="Product Quantity" style={{ marginTop: '1rem' }}>
                    <Form.Control type="text" value={ProductQuantity} placeholder="ProductQuantity" onChange={e => setProductQuantity(e.target.value)} autoComplete="off" />
                </Form.Group>
                <Form.Group controlId="Product Description" style={{ marginTop: '1rem' }}>
                    <Form.Control type="text" value={ProductDescription} placeholder="ProductDescription" onChange={e => setProductDescription(e.target.value)} autoComplete="off" />
                </Form.Group>

                <select className="form-control"
                    value={ProductCategoryId}
                    onChange={e => setProductCategoryId(e.target.value)}>
                    <option>Select Categories</option>
                    {
                        createCategoryList(category.categories).map(option =>
                            <option key={option.value} value={option.value}>{option.name}</option>
                        )}
                </select>

                <Form.Group >
                    {
                        productPictures.length > 0 ?
                            productPictures.map((pic, index) => <div key={index}>{pic.name}</div>) : null
                    }
                    <Form.Control type='file' name="productPictures" onChange={handleProductPictures} />
                </Form.Group>

            </Modal>

        );
    }

    const renderProducts = () => {
        return (
            <Table striped bordered hover responsive="sm" style={{ marginTop: "2rem",fontSize:"12px" }}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {product.products.length > 0 ?
                       product.products.map((product,index)=>{
                           return(
                            <tr key={product._id} onClick={()=>ProducthandleShow(product)}>
                            <td>{index+1}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>{product.category.name}</td>
                        </tr>
                           )
                       }):
                       <tr>
                           <td colSpan="">No records Found</td>
                       </tr>
                    }
                </tbody>
            </Table>

        )
    }
   
    const renderProductDetailsModal = ()=>{
        if(!productDetails){
            return null;
            }

           
        return(
            <Modal
            size="lg"
            show={ProductShow}
                handleClose={ProducthandleClose}
                ModalTitle={'ProductDetails'}
            >
               <Row>
                   <Col md={6}>
                       <label className="key">Product Name</label>
                       <p className="value">{productDetails.name}</p>
                   </Col>
                   <Col md={6}>
                      <label className="key">Price</label>
                       <p className="value">{productDetails.price}</p>
                   </Col>
               </Row> 
               <Row>
               <Col md={6}>
                       <label className="key">Quantity</label>
                       <p className="value">{productDetails.quantity}</p>
                   </Col>
                   <Col md={6}>
                      <label className="key">Category</label>
                       <p className="value">{productDetails.category.name}</p>
                   </Col>
               </Row>
               <Row>
                   <Col md={12}>
                   <label className="key">Description</label>
                       <p className="value">{productDetails.description}</p>
                   </Col>
               </Row>
               <Row>
                   <Col >
                   <label className="key">Product Pictures</label>
                   <div style={{display:"flex"}}>
                   {
                       productDetails.productPictures.map(picture=>
                           <div className="imageContainer">
                               <img src={urlgenerate(picture.img)} />
                           </div>
                       )
                   }
                   </div>
                   </Col>
               </Row>
            </Modal>
        )
    }




    return (
        <>
            <Layout sidebar>
                <Container fluid>
                    <Row>
                        <Col md={12} style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
                            <h1>Products</h1>
                            <Button variant="secondary" onClick={handleShow} style={{ padding: "2px 10px", color: "white", fontWeight: "bold" }}>ADD Products</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            {renderProducts()}
                        </Col>
                    </Row>
                </Container>
                {renderTableModalDetails()}
                {renderProductDetailsModal()}
            </Layout>
        </>
    )
}

export default Product;