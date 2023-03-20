import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import ProductForm from '../ProductForm'

const EditProduct = ({ handleProceed, showPopup, setShowPopup, loading, editProductData}) => {

    return (
        <Modal
            show={showPopup}
            centered
            size='xl'
        >
            <Modal.Header>
                <h1>Edit Product</h1>
            </Modal.Header>
            <Modal.Body>
                {!loading ? <ProductForm handleSubmit={handleProceed} loading={loading} initialValues={editProductData} type='edit' /> : <p>Loading Data...</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setShowPopup(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditProduct