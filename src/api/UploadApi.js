import axios from "axios";

export const upload = (files) =>{
    return axios({
        method: "POST",
        url: "http://localhost:8080/api/site/upload-image",
        data: files,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
}