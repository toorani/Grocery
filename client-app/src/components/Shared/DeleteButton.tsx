import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog';



export const DeleteButton = (props: any) => {
    const [showDialog, setShowDialog] = useState(false);
    const { onClick } = props;


    return (
        <>
            <Button variant="danger" onClick={() => setShowDialog(true)}>Delete</Button>
            <DeleteConfirmationDialog
                showDialog={showDialog}
                onCancelClick={() => setShowDialog(false)}
                onDeleteClick={onClick} />
        </>
    )
}
