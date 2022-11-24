import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { updateVoucher, getVoucherDetail } from "../../api/VoucherApi";
import { toast } from "react-toastify";

const EditVoucher = () => {
  const history = useHistory();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    getVoucherDetail(id).then((resp) => {
      reset(resp.data);
    });
  }, []);

  const submitHandler = (data) => {
    const result = {
      ...data,
      id: id,
      createDate: null
    };
    console.log(result);
    updateVoucher(result)
      .then(() => {
        toast.success("Cập nhật voucher thành công.");
        history.push("/vouchers");
      })
      .catch((error) => toast.error(error.response.data.Errors));
  };

  return (
    <div className="container-fluid card">
      <div className="col-10 offset-1 text-center">
        <h2 className="text-danger">Voucher</h2>
      </div>
      <div className="row">
        <div className="col-10 offset-1">
          <form
            className="needs-validation"
            onSubmit={handleSubmit(submitHandler)}
          >
            <div className="row g-3">
              <div className="col-sm-6">
                <label className="form-label">Code</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("code", {
                    required: true,
                    pattern: /^\s*\S+.*/,
                  })}
                  readOnly
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
                  {...register("discount", {
                    required: true,
                    min: 0,
                    max: 100,
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
                  {...register("count", {
                    required: true,
                    min: 0,
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
                  {...register("expireDate", {
                    required: true,
                  })}
                />
              </div>
              <div className="col-sm-6 mt-5">
                <label className="form-label">Trạng thái hoạt động</label>
                <select
                  className="form-control"
                  {...register("isActive", { required: false })}
                >
                  <option value="false">Không hoạt động</option>
                  <option value="true">Hoạt động</option>
                </select>
              </div>
            </div>
            <button
              className="btn btn-primary btn-lg mt-5 mb-5"
              type="submit"
              style={{ marginLeft: 80, borderRadius: 50 }}
            >
              Cập nhật
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditVoucher;
