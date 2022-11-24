import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { updateSale, getSaleDetail } from "../../api/SaleApi";
import { toast } from "react-toastify";

const EditSale = () => {
  const history = useHistory();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    getSaleDetail(id).then((resp) => {
      reset(resp.data);
    });
  }, []);

  const submitHandler = (data) => {
    const result = {
      ...data,
      id: id,
      createDate: null,
    };
    console.log(result);
    updateSale(result)
      .then(() => {
        toast.success("Cập nhật khuyến mãi thành công.");
        history.push("/sale");
      })
      .catch((error) => toast.error(error.response.data.Errors));
  };
  return (
    <div className="container-fluid card">
      <div className="col-10 offset-1 text-center">
        <h2 className="text-danger">Khuyến mãi</h2>
      </div>
      <div className="row">
        <div className="col-10 offset-1">
          <form
            className="needs-validation"
            onSubmit={handleSubmit(submitHandler)}
          >
            <div className="row g-3">
              <div className="col-sm-6">
                <label className="form-label">Tên khuyến mãi</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("name", {
                    required: true,
                    pattern: /^\s*\S+.*/,
                  })}
                />
                {errors.name && (
                  <div className="alert alert-danger" role="alert">
                    Tên không hợp lệ!
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
                    max: 100
                  })}
                />
                {errors.discount && (
                  <div className="alert alert-danger" role="alert">
                    Tên không hợp lệ!
                  </div>
                )}
              </div>
              <div className="col-12 mt-5">
                <label className="form-label">Mô tả</label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows={3}
                  {...register("description", {
                    required: true,
                    pattern: /^\s*\S+.*/,
                  })}
                ></textarea>
                {errors.description && (
                  <div className="alert alert-danger" role="alert">
                    Mô tả không hợp lệ!
                  </div>
                )}
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

export default EditSale;
