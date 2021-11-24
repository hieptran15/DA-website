import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

function Brands() {
    let emptyBrand = {
        brand: '',
    };
    const [brands, setBrands] = useState([]);
    const [key, setKey] = useState('');
    const [brandItem, setBrandItem] = useState(emptyBrand);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [brandDialog, setBrandDialog] = useState(false);
    const [deleteBrandDialog, setDeleteBrandDialog] = useState(false);
    const [check, setCheck] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);
    useEffect(() => {
        Axios.get("http://localhost:8080/api/brand/get-all-brand").then((result) => {
            setBrands(result.data)
        });
        window.scrollTo(0, 0)
    }, [check]);

    const openNew = (key) => {
        setKey(key);
        setBrandItem(emptyBrand);
        // setSubmitted(false);
        setBrandDialog(true);
    };

    const hideDialog = () => {
        setBrandDialog(false);
    }

    const editBrand = (item, key) => {
        setKey(key);
        setBrandItem({ ...item });
        setBrandDialog(true);
    }
    const openDeleteBrand = (item) => {
        setBrandItem({ ...item });
        setDeleteBrandDialog(true)
    }
    const hideDeleteBrandDialog = () => {
        setDeleteBrandDialog(false);
    }
    const onInputChange = (e, name) => {
        const val = e.target.value;
        let _brand = { ...brandItem };
        _brand[`${name}`] = val;
        setBrandItem(_brand);
    };
    const saveEdit = () => {
        if (key === 'add') {
            try {
                Axios.post("http://localhost:8080/api/brand/post-brand", brandItem).then(res => {
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Brand Add', life: 3000 });
                    setCheck(!check)
                })
            } catch (error) {
                console.log(error);
                toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Add error', life: 3000 });
            };
        } else {
            try {
                Axios.put(`http://localhost:8080/api/brand/update-brand/${brandItem._id}`, brandItem).then(res => {
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Brand updates', life: 3000 });
                    setCheck(!check)
                })
            } catch (error) {
                console.log(error);
                toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'update error', life: 3000 });
            };
        }
        setBrandDialog(false);
    }
    const deleteBrand = () => {
        try {
            Axios.delete(`http://localhost:8080/api/brand/delete-brand/${brandItem._id}`).then(res => {
                setCheck(!check);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Brand Deleted', life: 3000 });
            })
        } catch (error) {
            console.log(error);
            toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'delete error', life: 3000 });
        };
        setDeleteBrandDialog(false);
    }
    const deleteBrandDialogFooter = () => {
        return (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteBrandDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteBrand} />
            </React.Fragment>
        )
    }
    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Quản lý thương hiệu</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2 mr-2" onClick={() => editBrand(rowData, 'edit')} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => openDeleteBrand(rowData)} />
            </React.Fragment>
        );
    }
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={() => openNew('add')} />
            </React.Fragment>
        )
    };
    const brandDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveEdit} />
        </React.Fragment>
    );


    return (
        <div>
            <div className="datatable-crud-demo">
                <Toast ref={toast} />

                <div className="card">
                    <Toolbar className="p-mb-4" left={leftToolbarTemplate}></Toolbar>

                    <DataTable ref={dt} value={brands}
                        dataKey="id" paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={globalFilter}
                        let-i="rowIndex"
                        header={header}>
                        <Column headerStyle={{ width: '0.5rem' }}></Column>
                        <Column field="brand" header="Brand"></Column>
                        <Column field="status" header="status"></Column>
                        <Column header="Action" body={actionBodyTemplate}></Column>
                    </DataTable>
                </div>
                <Dialog visible={brandDialog} style={{ minWidth: '450px' }} header="Brands" modal className="p-fluid" footer={brandDialogFooter} onHide={hideDialog}>
                    <div className="p-field">
                        <label htmlFor="name">Name</label>
                        <InputText id="name" value={brandItem.brand} onChange={(e) => onInputChange(e, 'brand')} required autoFocus />
                    </div>
                </Dialog>
                <Dialog visible={deleteBrandDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteBrandDialogFooter} onHide={hideDeleteBrandDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                        {brandItem && <span>Are you sure you want to delete <b>{brandItem.brand}</b>?</span>}
                    </div>
                </Dialog>
            </div>
        </div>
    )
}

export default Brands
