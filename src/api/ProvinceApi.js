import axios from 'axios'

export const getAllProvince = () =>{
    return axios.create({
        baseURL: "https://provinces.open-api.vn",
        headers:{
            "Content-Type" : "application/json"
        }
    }).get("/api/?depth=3");
}