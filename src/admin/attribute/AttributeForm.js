import React from "react";

const AttributeForm = () => {
  return (
    <form className="card">
      <div className="form-row">
        <div className="form-group col-md-6">
          <label>Size</label>
          <select id="inputState" className="form-control">
            <option selected>Choose...</option>
            <option>39</option>
            <option>40</option>
            <option>41</option>
          </select>
        </div>
        <div className="form-group col-md-6">
          <label>Giá</label>
          <input type="number" className="form-control" />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-10">
          <label>Số lượng</label>
          <input type="number" className="form-control" />
        </div>
      </div>
    </form>
  );
};

export default AttributeForm;
