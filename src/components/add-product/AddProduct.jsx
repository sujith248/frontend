import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import ProductForm from '../ProductForm'

const AddProduct = ({ handleProceed, showPopup, setShowPopup, loading, initialValues }) => {
    return (
        <Modal
            show={showPopup}
            centered
            size='xl'
        >
            <Modal.Header>
                <h1>Add Product</h1>
            </Modal.Header>
            <Modal.Body className='px-5'>
                <ProductForm handleSubmit={handleProceed} loading={loading} initialValues={initialValues}/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setShowPopup(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddProduct