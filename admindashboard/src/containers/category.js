import React, { useState } from 'react';
import Layout from './layout';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCat, updateCat,getCategory as getCat,deleteCat } from '../redux/store';
import Modal from '../components/UI/Modals';
import CheckboxTree from 'react-checkbox-tree';
import { IoIosCheckboxOutline, IoIosCheckbox, IoIosArrowForward, IoIosArrowDown, IoIosAdd, IoIosTrash,IoIosCloudUpload } from "react-icons/io";
import EditCategoriesModal  from './category/component/EditCategoryModal'
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import AddCategoryModal from './category/component/addCategoryModal';
import DeleteCategoryModal from './category/component/deleteCategoryModal';
import './category/style.css';


function Category(props) {

    const [CategoryName, setCategoryName] = useState('');
    const [ParentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [checked, setChecked] = useState([]);
    const [CategoryType,setCategoryType] = useState('');
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);

    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [editShow, setEditShow] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleClose = () => setShow(false);
    const EdithandleClose = () => setEditShow(false);
    
    const deleteHandleClose = () =>  setShowDeleteModal(false);

    const SavehandleClose = () => {
        const form = new FormData();
        form.append("name", CategoryName);
        form.append("parentid", ParentCategoryId);
        form.append("categoryImage", categoryImage);
        form.append("type",CategoryType);

        dispatch(addCat(form));

        setCategoryName('');
        setParentCategoryId('');
        setCategoryType('');
        setShow(false)
    };

const deleteHandleShow = () =>{
    updateCheckedExpandedCategories();

    setShowDeleteModal(true);
}

    const handleShow = () => setShow(true);

    const category = useSelector(state => state.category);

    const EditSavehandleClose = () => {
    
        const form = new FormData();

        expandedArray.map((item,index)=>{
            form.append("_id",item.value);
            form.append("name",item.name);
            form.append("parentid",item.parentid ? item.parentid : "");
            form.append("type",item.type ? item.type: "");
        })
        checkedArray.map((item,index)=>{
            form.append("_id",item.value);
            form.append("name",item.name);
            form.append("parentid",item.parentid ? item.parentid : "");
            form.append("type",item.type ? item.type: "");
        })

       dispatch(updateCat(form));
      
            setEditShow(false);
      
  
      
    }
    
    const EdithandleShow = () => {
    updateCheckedExpandedCategories();
        setEditShow(true);
    
    }

    const updateCheckedExpandedCategories=()=>{
        const categories = createCategoryList(category.categories);
        const checkedArray = [];
        const expandedArray = [];

        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId === category.value);
            category && checkedArray.push(category);
        })

        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId === category.value);
            category && expandedArray.push(category);
        })

        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
        console.log(expandedArray, checkedArray,checked,expanded);
    }
   
        const handleCategoryInput = (key,value,index,type)=>{
            if(type == "checked"){
           const updateCheckedArray = checkedArray.map((item,_index)=> index == _index ? {...item,[key]: value}:item);
           setCheckedArray(updateCheckedArray);
        }
        else if(type == "expanded"){
            const updateExpandedArray = expandedArray.map((item,_index)=> index == _index ? {...item,[key]: value}:item);
            setExpandedArray(updateExpandedArray);
        }

    }
    
    const renderCategories = (categories) => {
        let myCategories = [];

        for (let category of categories) {
            myCategories.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }

            )
        }
        return myCategories;
    }

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }


    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({
                value: category._id, name: category.name, parentid: category.parentid,type:category.type

            })
            if (category.children.length > 0) {
                createCategoryList(category.children, options);
            }

        }
        return options;
    }

    const deleteCategories = ()=>{
       const checkIdArray =checkedArray.map((item,index)=>({_id:item.value}));
       const expandedIdArray =expandedArray.map((item,index)=>({_id:item.value}));
       const IdsArray = expandedIdArray.concat(checkIdArray);
       if(checkIdArray.length > 0){
        dispatch(deleteCat(checkIdArray));
        setShowDeleteModal(false);
   
       }
       
    }

    return (
        <>
            <Layout sidebar>
                <Container fluid>
                    <Row>
                        <Col md={12} style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
                            <h1>Category</h1>
                            <div>
                                <Button variant="primary" onClick={handleShow} style={{ padding: "5px 10px", color: "white", fontWeight: "bold"}}><span><IoIosAdd/> &nbsp;ADD</span></Button>
                                <Button variant="secondary" onClick={EdithandleShow} style={{ padding: "5px 10px", color: "white", fontWeight: "bold", margin: "0 7px" }}><span><IoIosCloudUpload/> &nbsp;EDIT</span></Button>
                                <Button variant="danger" onClick={deleteHandleShow} style={{ padding: "5px 10px", color: "white", fontWeight: "bold" }}><span><IoIosTrash/> &nbsp;DELETE</span></Button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} style={{ marginLeft: "auto" }}>
                            <CheckboxTree
                                nodes={renderCategories(category.categories)}
                                checked={checked}
                                expanded={expanded}
                                onCheck={checked => setChecked(checked)}
                                onExpand={expanded => setExpanded(expanded)}
                                iconsClass="fa5"
                                icons={{
                                    check: <IoIosCheckbox />,
                                    uncheck: <IoIosCheckboxOutline />,
                                    halfCheck: <IoIosCheckboxOutline />,
                                    expandClose: <IoIosArrowForward />,
                                    expandOpen: <IoIosArrowDown />
                                }}
                            />
                        </Col>
                    </Row>
                </Container>

                <AddCategoryModal
                    show={show}
                    handleClose={handleClose}
                    SavehandleClose={SavehandleClose}
                    ModalTitle={'Add New Category'} 
                    CategoryName={CategoryName}
                    setCategoryName={setCategoryName}
                    ParentCategoryId={ParentCategoryId}
                    setParentCategoryId={setParentCategoryId}
                    CategoryList = {createCategoryList(category.categories)}
                    handleCategoryImage={handleCategoryImage}
                    CategoryType={CategoryType}
                    setCategoryType={setCategoryType}
                />

                <EditCategoriesModal
                     show={editShow}
                     handleClose={EdithandleClose}
                     SavehandleClose={EditSavehandleClose}
                     ModalTitle={'Update Category'}
                     size="lg"
                     expandedArray={expandedArray}
                     checkedArray={checkedArray}
                     handleCategoryInput={handleCategoryInput}
                     CategoryList={createCategoryList(category.categories)}
                />
               
                <DeleteCategoryModal
                     show={showDeleteModal}
                     handleClose={deleteHandleClose}
                     buttons={[
                         {
                             label: 'No',
                             color:'primary',
                             onClick:()=>{
                                 alert('No');
                             }
                         },
                         {
                             label: 'Yes',
                             color:'danger',
                             onClick:deleteCategories
                         }
                     ]}
                     ModalTitle='Confirm'
                     expandedArray={expandedArray}
                     checkedArray={checkedArray}
                />
            </Layout>
        </>
    )
}

export default Category;