import { Button, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import APIClient from '../api/APIClient'
import Popup from './Popup';
import AddProduct from './add-product/AddProduct';
import EditProduct from './edit-product/EditProduct';
import SearchBar from './SearchBar';

const Products = () => {
    const [apiClient] = useState(() => new APIClient());
    const [loading, setLoading] = useState(false);
    const [productsList, setProductsList] = useState([]);
    const [deleteProduct, setDeleteProduct] = useState();
    const [editProductData, setEditProductData] = useState();
    const [showAddProductPopup, setShowAddProductPopup] = useState(false);
    const [showEditProductPopup, setShowEditProductPopup] = useState(false);
    const initialValues = {
        title: '',
        description: '',
        price: '',
        discountPercentage: '',
        rating: '',
        stock: '',
        brand: '',
        category: '',
    }
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const initialFetch = async () => {
            try {
                setLoading(true);
                const { data: { products } } = await apiClient.productService.getAllProducts();
                if (products && products.length > 0) {
                    setProductsList(products);
                }
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
                throw err;
            }
        }
        initialFetch();
    }, [apiClient])

    const handleDeleteProduct = async () => {
        try {
            setLoading(true);
            setShowDeletePopup(false);
            setProductsList(prevProductsList =>
                prevProductsList.filter(product => product.id !== deleteProduct.id)
            );
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
            throw err;
        }
    };


    const addProduct = async (values) => {
        try {
            setLoading(true);
            const { data } = await apiClient.productService.createProduct(values);
            setProductsList(prevProductsList => [...prevProductsList, data]);
            setShowAddProductPopup(false);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
            throw err;
        }
    }

    const editProduct = async (values) => {
        try {
            setLoading(true);
            const updatedValues = { ...values };
            delete updatedValues.id;
            const { data } = await apiClient.productService.updateProduct(editProductData?.id, updatedValues);
            console.log(data);
            setProductsList(prevProductsList => {
                return prevProductsList.map(product => {
                    if (product.id === data.id) {
                        return data;
                    } else {
                        return product;
                    }
                });
            });
            setShowEditProductPopup(false);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
            throw err;
        }
    }

    const handleSearch = async (searchValue) => {
        try {
            setLoading(true);
            const { data: { products } } = await apiClient.productService.searchProduct(searchValue);
            if (products && products.length > 0) {
                setProductsList(products);
            }
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
            throw err;
        }
    }

    return (
        <div className='p-5'>
            <div className='d-flex align-items-center justify-content-between'>
                <h1>List of All Products</h1>
                <Button onClick={() => setShowAddProductPopup(true)} variant='info'>+ Add Product</Button>
            </div>
            <SearchBar handleSearch={handleSearch} />
            {!loading ?
                <Table borderless>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {(productsList && productsList.length > 0) ? productsList.map((product, index) => (
                            <tr key={index}>
                                <td>{product.id}</td>
                                <td>{product.title || 'No title Found'}</td>
                                <td>{product.category || 'No Category'}</td>
                                <td>{product.description || 'No Description Found'}</td>
                                <td>${product.price || 0}</td>
                                <td><Button onClick={() => navigate(`/products/view/${product.id}`)}>View</Button></td>
                                <td><Button onClick={() => {
                                    setShowEditProductPopup(true);
                                    setEditProductData(product);
                                }} variant='warning'>Edit</Button></td>
                                <td><Button onClick={() => {
                                    setShowDeletePopup(true);
                                    setDeleteProduct(product);
                                }} variant='danger' >Delete</Button></td>
                            </tr>
                        )) : <tr><td><p>No Products</p></td></tr>}
                    </tbody>
                </Table > : <div>Loading...</div>}
            <Popup
                showPopup={showDeletePopup}
                setShowPopup={setShowDeletePopup}
                title={`Are you sure you want to delete this ${deleteProduct?.title} ?`}
                proceedBtnName='Yes'
                closeBtnName='No'
                loading={loading}
                handleProceed={handleDeleteProduct}
            />
            <AddProduct
                showPopup={showAddProductPopup}
                setShowPopup={setShowAddProductPopup}
                handleProceed={addProduct}
                loading={loading}
                initialValues={initialValues}
            />
            <EditProduct
                showPopup={showEditProductPopup}
                setShowPopup={setShowEditProductPopup}
                handleProceed={editProduct}
                loading={loading}
                editProductData={editProductData}
            />
        </div>
    )
}

export default Products