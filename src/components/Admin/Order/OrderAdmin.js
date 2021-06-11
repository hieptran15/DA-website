import Axios from 'axios'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import './Order.css'
import { Button } from 'primereact/button';
function OrderAdmin() {
    const [order, setOrder] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    useEffect(() => {
        Axios.get('http://localhost:8080/api/order/get-all-order').then(res => {
            setOrder(res.data)
        })
    });

    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Manage orders</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const exportCSV = () => {
        dt.current.exportCSV();
    }
    const formatCurrency = (value) => {
        return value.toLocaleString('vi', { style: 'currency', currency: 'VND' });
    }
    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.total);
    }
    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        )
    }
    const rowDatarowData = (item) => {
        console.log(item);
    }
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-eye" className="p-button-rounded p-button-success p-mr-2 mr-2" onClick={()=>rowDatarowData(rowData)}/>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" />
            </React.Fragment>
        );
    }
    return (
        <div>
            <div className="datatable-crud-demo">
                <Toast ref={toast} />

                <div className="card">
                    <Toolbar className="p-mb-4" right={rightToolbarTemplate}></Toolbar>
                    <DataTable ref={dt} value={order}
                        selection={selectedProducts}
                        dataKey="id" paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
                        onSelectionChange={(e) => setSelectedProducts(e.value)}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={globalFilter}
                        let-i="rowIndex"
                        header={header}>
                        <Column headerStyle={{ width: '0.5rem' }}></Column>
                        <Column field="fullName" header="Name" sortable></Column>
                        <Column field="phone" header="Phone" sortable></Column>
                        <Column field="email" header="Email" sortable></Column>
                        <Column field="address" header="Address" sortable></Column>
                        <Column field="city" header="City" sortable></Column>
                        <Column field="total" header="Total" body={priceBodyTemplate} sortable></Column>
                        <Column header="Action" body={actionBodyTemplate}></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    )
}

export default OrderAdmin
