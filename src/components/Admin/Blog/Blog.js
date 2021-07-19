import Column from 'antd/lib/table/Column';
import Axios from 'axios';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import React, { useEffect, useRef, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './Blog.css'
function Blog() {
    const emptyBlog = {
        title: '',
        img_url: '',
        description: '',
        categoryBlog: ''
    }
    const [blog, setBlog] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [blogItem, setBlogItem] = useState(emptyBlog);
    const [blogDialog, setBlogDialog] = useState(false);
    const [deleteBlogDialog, setDeleteBlogDialog] = useState(false);
    const [key, setKey] = useState('');
    const [check, setCheck] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);
    useEffect(() => {
        Axios.get("http://localhost:8080/api/blog/get-all-blog").then((result) => {
            setBlog(result.data);
        });
        window.scrollTo(0, 0)
    }, [check]);
    const openNew = (key) => {
        setKey(key);
        setBlogItem(emptyBlog);
        // setSubmitted(false);
        setBlogDialog(true);
    };
    const onImageChange = (e, name) => {
        const data = new FormData()
        data.append('image', e.target.files[0])
        Axios.post("http://localhost:8080/api/uploads", data).then(res => {
            let _blog = { ...blogItem };
            _blog[`${name}`] = res.data;
            setBlogItem(_blog);
        })
    }
    const onInputChange = (e, name) => {
        const val = e.target.value;
        let _blog = { ...blogItem };
        _blog[`${name}`] = val;
        setBlogItem(_blog);
    }
    const hideDialog = () => {
        setBlogDialog(false);
    }
    const saveEdit = () => {
        if (key === 'add') {
            try {
                Axios.post("http://localhost:8080/api/blog/post-blog", blogItem).then((result) => {
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'blog Add', life: 3000 });
                    setCheck(!check)
                });
            } catch (error) {
                console.log(error);
                toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Blog error', life: 3000 });
            }

        } else {
            try {
                Axios.put(`http://localhost:8080/api/blog//update-blog/${blogItem._id}`, blogItem).then((result) => {
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'blog update', life: 3000 });
                    setCheck(!check)
                });
            } catch (error) {
                console.log(error);
                toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Blog error', life: 3000 });
            }
        }
        setBlogDialog(false)
    }
    const editBlog = (item, key) => {
        setBlogItem({ ...item });
        setKey(key);
        setBlogDialog(true);
    }
    const deleteDialog = (item) => {
        setBlogItem({ ...item });
        setDeleteBlogDialog(true)
    }
    const deleteBlog = () => {
        try {
            Axios.delete(`http://localhost:8080/api/blog/delete-blog/${blogItem._id}`).then(res => {
                setCheck(!check);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Blog Deleted', life: 3000 });
            })
        } catch (error) {
            console.log(error);
            toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Blog error', life: 3000 });
        }
        setDeleteBlogDialog(false)
        setBlogItem(emptyBlog)
    }
    const deleteBlogDialogFooter = () => {
        return (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteBlogDialog(false)} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteBlog} />
            </React.Fragment>
        )
    }
    const imageBodyTemplate = (rowData) => {
        return <img src={`${rowData.img_url}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.img_url} className="blog-image" />
    }
    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Manage Blog</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2 mr-2" onClick={() => editBlog(rowData, 'edit')} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => deleteDialog(rowData)} />
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
    const blogDialogFooter = (
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

                    <DataTable ref={dt} value={blog}
                        dataKey="id" paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={globalFilter}
                        let-i="rowIndex"
                        header={header}>
                        <Column headerStyle={{ width: '0.5rem' }}></Column>
                        <Column field="title" header="Title"></Column>
                        <Column header="Image" body={imageBodyTemplate}></Column>
                        <Column field="categoryBlog" header="Category Blog"></Column>
                        <Column header="Action" body={actionBodyTemplate}></Column>
                    </DataTable>
                </div>
                <Dialog visible={blogDialog} style={{ width: '1200px' }} header="Product Details" modal className="p-fluid" footer={blogDialogFooter} onHide={hideDialog}>
                    {blogItem.img_url && <img src={`${blogItem.img_url}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={blogItem.img_url} className="product-image" />}
                    <div className="p-field">
                        <input type="file" onChange={e => onImageChange(e, 'img_url')} />
                    </div>
                    <div className="p-field">
                        <label className="edit-lable" htmlFor="name">Title</label>
                        <InputText id="name" onChange={(e) => onInputChange(e, 'title')} value={blogItem.title} required autoFocus />
                        {/* {submitted && !blogItem.title && <small className="p-error">Title is required.</small>} */}
                    </div>
                    <div className="p-field">
                        <label className="edit-lable" htmlFor="description">Description</label>
                        <CKEditor editor={ClassicEditor} data={blogItem.description} onChange={(event, editor) => {
                            const data = editor.getData();
                            console.log({ event, editor, data });
                            let _blog = { ...blogItem };
                            _blog[`description`] = data;
                            setBlogItem(_blog);
                        }} />
                    </div>
                    <div className="p-field">
                        <label className="p-mb-3 edit-lable">Category</label>
                        <InputText id="name" onChange={(e) => onInputChange(e, 'categoryBlog')} value={blogItem.categoryBlog} required autoFocus />
                    </div>
                </Dialog>

                <Dialog visible={deleteBlogDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteBlogDialogFooter} onHide={() => setDeleteBlogDialog(false)}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                        {blogItem && <span>Are you sure you want to delete <b>{blogItem.title}</b>?</span>}
                    </div>
                </Dialog>
            </div>
        </div>
    )
}

export default Blog
