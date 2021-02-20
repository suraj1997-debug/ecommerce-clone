import React from 'react';
import Modal from '../../../components/UI/Modals';

const DeleteCategoryModal = (props) =>{

    const {
        show,
        handleClose,
        buttons,
        ModalTitle,
        expandedArray,
        checkedArray
     } = props;

    return(
        <Modal
        show={show}
        handleClose={handleClose}
        buttons={buttons}
        ModalTitle={ModalTitle}
    >
       <h6 style={{fontWeight:"bold"}}>Expanded</h6>
    {
       expandedArray.length > 0 && expandedArray.map((item,index)=><div><span key={item.value} >{item.name}</span></div>)
    } 
        <h6 style={{fontWeight:"bold"}}>setChecked</h6>
    {
       checkedArray.length > 0 && checkedArray.map((item,index)=><div><span key={item.value} >{item.name} </span></div>)
    } 
    </Modal>
    );
}


export default DeleteCategoryModal;