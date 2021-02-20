import React from 'react';
import Modal from '../../../components/UI/Modals';
import { Form } from 'react-bootstrap';

const AddPageModal = (props) => {

    const {
        show,
        handleClose,
        SavehandleClose,
        ModalTitle,
        PageTitle,
        setPageTitle,
        categoryId,
        onCategoryChange,
        CategoryList,
        PageDesc,
        setPageDesc,
        products,
        banners,
        handleBannerImages,
        handleProductImages
    } = props;

    return (
        <Modal
            show={show}
            handleClose={handleClose}
            SavehandleClose={SavehandleClose}
            ModalTitle={ModalTitle}
        >
            <Form.Group style={{ marginTop: '1rem' }}>
                <Form.Control type="text" value={PageTitle} className="form-control-sm" placeholder="PageTitle" onChange={e => setPageTitle(e.target.value)} autoComplete="off" />
            </Form.Group>
          
            <select
             className="form-control form-control-sm"
                value={categoryId}
                onChange={onCategoryChange}>
                <option>Select Categories</option>
                {
                    CategoryList.map(cat =>
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                    )}
            </select>

            <Form.Group style={{ marginTop: '1rem' }}>
                <textarea type="text" value={PageDesc} className="form-control form-control-sm" rows="2" placeholder="Page Description" onChange={e => setPageDesc(e.target.value)} autoComplete="off" ></textarea>
            </Form.Group>
         

            <Form.Group >
            <Form.Label>Banner images</Form.Label>
                    {
                        banners.length > 0 ?
                            banners.map((banner, index) => <div key={index}>{banner.name}</div>) : null
                    }
                    <Form.Control type='file' name="banners" onChange={handleBannerImages} />
                </Form.Group>

                <Form.Group >
                <Form.Label>Product images</Form.Label>
                    {
                        products.length > 0 ?
                            products.map((product, index) => <div key={index}>{product.name}</div>) : null
                    }
                    <Form.Control type='file' name="products" onChange={handleProductImages} />
                </Form.Group>

        </Modal>
    );

}

export default AddPageModal;