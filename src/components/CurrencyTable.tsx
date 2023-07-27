/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community'; // Импортируем тип ColDef
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../styles/components/CurrencyTable.sass'
import { Context } from '..';
import { observer } from 'mobx-react-lite';

const CurrencyTable = observer(() => {

    const {store} = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('from')) {
            store.setAmount(Number(localStorage.getItem('amount')));
            store.setFrom(String(localStorage.getItem('from')));
            store.setTo(String(localStorage.getItem('to')));
        }
    }, [])

    useEffect(() => {
        async function fetchData() {
            store.getCurrenciesToConver();            
        }
        fetchData()
        // store.getCurrencyForLastMonth(); недоступно по подписке  
    }, [store.from, store.to, store.amount, store.date])

    const items: any = [];
    store.currenciesToConver.forEach(element => {  
        const item = {from: store.from, amountFrom: store.amount, to: element[0], amountTo: (+element[1] * store.amount)}
        items.push(item);
    })
   
    const columnDefs: ColDef[] = [
        { headerName: 'From', field: 'from', sortable: true, filter: true },
        { headerName: 'Amount', field: 'amountFrom', sortable: true, filter: true },
        { headerName: 'To', field: 'to', sortable: true, filter: true },
        { headerName: 'Amount', field: 'amountTo', sortable: true, filter: true },
    ];

    return (
        <div className="ag-theme-alpine ag-table" style={{ height: '700px', width: '820px' }}>
            <AgGridReact
                rowData={items}
                columnDefs={columnDefs}
                pagination={false}
                paginationPageSize={20}
            />
        </div>
    );
});

export default CurrencyTable;
