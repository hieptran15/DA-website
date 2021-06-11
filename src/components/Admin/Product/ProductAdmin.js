import React from 'react'
import '../admin.css'
import Axios from 'axios'
import { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './Product.css'
function ProductAdmin() {

  let emptyProduct = {
    name: '',
    img_url: null,
    description: '',
    category: null,
    price: 0,
    rate: 0,
    brand: ''
  };

  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [checkCategory, setCheckCategory] = useState('');
  const [globalFilter, setGlobalFilter] = useState(null);
  const [key, setKey] = useState('');
  const [check, setCheck] = useState(false);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    Axios.get("http://localhost:8080/api/product/list-all-product").then((result) => {
      setProducts(result.data);
    });
    window.scrollTo(0, 0)
  }, [check]);

  useEffect(() => {
    Axios.get("http://localhost:8080/api/category/get-all-category").then((result) => {
      setCategory(result.data)
    })
  }, [])
  const formatCurrency = (value) => {
    return value.toLocaleString('vi', { style: 'currency', currency: 'VND' });
  }

  const openNew = (key) => {
    setProduct(emptyProduct);
    setKey(key)
    setSubmitted(false);
    setProductDialog(true);
  }

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  }

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  }

  const editProduct = (product, key) => {
    setProduct({ ...product });
    setCheckCategory(product.category)
    setProductDialog(true);
    setKey(key)
  }

  const onInputChange = (e, name) => {
    const val = e.target.value;
    let _product = { ...product };
    _product[`${name}`] = val;
    setProduct(_product);
  }
  const onCategoryChange = (e) => {
    let _product = { ...product };
    _product['category'] = e.value;
    setProduct(_product);
  }
  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  }
  const onImageChange = (e, name) => {
    const data = new FormData()
    data.append('image', e.target.files[0])
    Axios.post("http://localhost:8080/api/uploads", data).then(res => {
      let _product = { ...product };
      _product[`${name}`] = res.data;
      setProduct(_product);
    })

  }
  const saveEdit = () => {
    console.log('key', key);
    if (key === 'edit') {
      try {
        Axios.put(`http://localhost:8080/api/product/update-product/${product._id}`, product).then(res => {
          toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
          setCheck(!check)
        })
      } catch (error) {
        console.log(error);
        toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Product error', life: 3000 });
      }

      setSubmitted(false);
      setProductDialog(false);
    } else {
      try {
        Axios.post("http://localhost:8080/api/product/post-product", product).then(res => {
          toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Add', life: 3000 });
          setCheck(!check)
        })
      } catch (error) {
        console.log(error);
        toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Product error', life: 3000 });
      }
      setSubmitted(false);
      setProductDialog(false);
    }
  }
  const openDeleteProduct = (product) => {
    setProduct({ ...product });
    setDeleteProductDialog(true)
  }
  const deleteProductDialogFooter = () => {
    return (
      <React.Fragment>
        <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
        <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
      </React.Fragment>
    )
  }
  const deleteProduct = () => {
    try {
      Axios.delete(`http://localhost:8080/api/product/delete-product/${product._id}`).then(res => {
        setCheck(!check);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      })
    } catch (error) {
      console.log(error);
      toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Product error', life: 3000 });
    }
    setDeleteProductDialog(false);
    setProduct(emptyProduct);
  }
  const exportCSV = () => {
    dt.current.exportCSV();
  }
  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={() => openNew('add')} />
      </React.Fragment>
    )
  }

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" />
        <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
      </React.Fragment>
    )
  }

  const imageBodyTemplate = (rowData) => {
    return <img src={`${rowData.img_url}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.img_url} className="product-image" />
  }

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price);
  }

  const ratingBodyTemplate = (rowData) => {
    return <Rating value={rowData.rate} readOnly cancel={false} />;
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2 mr-2" onClick={() => editProduct(rowData, 'edit')} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => openDeleteProduct(rowData)} />
      </React.Fragment>
    );
  }
  const header = (
    <div className="table-header">
      <h5 className="p-m-0">Manage Products</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
      </span>
    </div>
  );

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
          <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

          <DataTable ref={dt} value={products}
            selection={selectedProducts}
            dataKey="id" paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
            onSelectionChange={(e) => setSelectedProducts(e.value)}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            globalFilter={globalFilter}
            let-i="rowIndex"
            header={header}>

            <Column headerStyle={{ width: '0.5rem' }}></Column>
            <Column field="name" header="Name" sortable></Column>
            <Column header="Image" body={imageBodyTemplate}></Column>
            <Column field="price" header="Price" body={priceBodyTemplate} sortable></Column>
            <Column field="category" header="Category" sortable></Column>
            <Column field="rate" header="rating" body={ratingBodyTemplate} sortable></Column>
            <Column field="brand" header="Brand" sortable></Column>
            <Column header="Action" body={actionBodyTemplate}></Column>
          </DataTable>
        </div>
        <Dialog visible={productDialog} style={{ width: '500px' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
          {product.img_url && <img src={`${product.img_url}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.img_url} className="product-image" />}
          <div className="p-field">
            <input type="file" onChange={e => onImageChange(e, 'img_url')} />
          </div>
          <div className="p-field">
            <label htmlFor="name">Name</label>
            <InputText id="name" onChange={(e) => onInputChange(e, 'name')} value={product.name} required autoFocus />
            {submitted && !product.name && <small className="p-error">Name is required.</small>}
          </div>
          <div className="p-field">
            <label htmlFor="description">Description</label>
            <CKEditor editor={ClassicEditor} data={product.description} onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
              let _product = { ...product };
              _product[`description`] = data;
              setProduct(_product);
            }} />
          </div>
          <div className="p-field">
            <label className="p-mb-3">Category</label>
            <div className="p-formgrid p-grid d-flex flex-wrap">
              {category ? category.map((item, index) => {
                return (
                  <div key={item._id} style={{ marginRight: "10px" }} className="p-field-radiobutton d-flex align-items-center p-col-6">
                    <RadioButton style={{ marginRight: "5px" }} name="category" onChange={onCategoryChange} value={item.category} checked={product.category === item.category} />
                    <label htmlFor="category1">{item.category}</label>
                  </div>
                )
              }) : <div>empty</div>}
            </div>
          </div>
          <div className="p-field">
            <label htmlFor="brand">Brand</label>
            <InputTextarea id="brand" onChange={(e) => onInputChange(e, 'brand')} value={product.brand} required rows={3} cols={20} />
          </div>
          <div className="p-formgrid p-grid">
            <div className="p-field p-col">
              <label htmlFor="price">Price</label>
              <InputNumber id="price" name="price" onChange={(e) => onInputNumberChange(e, 'price')} value={product.price} mode="currency" currency="VND" locale="vi-VN" />
            </div>
            <div className="p-field p-col">
            </div>
          </div>
        </Dialog>
        <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
          <div className="confirmation-content">
            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
            {product && <span>Are you sure you want to delete <b>{product.name}</b>?</span>}
          </div>
        </Dialog>
      </div>
    </div>
  )
}

export default ProductAdmin
