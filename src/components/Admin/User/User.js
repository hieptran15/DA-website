import React, { useEffect, useState, useRef } from 'react'
import Axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
function User() {
    const [users, setUser] = useState([]);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [userItem, setUserItem] = useState({});
    const [globalFilter, setGlobalFilter] = useState(null);
    const [check, setCheck] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);
    useEffect(() => {
        Axios.get("http://localhost:8080/api/user/get-all-users").then((result) => {
            setUser(result.data.filter(x => x.role === "ROLE_USER"));
        });
        window.scrollTo(0, 0)
    }, [check]);

    const openDeleteUser = (item) => {
        setUserItem(item);
        setDeleteUserDialog(true)
    }

    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false)
    }

    const deleteUser = () => {
        try {
            Axios.delete(`http://localhost:8080/api/user/delete-user/${userItem._id}`).then(res => {
                setCheck(!check);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
            })
        } catch (error) {
            console.log(error);
            toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'delete error', life: 3000 });
        };
        setDeleteUserDialog(false)
    }
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-lock" className="p-button-rounded p-button-success p-mr-2 mr-2" />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => openDeleteUser(rowData)} />
            </React.Fragment>
        );
    }
    const deleteUserDialogFooter = () => {
        return (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteUserDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteUser} />
            </React.Fragment>
        )
    }
    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Quản lý người dùng</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    return (
        <div>
            <div className="datatable-crud-demo">
                <Toast ref={toast} />

                <div className="card">
                    <DataTable ref={dt} value={users}
                        dataKey="id" paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={globalFilter}
                        let-i="rowIndex"
                        header={header}
                    >
                        <Column headerStyle={{ width: '0.5rem' }}></Column>
                        <Column field="name" header="Name"></Column>
                        <Column field="email" header="Email"></Column>
                        <Column field="role" header="Role"></Column>
                        <Column header="Action" body={actionBodyTemplate}></Column>
                    </DataTable>
                </div>
                <Dialog visible={deleteUserDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUserDialogFooter} onHide={hideDeleteUserDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                        {userItem && <span>Are you sure you want to delete <b>{userItem.name}</b>?</span>}
                    </div>
                </Dialog>
            </div>
        </div>
    )
}

export default User
