import Axios from 'axios'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { RadioButton } from 'primereact/radiobutton';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import './Order.css'
import { Button } from 'primereact/button';
import Modal from 'antd/lib/modal/Modal';
import { Dialog } from 'primereact/dialog';
function OrderAdmin() {
    const listStatus = [{ name: 'FINISHED' }, { name: 'PENDING' }];
    const [order, setOrder] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [nameDetails, setNameDetails] = useState('');
    const [orderId, setOrderId] = useState(null);
    const [valueStatus, setValueStatus] = useState('');
    const [modalViewOrderDetails, setViewModalDetails] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [changeStatus, setChangeStatus] = useState(false);
    const [orderDetails, setOrderDetails] = useState([]);
    const [check, setCheck] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);
    useEffect(() => {
        Axios.get('http://localhost:8080/api/order/get-all-order').then(res => {
            setOrder(res.data)
        })
    }, [check]);
    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Quản lý đơn hàng</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const headerOrder = (
        <div className="table-header">
            <h5 className="p-m-0">{nameDetails !== '' ? nameDetails : ''}</h5>
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
    const priceBodyOrderDetails = (rowData) => {
        return formatCurrency(rowData.price);
    }
    const imageBodyTemplate = (rowData) => {
        return <img src={`${rowData.img_url}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.img_url} className="product-image" />
    }
    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        )
    }
    const statusBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                {rowData.status === "PENDING" && (
                    <div onClick={() => updateStatus(rowData)} style={{ color: "#2196f3", fontWeight: "500", cursor: "pointer" }}>{rowData.status !== '' ? rowData.status : ''}</div>
                )}
                {rowData.status === "FINISHED" && (
                    <div onClick={() => updateStatus(rowData)} style={{ color: "#dc3545", fontWeight: "500", cursor: "pointer" }}>{rowData.status !== '' ? rowData.status : ''}</div>
                )}
            </React.Fragment>
        )
    }
    const updateStatus = (item) => {
        console.log(item);
        setOrderId(item._id);
        setValueStatus(item.status)
        setChangeStatus(true)
    }
    const rowDatarowData = (item) => {
        console.log(item);
        setNameDetails(item.fullName)
        setOrderDetails(item.cartItems)
        setViewModalDetails(true)
    }
    const delateOrder = (item) => {
        console.log(item._id);
        setOrderId(item._id);
        setConfirmDelete(true)
    }
    const deleteOrderDialogFooter = () => {
        return (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteOrderDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteOrder} />
            </React.Fragment>
        )
    }
    const saveStatusDialogFooter = () => {
        return (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteOrderDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={saveStatus} />
            </React.Fragment>
        )
    }

    const saveStatus = () => {
        const options = {
            status: valueStatus
        }
        try {
            Axios.patch(`http://localhost:8080/api/order/update-status/${orderId}`, options).then(res => {
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'updated status', life: 3000 });
                setCheck(!check);
                setChangeStatus(false);
            })
        } catch (error) {
            console.log(error);
            toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'change status error', life: 3000 });
            setChangeStatus(false);
        }
    }

    const deleteOrder = () => {
        try {
            Axios.delete(`http://localhost:8080/api/order/delete-order/${orderId}`).then(res => {
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Order deleted', life: 3000 });
                setCheck(!check);
                setConfirmDelete(false)
            })
        } catch (error) {
            console.log(error);
            toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Order delete error', life: 3000 });
            setConfirmDelete(false)
        }
    }
    const hideDeleteOrderDialog = () => {
        setConfirmDelete(false);
        setChangeStatus(false);
    }
    const closeModalViewCart = () => {
        setViewModalDetails(false)
    }
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-eye" className="p-button-rounded p-button-success p-mr-2 mr-2" onClick={() => rowDatarowData(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => delateOrder(rowData)} />
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
                        <Column field="status" header="Status" body={statusBodyTemplate} sortable></Column>
                        <Column header="Action" body={actionBodyTemplate}></Column>
                    </DataTable>
                </div>
            </div>
            {
                orderDetails && (
                    <Modal footer={false} centered visible={modalViewOrderDetails} width={1000} onCancel={() => closeModalViewCart()}>
                        <div style={{ marginTop: '20px' }}>
                            <DataTable value={orderDetails}
                                dataKey="id" paginator rows={2} rowsPerPageOptions={[5, 10, 25]}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                                globalFilter={globalFilter}
                                let-i="rowIndex"
                                header={headerOrder}>
                                <Column headerStyle={{ width: '0.5rem' }}></Column>
                                <Column field="name" header="Name" ></Column>
                                <Column header="Image" body={imageBodyTemplate}></Column>
                                <Column field="size" header="Size" ></Column>
                                <Column field="color" header="Color" ></Column>
                                <Column field="count" header="Count" ></Column>
                                <Column field="price" header="Price" body={priceBodyOrderDetails} ></Column>
                            </DataTable>
                        </div>
                    </Modal>
                )
            }
            <Dialog visible={confirmDelete} style={{ width: '450px' }} header="Confirm" modal footer={deleteOrderDialogFooter} onHide={hideDeleteOrderDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                    <span>Are you sure you want to delete order?</span>
                </div>
            </Dialog>
            <Dialog visible={changeStatus} style={{ width: '450px' }} header="Update status" modal footer={saveStatusDialogFooter} onHide={hideDeleteOrderDialog}>
                <div style={{ margin: "10px 60px" }} className="confirmation-content d-flex justify-content-between">
                    {listStatus.map((value) => {
                        return (
                            <div className="d-flex align-items-center">
                                <RadioButton inputId={value.name} name="city" value={value} onChange={(e) => setValueStatus(value.name)} checked={value.name === valueStatus} />
                                <label htmlFor={value.name}>{value.name}</label>
                            </div>
                        )
                    })}
                </div>
            </Dialog>
        </div>
    )
}

export default OrderAdmin
