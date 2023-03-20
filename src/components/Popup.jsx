import React from "react";
import { Button, Modal } from "react-bootstrap";

function Popup({
    showPopup,
    setShowPopup,
    title,
    size='lg',
    proceedBtnName,
    closeBtnName,
    handleProceed,
    loading=false,
}) {
    return (
        <Modal
            show={showPopup}
            centered
            size={size}
        >
            <Modal.Body>
                <div className="p-5">
                    <p className="heading mb-4">{title}</p>
                    <div className="d-flex flex-row mt-4">
                        <Button
                            className="me-3"
                            onClick={() => {
                                setShowPopup(false);
                            }}
                        >
                            {closeBtnName}
                        </Button>
                        {proceedBtnName && (
                            <Button onClick={handleProceed} loading={loading}>{proceedBtnName}</Button>
                        )}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default Popup;
