import axios from 'axios'

const Instance = axios.create({
    baseURL: "http://localhost:8080",
    headers:{
        "Content-Type" : "application/json"
    }
});
const accessToken = localStorage.getItem('token');
  
  Instance.interceptors.request.use(
    config => {
        config.headers.authorization = `Bearer ${accessToken}`;
        return config;
    },
    error =>{
        return Promise.reject(error)
    }
  );
  

export default Instance