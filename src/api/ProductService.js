class ProductService {
    constructor(axiosInstance) {
        this.axios = axiosInstance;
    }

    getAllProducts() {
        try {
            return this.axios.get('/');
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    getAllProductCategories() {
        try {
            return this.axios.get('/categories');
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    getProductByID(productID) {
        try {
            return this.axios.get(`/${productID}`)

        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    createProduct(productData) {
        try {
            return this.axios.post('/add', productData)

        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    updateProduct(productID, productData) {
        try {
            return this.axios.put(`/${productID}`, productData)

        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    deleteProduct(productID) {
        try {
            return this.axios.delete(`/${productID}`)

        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    searchProduct(searchValue){
        try {
            return this.axios.get(`/search?q=${searchValue}`)

        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}

export default ProductService;