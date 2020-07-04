import React, { ReactElement } from 'react'
import { Table } from 'react-bootstrap'
import { IModelBase } from './Interfaces'

interface IDataTableProps {
    getHTMLHeader: () => ReactElement | null;
    getHTMLRow: (entity: IModelBase, rowIndex: number) => ReactElement | null;
    dataList: IModelBase[]
}

export const DataTable = (props: IDataTableProps) => {
    const { getHTMLHeader, getHTMLRow, dataList } = props

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    {getHTMLHeader()}
                </tr>
            </thead>
            <tbody>
                {dataList.map((entity, index) => (

                    <tr key={entity.id} >
                        {getHTMLRow(entity, index)}
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}
