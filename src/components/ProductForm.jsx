import { Formik, Form, Field } from 'formik';
import { Button, FormGroup, FormLabel } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import APIClient from '../api/APIClient';

const ProductForm = ({ handleSubmit, loading, initialValues, type = 'add' }) => {
    const [apiClient] = useState(() => new APIClient());
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchInitialCategories = async () => {
            try {
                const { data } = await apiClient.productService.getAllProductCategories();
                setCategories(data);
            } catch (err) {
                console.log(err);
                throw err;
            }
        }
        void fetchInitialCategories();

    }, [apiClient])

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            {() => (
                <Form>
                    <FormGroup controlId="title">
                        <FormLabel>Title</FormLabel>
                        <Field type="text" name="title" className="form-control" required />
                    </FormGroup>
                    <FormGroup controlId="description">
                        <FormLabel>Description</FormLabel>
                        <Field type="text" name="description" className="form-control" required />
                    </FormGroup>
                    <FormGroup controlId="price">
                        <FormLabel>Price ($)</FormLabel>
                        <Field type="number" name="price" className="form-control" required min='0' />
                    </FormGroup>
                    <FormGroup controlId="discountPercentage">
                        <FormLabel>Discount Percentage (%)</FormLabel>
                        <Field
                            type="text"
                            name="discountPercentage"
                            className="form-control"
                            pattern="\d+(\.\d{1,2})?"
                            min='0'
                            max='100'
                            step='0.01'
                            required
                        />
                    </FormGroup>
                    <FormGroup controlId="discountPercentage">
                        <FormLabel>Rating</FormLabel>
                        <Field
                            type="text"
                            name="rating"
                            className="form-control"
                            pattern="\d+(\.\d{1,2})?"
                            min='0'
                            max='5'
                            step='0.01'
                            required
                        />
                    </FormGroup>
                    <FormGroup controlId="stock">
                        <FormLabel>Stock</FormLabel>
                        <Field type="number" name="stock" className="form-control" required />
                    </FormGroup>
                    <FormGroup controlId="brand">
                        <FormLabel>Brand</FormLabel>
                        <Field type="text" name="brand" className="form-control" />
                    </FormGroup>
                    <FormGroup controlId="category">
                        <FormLabel>Category</FormLabel>
                        <Field as="select" name="category" className="form-control" required>
                            <option value="">Select a category</option>
                            {categories?.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </Field>
                    </FormGroup>
                    <Button type="submit" variant="primary" disabled={loading} className='mt-3'>
                        {loading ? `${type === 'add' ? 'Adding...' : 'Editing...'}` : `${type === 'add' ? 'Add Product' : 'Edit Product'}`}
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default ProductForm;
