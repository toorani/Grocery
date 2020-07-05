import React, { ReactElement, Component } from 'react'
import { Table } from 'react-bootstrap'
import { IModelBase } from './Interfaces'

interface IDataTableProps {
    getHTMLHeader: () => ReactElement | null;
    getHTMLRow: (entity: IModelBase, rowIndex: number) => ReactElement | null;
    dataList: IModelBase[]
}

export class DataTable extends Component<IDataTableProps> {
    myRef: any;
    colNumbers : number = 2;
    constructor(props: IDataTableProps) {
        super(props);
        this.myRef = React.createRef();

    }

    componentDidMount() {
        this.colNumbers =  this.myRef.current.rows[0].cells.length;
    }

    render() {
        return (
            <Table striped bordered hover responsive ref={this.myRef}>
                <thead>
                    <tr>
                        {this.props.getHTMLHeader()}
                    </tr>
                </thead>

                <tbody>
                    {
                        this.props.dataList.length !== 0 && this.props.dataList.map((entity, index) => (
                            <tr key={entity.id} >
                                {this.props.getHTMLRow(entity, index)}
                            </tr>
                        ))

                    }
                    {
                        this.props.dataList.length === 0 &&
                        <tr style={{ textAlign: "center" }}>
                            <td colSpan={this.colNumbers} >
                                <div>There is no data</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </Table>
        )
    }
}
