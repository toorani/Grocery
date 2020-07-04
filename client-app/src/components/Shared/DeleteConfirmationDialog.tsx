import React from 'react'
import { AppDialog } from './AppDialog'

export interface IDeleteDialogProps {
    onDeleteClick: (parameters: any) => void;
    onCancelClick: (parameters: any) => void;
    showDialog : boolean
}

export const DeleteConfirmationDialog = (props: IDeleteDialogProps) => {

    const { onDeleteClick: positiveClickHandel, onCancelClick: negativeClickHandel, showDialog } = props;

    return (
        <AppDialog
            header="Record deleting"
            body="Are you sure for deleting data?"
            acceptButtonCaption="Yes"
            cancelButtonCaption="No"
            onAcceptClick={positiveClickHandel}
            onCancelClick={negativeClickHandel}
            show={showDialog}
        />

    )
}
