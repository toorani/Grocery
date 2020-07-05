import React, { ReactElement } from 'react'
import { Modal, Button, Container } from 'react-bootstrap'



export interface IModalProps {
    show: boolean;
    header: string;
    body: ReactElement;
    acceptButtonCaption: string;
    cancelButtonCaption: string;
    onAcceptClick: (parameters: any) => void;
    onCancelClick: (parameters: any) => void;
    parameters?: any;
}

export const AppDialog = (props: IModalProps) => {
    let {
        show,
        header,
        body,
        acceptButtonCaption,
        cancelButtonCaption,
        onAcceptClick,
        onCancelClick,
        parameters
    } = props;


    const confirmHandelClose = () => {
        onAcceptClick(parameters);

    }

    const rejectHandelClose = () => {
        if (onCancelClick != null)
            onCancelClick(parameters);

    }

    return (
        <Container>
        <Modal show={show} onHide={rejectHandelClose}>
            <Modal.Header closeButton>
                <Modal.Title>{header}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={rejectHandelClose}>
                    {cancelButtonCaption}
                </Button>
                <Button variant="danger" onClick={confirmHandelClose}>
                    {acceptButtonCaption}
                </Button>
            </Modal.Footer>
        </Modal>
        </Container>
    )
}
