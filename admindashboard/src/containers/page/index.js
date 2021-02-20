import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoIosPaper } from 'react-icons/io';
import { Button, Container, Row, Col } from 'react-bootstrap';
import Layout from '../layout/index';
import linearCategories from '../category/component/linearCategories';
import AddPageModal from './component/addPageModal';
import { createPage } from '../../redux/store';


function PageContainer(props) {


    const page = useSelector(state=>state.page); 

    useEffect(()=>{
        if(!page.loading){
            setShow(false);
            setPageTitle('');
            setPageDesc('');
            setCategoryId('');
            setType('');
            setBanners([]);
            setProducts([]);
        }
    },[page])

    const [PageTitle, setPageTitle] = useState('');
    const [PageDesc, setPageDesc] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);
    const [type,setType]= useState('');

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const category = useSelector(state => state.category);
    const [categories, setCategories] = useState([]);

    

    const dispatch = useDispatch();

    const SavehandleClose = (e) => {

      e.preventDefault();

      if(PageTitle === ""){
        alert ('Title is required');
        setShow(false);
        return;
    }

        const form = new FormData();
        form.append("title", PageTitle);
        form.append("category", categoryId);
        form.append("description", PageDesc);
        form.append("type",type);

        banners.forEach((banner,index)=>{
            form.append("banners", banner);
        })
        products.forEach((product,index)=>{
            form.append("products", product);
        })

          
        dispatch(createPage(form));

       
        setShow(false)
    }

    useEffect(() => {
        setCategories(linearCategories(category.categories));
    }, [category]);

    const handleBannerImages = (e) => {
        setBanners([
            ...banners,
            e.target.files[0]
        ]);

    }

    const onCategoryChange = (e) =>{
        const  Category = categories.find(category=>category._id == e.target.value);
        setCategoryId(e.target.value);
        setType(Category.type);
    }

    const handleProductImages = (e) => {
        setProducts([
            ...products,
            e.target.files[0]
        ]);

    }





return (
    <Layout sidebar>
        <Container>
            <Row>
                <Col>
                {
                    page.loading ? 
                    <div className="loader">
                        <h1>Page Loading....</h1>
                    </div>
                    : 
                    <Button style={{ marginTop: "2rem" }} variant="primary" onClick={handleShow}><span><IoIosPaper /> &nbsp;Add Page</span></Button>
                }
                   
                </Col>
            </Row>
        </Container>

        <AddPageModal
            show={show}
            handleClose={handleClose}
            SavehandleClose={SavehandleClose}
            ModalTitle={'Create New Page'}
            PageTitle={PageTitle}
            setPageTitle={setPageTitle}
            categoryId={categoryId}
            CategoryList={categories}
            PageDesc={PageDesc}
            setPageDesc={setPageDesc}
            banners={banners}
            products={products}
            handleBannerImages={handleBannerImages}
            handleProductImages={handleProductImages}
            onCategoryChange={onCategoryChange}
        />
    </Layout>
);
}

export default PageContainer;