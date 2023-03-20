import axios from 'axios';
import ProductService from './ProductService';

class APIClient {
    
    DEVELOPMENT_BASE_URL = "http://localhost:4000"

    constructor(){
        const APIAxiosInstance = axios.create({
            baseURL: this.DEVELOPMENT_BASE_URL,
          });
          this.productService = new ProductService(APIAxiosInstance);
    }
}

export default APIClient;