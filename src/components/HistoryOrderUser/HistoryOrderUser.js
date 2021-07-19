import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Modal from 'antd/lib/modal/Modal';
import './HistoryOrderUser.css';
import { useDispatch, useSelector } from 'react-redux';
import { load_param } from '../../actions/actions';
function HistoryOrderUser() {
    const [order, setOrder] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [orderDetail, setOrderDetails] = useState([]);
    const [dealogDetail, setDialogDetail] = useState(false);
    const emailUser = JSON.parse(localStorage.getItem('email'));
    const LoginState = useSelector(state => state.login)
    const { user, loading, error, token, carts, role } = LoginState;
    const dispatch = useDispatch();
    useEffect(() => {
        Axios.get("http://localhost:8080/api/order/get-all-order").then((result) => {
            const sys = result.data.filter(x => x.email === emailUser)
            setOrder(sys);
        });
        window.scrollTo(0, 0);
        dispatch(load_param(''))
    }, [user]);
    const formatCurrency = (value) => {
        return value.toLocaleString('vi', { style: 'currency', currency: 'VND' });
    }
    const orderDetails = (item) => {
        setOrderDetails(item.cartItems);
        setDialogDetail(true);
    }
    const closeModalViewCart = () => {
        setDialogDetail(false);
    }
    const priceBodyOrderDetails = (rowData) => {
        return formatCurrency(rowData.price);
    }
    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.total);
    }
    const imageBodyTemplate = (rowData) => {
        return <img src={`${rowData.img_url}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.img_url} className="product-image" />
    }
    const statusBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                {rowData.status === "PENDING" && (
                    <div style={{ color: "#2196f3", fontWeight: "500", cursor: "pointer" }}>{rowData.status !== '' ? rowData.status : ''}</div>
                )}
                {rowData.status === "FINISHED" && (
                    <div style={{ color: "#dc3545", fontWeight: "500", cursor: "pointer" }}>{rowData.status !== '' ? rowData.status : ''}</div>
                )}
            </React.Fragment>
        )
    }
    const header = (
        <div className="table-header">

            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const headerOrder = (
        <div className="table-header">
            <h5 className="p-m-0">Details order</h5>
        </div>
    );
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-eye" className="p-button-rounded p-button-success p-mr-2 mr-2" onClick={() => orderDetails(rowData)} />
            </React.Fragment>
        );
    }
    return (
        <div>
           
            {/* Breadcrumbs */}
            <div className="breadcrumbs">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="bread-inner">
                                <ul className="bread-list">
                                    <li><a href="index1.html">Home<i className="ti-arrow-right" /></a></li>
                                    <li className="active"><a href="blog-single.html">History order</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Breadcrumbs */}
            <section className="product-area shop-sidebar shop section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-12">
                            <h3>History Order</h3>
                            <DataTable value={order}
                                dataKey="id" paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                                globalFilter={globalFilter}
                                let-i="rowIndex"
                                header={header}>

                                <Column headerStyle={{ width: '0.5rem' }}></Column>
                                <Column field="fullName" header="Name" sortable></Column>
                                <Column field="email" header="Email"></Column>
                                <Column field="address" header="Address"></Column>
                                <Column field="phone" header="Phone"></Column>
                                <Column field="total" header="Total" body={priceBodyTemplate} sortable></Column>
                                <Column field="status" header="Status" body={statusBodyTemplate}></Column>
                                <Column header="Action" body={actionBodyTemplate}></Column>
                            </DataTable>
                        </div>
                    </div>
                </div>
            </section>
            {
                orderDetail && (
                    <Modal footer={false} centered visible={dealogDetail} width={1000} onCancel={() => closeModalViewCart()}>
                        <div style={{ marginTop: '20px' }}>
                            <DataTable value={orderDetail}
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
        </div>

    )
}

export default HistoryOrderUser
