import React, { useState, useEffect } from 'react'
import { Image, Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import APIClient from '../api/APIClient';

const ViewProduct = () => {
    const [apiClient] = useState(() => new APIClient());
    const { productID } = useParams();
    const [loading, setLoading] = useState(false);
    const [viewProduct, setViewProduct] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const initialFetch = async () => {
            try {
                setLoading(true);
                const { data } = await apiClient.productService.getProductByID(productID);
                if (data) {
                    setViewProduct(data);
                }
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
                throw err;
            }
        }
        void initialFetch();
    }, [apiClient, productID]);
    return (
        <div className='p-5'>
            <p
                onClick={() => navigate('/products')}
                className='text-decoration-underline fw-bold'
                style={{cursor: 'pointer'}}
            >&lt; back to all products</p>
            <h1>
                View Product
            </h1>
            {viewProduct && !loading ?
                <Table borderless>
                    <tbody>
                        <tr>
                            <td>
                                Title of the Product:
                            </td>
                            <td>
                                {viewProduct.title}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Category:
                            </td>
                            <td>
                                {viewProduct.category}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Brand:
                            </td>
                            <td>
                                {viewProduct.brand}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Description:
                            </td>
                            <td>
                                {viewProduct.description}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Price:
                            </td>
                            <td>
                                ${viewProduct.price}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Rating:
                            </td>
                            <td>
                                ${viewProduct.rating}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Stock:
                            </td>
                            <td>
                                {viewProduct.stock}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Thumbnail:
                            </td>
                            <td>
                                {viewProduct.thumbnail ? <Image src={viewProduct.thumbnail} /> : 'No Thumbnail Displayed'}
                            </td>
                        </tr>
                    </tbody>
                </Table>
                : <div>Loading ...</div>}
        </div>
    )
}

export default ViewProduct