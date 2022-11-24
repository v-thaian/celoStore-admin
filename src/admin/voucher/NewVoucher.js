import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {createVoucher} from '../../api/VoucherApi';
import { toast } from "react-toastify";

const NewVoucher = () => {
  const history = useHistory();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) =>{
    const result = {
      ...data,
      id: null,
      createDate: null,
      isActive: null
    }
    createVoucher(result)
    .then(() => {
      toast.success("Thêm voucher thành công.");
      history.push('/vouchers');
    })
    .catch((error) => toast.error(error.response.data.Errors));
  }
  return (
    <div className="container-fluid card">
      <div className="col-10 offset-1 text-center">
        <h2 className="text-danger">Voucher</h2>
      </div>
      <div className="row">
        <div className="col-10 offset-1">
          <form className="needs-validation" onSubmit={handleSubmit(submitHandler)}>
            <div className="row g-3">
              <div className="col-sm-6">
                <label className="form-label">Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  {...register("code", {
                    required: true,
                    pattern: /^\s*\S+.*/
                  })}
                />
                {errors.code && (
                  <div className="alert alert-danger" role="alert">
                    Code không hợp lệ!
                  </div>
                )}
              </div>
              <div className="col-sm-6">
                <label className="form-label">Giảm giá</label>
                <input
                  type="number"
                  className="form-control"
                  id="lastName"
                  {...register("discount", {
                    required: true,
                    min: 0,
                    max: 100
                  })}
                />
                {errors.discount && (
                  <div className="alert alert-danger" role="alert">
                    Giảm giá không hợp lệ!
                  </div>
                )}
              </div>
              <div className="col-sm-6 mt-5">
                <label className="form-label">Lượt sử dụng</label>
                <input
                  type="number"
                  className="form-control"
                  id="lastName"
                  {...register("count", {
                    required: true,
                    min: 0
                  })}
                />
                {errors.count && (
                  <div className="alert alert-danger" role="alert">
                    Lượt sử dụng không hợp lệ!
                  </div>
                )}
              </div>
              <div className="col-sm-6 mt-5">
                <label className="form-label">Ngày hết hạn</label>
                <input
                  type="date"
                  min="2022-01-01"
                  max="2023-01-01"
                  className="form-control"
                  id="lastName"
                  {...register("expireDate", {
                    required: true
                  })}
                />
              </div>
            </div>
            <button
              className="btn btn-primary btn-lg mt-5 mb-5"
              type="submit"
              style={{ marginLeft: 80, borderRadius: 50 }}
            >
              Thêm mới
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewVoucher;
