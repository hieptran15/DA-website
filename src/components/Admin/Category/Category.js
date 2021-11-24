import React from 'react';
import '../admin.css'
import Axios from 'axios'
import { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
function Category() {
  let emptyCategory = {
    category: '',
  };
  const [globalFilter, setGlobalFilter] = useState(null);
  const [category, setCategory] = useState([]);
  const [key, setKey] = useState('');
  const [categoryDialog, setCategoryDialog] = useState(false);
  const [deleteCategoryDialog, setDeleteProductDialog] = useState(false);
  const [valueCategory, setValueCategory] = useState('')
  const [submitted, setSubmitted] = useState(false);
  const [check, setCheck] = useState(false);
  const [categoryItem, setCategoryItem] = useState(emptyCategory);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    Axios.get("http://localhost:8080/api/category/get-all-category").then((result) => {
      setCategory(result.data)
    });
    window.scrollTo(0, 0);
    console.log('hihihhi');
  }, [check]);

  const openNew = (key) => {
    setKey(key);
    setCategoryItem(emptyCategory);
    setSubmitted(false);
    setCategoryDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setCategoryDialog(false);
  }

  const saveEdit = () => {
    if (key === 'add') {
      try {
        Axios.post("http://localhost:8080/api/category/post-category", categoryItem).then(res => {
          toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Category Add', life: 3000 });
          setCheck(!check)
        })
      } catch (error) {
        console.log(error);
        toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Add error', life: 3000 });
      };
    } else {
      try {
        Axios.put(`http://localhost:8080/api/category/update-category/${categoryItem._id}`, categoryItem).then(res => {
          toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Category updates', life: 3000 });
          setCheck(!check)
        })
      } catch (error) {
        console.log(error);
        toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'update error', life: 3000 });
      };
    }

    setSubmitted(false);
    setCategoryDialog(false);
  }

  const editCategory = (item, key) => {
    setKey(key);
    setCategoryItem({ ...item });
    setCategoryDialog(true);
  }
  const openDeleteCategory = (item) => {
    setCategoryItem({ ...item });
    setDeleteProductDialog(true)
  }
  const onInputChange = (e, name) => {
    const val = e.target.value;
    let _category = { ...categoryItem };
    _category[`${name}`] = val;
    setCategoryItem(_category);
  };

  const deleteCategory = () => {
    try {
      Axios.delete(`http://localhost:8080/api/category/delete-category/${categoryItem._id}`).then(res => {
        setCheck(!check);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Category Deleted', life: 3000 });
      })
    } catch (error) {
      console.log(error);
      toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'delete error', life: 3000 });
    };
    setDeleteProductDialog(false);
  }

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  }

  const deleteProductDialogFooter = () => {
    return (
      <React.Fragment>
        <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
        <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteCategory} />
      </React.Fragment>
    )
  }
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2 mr-2" onClick={() => editCategory(rowData, 'edit')} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => openDeleteCategory(rowData)} />
      </React.Fragment>
    );
  }

  const header = (
    <div className="table-header">
      <h5 className="p-m-0">Manage Category</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
      </span>
    </div>
  );

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={() => openNew('add')} />
      </React.Fragment>
    )
  };

  const productDialogFooter = (
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

          <DataTable ref={dt} value={category}
            dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            globalFilter={globalFilter}
            let-i="rowIndex"
            header={header}>
            <Column headerStyle={{ width: '0.5rem' }}></Column>
            <Column field="category" header="Name" sortable></Column>
            <Column field="status" header="status" sortable></Column>
            <Column header="Action" body={actionBodyTemplate}></Column>
          </DataTable>
        </div>
        <Dialog visible={categoryDialog} style={{ minWidth: '450px' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
          <div className="p-field">
            <label htmlFor="name">Name</label>
            <InputText id="name" value={categoryItem.category} onChange={(e) => onInputChange(e, 'category')} required autoFocus />
            {submitted && !categoryItem.category && <small className="p-error">Name is required.</small>}
          </div>
        </Dialog>
        <Dialog visible={deleteCategoryDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
          <div className="confirmation-content">
            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
            {categoryItem && <span>Are you sure you want to delete <b>{categoryItem.category}</b>?</span>}
          </div>
        </Dialog>
      </div>
    </div>
  )
}

export default Category
