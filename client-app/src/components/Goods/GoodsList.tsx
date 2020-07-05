import React, { useEffect, useState } from 'react'
import { IModelBase } from '../Shared/Interfaces'
import { serverBaseUri } from '../Shared/Constants'
import { AlertMessage } from '../Shared/Alert'
import { Container } from 'react-bootstrap'
import { DataTable } from '../Shared/DataTable'

interface IGoodsModel extends IModelBase {
    title: string;
    bestPrice: number;
    bestShopStore: string
}

export const GoodsList = () => {

    const serverApi = serverBaseUri + 'goods'
    const [lstGoods, setLstGoods] = useState<IGoodsModel[]>([]);


    useEffect(() => {
        fetch(serverApi + '/all')
            .then(respo => respo.json())
            .then(data => setLstGoods(data))
            .catch(err => AlertMessage({ type: "danger", message: err }));
    })

    return (
        <Container>
            <DataTable
                getHTMLHeader={() => (
                    <>
                        <td>#</td>
                        <td>Name</td>
                    </>
                )}
                getHTMLRow={(entity, indx) => {
                    const goodsModel = entity as IGoodsModel;
                    return (
                        <>
                            <td>indx + 1</td>
                            <td>goodsModel.title</td>
                        </>
                    )

                }}
                dataList={lstGoods}
            />
        </Container>
    )
}
