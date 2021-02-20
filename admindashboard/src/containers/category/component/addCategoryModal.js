import React from 'react';
import Modal from '../../../components/UI/Modals';
import { Form,Row,Col } from 'react-bootstrap';

const AddCategoryModal = (props) => {

    const {
        show,
        handleClose,
        SavehandleClose,
        ModalTitle,
        CategoryName,
        setCategoryName,
        ParentCategoryId,
        setParentCategoryId,
        CategoryList,
        CategoryType,
        setCategoryType,
        handleCategoryImage
    } = props;

    return (
        <Modal
            show={show}
            handleClose={handleClose}
            SavehandleClose={SavehandleClose}
            ModalTitle={ModalTitle}
        >
            <Form.Group style={{ marginTop: '1rem' }}>
                <Form.Control type="text" value={CategoryName} className="form-control-sm" placeholder="CategoryName" onChange={e => setCategoryName(e.target.value)} autoComplete="off" />
            </Form.Group>

            <Row>
                <Col>
                    <select className="form-control form-control-sm"
                        value={ParentCategoryId}
                        onChange={e => setParentCategoryId(e.target.value)}>
                        <option>Select Categories</option>
                        {
                            CategoryList.map(option =>
                                <option key={option.value} value={option.value}>{option.name}</option>
                            )}
                    </select>
                </Col>
                <Col>
                    <select className="form-control form-control-sm"
                        value={CategoryType}
                        onChange={e => setCategoryType(e.target.value)}>
                        <option value="">Select Type</option>
                        <option value="store">Store</option>
                        <option value="product">Product</option>
                        <option value="page">Page</option>
                    </select>
                </Col>
            </Row>

            <Form.Group >
                <Form.Control type='file' name="categoryImage" className="form-control-sm" onChange={handleCategoryImage} />
            </Form.Group>

        </Modal>
    );

}

export default AddCategoryModal;