import React from 'react'
import { Modal, Button } from 'react-bootstrap'



export interface IModalProps {
    show: boolean;
    header: string;
    body: string;
    positiveButtonCaption: string;
    negativeButtonCaption: string;
    positiveClickHandel: (parameters: any) => void;
    negativeClickHandel: (parameters: any) => void;
    parameters?: any;
}

export const AppDialog = (props: IModalProps) => {
    let {
        show,
        header,
        body,
        positiveButtonCaption,
        negativeButtonCaption,
        positiveClickHandel,
        negativeClickHandel,
        parameters
        } = props;


    const confirmHandelClose = () => {
        positiveClickHandel(parameters);

    }

    const rejectHandelClose = () => {
        if (negativeClickHandel != null)
            negativeClickHandel(parameters);
        
    }

    return (
        <Modal show={show} onHide={rejectHandelClose}>
            <Modal.Header closeButton>
                <Modal.Title>{header}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={rejectHandelClose}>
                    {negativeButtonCaption}
                </Button>
                <Button variant="danger" onClick={confirmHandelClose}>
                    {positiveButtonCaption}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
