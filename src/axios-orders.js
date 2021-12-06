import axios from 'axios';

const instance = axios.create({
    baseURL : "https://burger-store-343c5-default-rtdb.firebaseio.com/"
});

export default instance;