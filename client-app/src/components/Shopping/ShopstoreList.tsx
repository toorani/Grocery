import React, { useState, useEffect } from 'react'
import { Table, Container, Button, Form } from 'react-bootstrap'
import { ModalDialog } from '../Shared/ModalDialog';


interface ShopModel {
    id: number,
    title: string,
    isTemp: boolean
}

export const ShopstoreList = () => {
    const apiUri = 'https://localhost:5001/api/shopstore';
    const [lstShopping, setShoppingList] = useState<ShopModel[]>([]);
    const [isShowDialog, setIsShowDialog] = useState(false);
    const [selectedId, setSelectedId] = useState(0);
    useEffect(() => {
        fetch(apiUri + '/all')
            .then(res => res.json())
            .then(data => {
                data.forEach((element: ShopModel) => element.isTemp = false);
                setShoppingList(data);
            });

    }, []);

    const addShopstore = () => {
        setShoppingList([...lstShopping, ...[{ id: lstShopping.length + 1, title: "", isTemp: true }]]);
    }

    const submitData = (entity: ShopModel, idx: number) => {

        let methodName = entity.isTemp ? 'POST' : 'PUT';
        const apiURL = apiUri + (entity.isTemp ? '' : `/${entity.id}`);
        fetch(apiURL,
            {
                method: methodName,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(entity)
            })
            .then(res => res.json())
            .then(_ => {
                let _lst = [...lstShopping];
                _lst[idx].isTemp = false;
                setShoppingList(_lst);

            })
            .catch(err => console.log(err));
    }

    const beforeDeleteRecord = (id: number) => {
        setSelectedId(id);
        setIsShowDialog(true);

    }

    const deletingRecord = (param: any) => {
        fetch(apiUri + `/${param}`,
            {
                method: 'DELETE',
            })
            .then(res => res.json())
            .then(_ => {
                const idx = lstShopping.findIndex(x => x.id === param);
                setShoppingList([...lstShopping.slice(0, idx), ...lstShopping.slice(idx + 1, lstShopping.length)]);
            })
            .catch(err => console.log(err));
        setIsShowDialog(false);

    }

    const titleChanging = (value: string, index: number) => {
        let _lst = [...lstShopping];
        _lst[index].title = value;
        setShoppingList(_lst);
    }


    return (

        <Container >
            <Button variant="primary" onClick={addShopstore}>New</Button>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {lstShopping.map((shop, index) => (

                        <tr key={shop.id} >
                            <td width="5%">{index + 1}</td>
                            <td>
                                <Form.Control type="text" placeholder="Title" value={shop.title} onChange={(e) => titleChanging(e.target.value, index)} />
                            </td>
                            <td width="20%">
                                <Button variant="secondary" onClick={() => submitData(shop, index)} type="submit">Submit</Button>
                                <Button variant="danger" onClick={() => beforeDeleteRecord(shop.id)}>Delete</Button>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </Table>
            <ModalDialog
                parameters={selectedId}
                show={isShowDialog}
                modalType="Delete_Confirmation"
                negativeClickHandel={() => setIsShowDialog(false)}
                positiveClickHandel={(param) => deletingRecord(param)} />
        </Container >

    )
}
