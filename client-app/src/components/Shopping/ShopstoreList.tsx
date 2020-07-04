import React, { useState, useEffect } from 'react'
import { Table, Container, Button, Form } from 'react-bootstrap'
import { DeleteButton } from '../Shared/DeleteButton';
import { AlertMessage } from '../Shared/Alert';
import './shopp.css';
import { IModelBase } from '../Shared/Interfaces';
import { DataTable } from '../Shared/DataTable';


interface IShopModel extends IModelBase {
    title: string,
    isTemp: boolean
}

export const ShopstoreList = () => {
    const apiUri = 'https://localhost:5001/api/shopstore';
    const [lstShopping, setShoppingList] = useState<IShopModel[]>([]);
    useEffect(() => {
        fetch(apiUri + '/all')
            .then(res => res.json())
            .then(data => {
                data.forEach((element: IShopModel) => element.isTemp = false);
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

    const submitData = (entity: IShopModel, idx: number) => {
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
            <DataTable
                getHTMLHeader={() => {
                    return (
                        <>
                            <th>#</th>
                            <th>Title</th>
                            <td></td>
                        </>);
                }}
                getHTMLRow={(entity, rowIndex) => {
                    const shopModel = entity as IShopModel;
                    return (
                        <>
                            <td width="5%">{rowIndex + 1}</td>
                            <td>
                                <Form.Control type="text"
                                    placeholder="Title"
                                    value={shopModel.title} onChange={(e) => titleChanging(e.target.value, rowIndex)} />
                            </td>
                            <td width="20%">
                                <Button variant="secondary" onClick={() => submitData(shopModel, rowIndex)} type="submit">Submit</Button>
                                <DeleteButton variant="danger" onClick={() => deleteRecord(entity.id)} />
                            </td>
                        </>
                    )
                }}

                dataList={lstShopping}

            />
        </Container >

    )
}
