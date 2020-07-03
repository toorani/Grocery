import React from 'react'
import { AppDialog } from './AppDialog'

export interface IDeleteDialogProps {
    positiveClickHandel: (parameters: any) => void;
    negativeClickHandel: (parameters: any) => void;
    showDialog : boolean
}

export const DeleteConfirmationDialog = (props: IDeleteDialogProps) => {

    const { positiveClickHandel, negativeClickHandel, showDialog } = props;

    return (
        <AppDialog
            header="Record deleting"
            body="Are you sure for deleting data?"
            positiveButtonCaption="Yes"
            negativeButtonCaption="No"
            positiveClickHandel={positiveClickHandel}
            negativeClickHandel={negativeClickHandel}
            show={showDialog}
        />

    )
}
