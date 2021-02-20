import React from 'react';
import Modal from '../../../components/UI/Modals';
import { Row, Col, Form } from 'react-bootstrap';

  const EditCategoriesModal = (props) => {

    const {
        show,
        handleClose,
        SavehandleClose,
        ModalTitle,
        size,
        CategoryList,
        expandedArray,
        checkedArray,
        handleCategoryInput
    } = props;

    return (
        <Modal
            show={show}
            handleClose={handleClose}
            SavehandleClose={SavehandleClose}
            ModalTitle={ModalTitle}
            size={size}
        >

            <Row>
                <Col>
                    <h6>Expanded</h6>
                </Col>
            </Row>
            {
                expandedArray.length > 0 && expandedArray.map((item, index) =>
                    <Row key={item.value}>
                        <Col>
                            <Form.Group controlId="Category Name" >
                                <Form.Control type="text" value={item.name} placeholder="CategoryName" onChange={(e) => handleCategoryInput('name',e.target.value,index,"expanded")} autoComplete="off" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <select className="form-control"
                                value={item.parentid}
                                onChange={(e) => handleCategoryInput('parentid',e.target.value,index,"expanded")}>
                                <option>Select Categories</option>
                                {
                                    CategoryList.map(option =>
                                        <option key={option.value} value={option.value}>{option.name}</option>
                                    )}
                            </select>
                        </Col>
                        <Col>
                            <select className="form-control"
                             value={item.type}
                             onChange={(e) => handleCategoryInput('type',e.target.value,index,"expanded")}>
                                <option value="">Select Type</option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">Page</option>
                            </select>
                        </Col>
                    </Row>
                )
            }
            <Row>
                <Col>
                    <h6>Checked</h6>
                </Col>
            </Row>
            {
                checkedArray.length > 0 && checkedArray.map((item, index) =>
                    <Row key={item.value}>
                        <Col>
                            <Form.Group >
                                <Form.Control type="text" value={item.name} placeholder="CategoryName" onChange={(e) => handleCategoryInput('name',e.target.value,index,"checked")} autoComplete="off" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <select className="form-control"
                                value={item.parentid}
                                onChange={(e) => handleCategoryInput('parentid',e.target.value,index,"checked")}>
                                <option>Select Categories</option>
                                {
                                    CategoryList.map(option =>
                                        <option key={option.value} value={option.value}>{option.name}</option>
                                    )}
                            </select>
                        </Col>
                        <Col>
                            <select className="form-control"
                             value={item.type}
                             onChange={(e) => handleCategoryInput('type',e.target.value,index,"checked")}>
                                <option value="">Select Type</option>
                                <option vaue="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">Page</option>
                            </select>
                        </Col>
                    </Row>
                )
            }

        </Modal>
    );
}

export default EditCategoriesModal;