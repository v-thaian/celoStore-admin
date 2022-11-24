import React, { useState } from "react";
import {upload} from "../services/upload-files.service";

const Upload = () => {
  const [file, setFile] = useState();

  const onFileChange = (event) => {
    const images = Array.from(event.target.files);
    console.log(images)
    setFile(images);
  };

  const submitHandler = (e) => {
    // file.forEach((item) => console.log(item))
    e.preventDefault();
    file.forEach((item) => {
      upload(item)
      .then((resp) => console.log(resp.data))
      .catch((error) => console.log(error.response.data));
    })
  };

  return (
    <div>
        <div className="input-group mb-3">
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="inputGroupFile02"
              multiple
              onChange={(e) => onFileChange(e)}
            />
            <label className="custom-file-label" htmlFor="inputGroupFile02">
              Choose file
            </label>
          </div>
        </div>
        <button onClick={(e) => submitHandler(e)}>Upload</button>
    </div>
  );
};

export default Upload;
