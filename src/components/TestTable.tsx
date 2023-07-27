/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community'; // Импортируем тип ColDef
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../styles/components/TestTable.sass'
import { Context } from '..';

const TestTable = () => {

    const {store} = useContext(Context);
    const [campaign, setCampaing] = useState();
    const [adset, setAdset] = useState();
    const [ad, setAd] = useState();

    useEffect(() => {
        async function fetchData() {
            const resCamping = await store.getCampaign(); 
            const itemsCamping: any = [];
            resCamping?.forEach((element) => {
                const item = {id: element.id, name: element.name, spend: element.spend};
                itemsCamping.push(item);
            })
            setCampaing(itemsCamping);

            const resAdset = await store.getAdset(); 
            const itemsAdset: any = [];
            resAdset?.forEach((element) => {
                const item = {id: element.id, name: element.name, spend: element.spend, campaingId: element.id_campaign};
                itemsAdset.push(item);
            })
            setAdset(itemsAdset);

            const resAd = await store.getAd(); 
            const itemsAd: any = [];
            resAd?.forEach((element) => {
                const item = {id: element.id, name: element.name, spend: element.spend, campaingId: element.id_campaign, adsetId: element.id_adset};
                itemsAd.push(item);
            })
            setAd(itemsAd);
        }
        fetchData()
    }, [])
   
    const campaignDefs: ColDef[] = [
        { headerName: 'ID', field: 'id', sortable: true, filter: true },
        { headerName: 'Name', field: 'name', sortable: true, filter: true },
        { headerName: 'Spend', field: 'spend', sortable: true, filter: true },
    ];
    
    const adsetDefs: ColDef[] = [
        { headerName: 'ID', field: 'id', sortable: true, filter: true },
        { headerName: 'Name', field: 'name', sortable: true, filter: true },
        { headerName: 'Spend', field: 'spend', sortable: true, filter: true },
        { headerName: 'CampaingID', field: 'campaingId', sortable: true, filter: true },
    ];

    const adDefs: ColDef[] = [
        { headerName: 'ID', field: 'id', sortable: true, filter: true },
        { headerName: 'Name', field: 'name', sortable: true, filter: true },
        { headerName: 'Spend', field: 'spend', sortable: true, filter: true },
        { headerName: 'CampaingID', field: 'campaingId', sortable: true, filter: true },
        { headerName: 'AdsetID', field: 'adsetId', sortable: true, filter: true },
    ];

    const handleChangeTable = (id: number) => {
        const tables = document.querySelectorAll('.test-table');
        tables.forEach((element, index) => {
            if (index !== id) {
                element.classList.remove('test-table_active')              
            } else {
                element.classList.add('test-table_active')
            }
        })
    }

    return (
        <div className='wrapper'>
            <div className="tabs">
                <div onClick={() => handleChangeTable(0)}>Campaigns</div>
                <div onClick={() => handleChangeTable(1)}>Adsets</div>
                <div onClick={() => handleChangeTable(2)}>Ads</div>
            </div>
            <div className="tables">
                <div className="ag-theme-alpine ag-table test-table test-table_active" style={{ height: '602px', width: '602px' }}>
                    <AgGridReact
                        rowData={campaign}
                        columnDefs={campaignDefs}
                        pagination={false}
                        paginationPageSize={20}
                    />
                </div>
                <div className="ag-theme-alpine ag-table test-table" style={{ height: '602px', width: '802px' }}>
                    <AgGridReact
                        rowData={adset}
                        columnDefs={adsetDefs}
                        pagination={false}
                        paginationPageSize={20}
                    />
                </div>
                <div className="ag-theme-alpine ag-table test-table" style={{ height: '602px', width: '1002px' }}>
                    <AgGridReact
                        rowData={ad}
                        columnDefs={adDefs}
                        pagination={false}
                        paginationPageSize={20}
                    />
                </div>
            </div>
        </div>
        
    );
};

export default TestTable;
