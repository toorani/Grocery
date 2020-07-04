import React, { useState, useEffect } from 'react'
import { Table, Container, Button, Form } from 'react-bootstrap'
import { DeleteButton } from '../Shared/DeleteButton';
import { AlertMessage } from '../Shared/Alert';
import './shopp.css';


interface ShopModel {
    id: number,
    title: string,
    isTemp: boolean
}

export const ShopstoreList = () => {
    const apiUri = 'https://localhost:5001/api/shopstore';
    const [lstShopping, setShoppingList] = useState<ShopModel[]>([]);
    useEffect(() => {
        fetch(apiUri + '/all')
            .then(res => res.json())
            .then(data => {
                data.forEach((element: ShopModel) => element.isTemp = false);
                setShoppingList(data);
            })
            .catch(err => {
                AlertMessage({ type: 'danger', message: err });
                console.log(err);
            });;

    }, []);

    const addShopstore = () => {
        setShoppingList([...lstShopping, ...[{ id: lstShopping.length + 1, title: "", isTemp: true }]]);
    }

    const submitData = (entity: ShopModel, idx: number) => {
        let methodName = 'POST';
        let apiURL = apiUri;
        let msg = 'Shopstore was successfully saved!';
        if (entity.isTemp == false) {
            methodName = 'PUT';
            apiURL = apiUri + `/${entity.id}`;
            msg = 'Shopstore was successfully updated!'
        }

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
                AlertMessage({ type: 'success', message: msg });
                setShoppingList(_lst);
            })
            .catch(err => {
                AlertMessage({ type: 'danger', message: err });
                console.log(err);
            });
    }



    const deleteRecord = (param: any) => {
        const idx = lstShopping.findIndex(x => x.id === param);
        if (lstShopping[idx].isTemp) {
            setShoppingList([...lstShopping.slice(0, idx), ...lstShopping.slice(idx + 1, lstShopping.length)]);
            AlertMessage({ type: 'success', message: 'Shopestore was successfully deleted!' });
            return;
        }
        fetch(apiUri + `/${param}`,
            {
                method: 'DELETE',
            })
            .then(res => res.json())
            .then(_ => {
                setShoppingList([...lstShopping.slice(0, idx), ...lstShopping.slice(idx + 1, lstShopping.length)]);
                AlertMessage({ type: 'success', message: 'Shopestore was successfully deleted!' });
            })
            .catch(err => AlertMessage({ type: 'danger', message: err }));
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
                                <DeleteButton variant="danger" onClick={() => deleteRecord(shop.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </Container >

    )
}
