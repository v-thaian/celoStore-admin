import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { getAccountDetailByAccountId, updateAccount } from "../../api/AccountApi";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const role = {
  "ADMIN": 1,
  "EMP": 2,
  "CUS": 3
}
const EditAccount = () => {
  const { id } = useParams();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    getAccountDetailByAccountId(id)
      .then((resp) => {
        console.log(resp.data);
        reset(resp.data);
      })
      .catch((error) => toast.error(error.response.data.Errors));
  }, []);

  const onSubmitHandler = (data) => {
    const result = {
      id: data.id,
      isActive: data.isActive,
      roleId: role[data.roleName],
      fullName: data.fullName,
      gender: data.gender,
      phone: data.phone,
      email: data.email,
      address: data.address,
      birthDate: data.birthDate
    }
    updateAccount(result)
    .then(() => {
        toast.success("Cập nhật thành công.");
        history.push('/accounts');
    })
    .catch((error) => toast.error(error.response.data.Errors));
  };

  return (
    <div className="pb-3 container-fluid card">
      <div className="py-3 col-10 offset-1 text-center">
        <h2 className="text-danger">Tài khoản</h2>
      </div>
      <div className="col-10 offset-1">
        <form
          className="needs-validation"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className="row g-3">
            <div className="col-sm-6 mt-5">
              <label className="form-label">Họ tên</label>
              <input
                type="text"
                className="form-control"
                {...register("fullName", {
                  required: true,
                  pattern: /^\s*\S+.*/,
                })}
              />
              {errors.fullName && (
                <div className="alert alert-danger" role="alert">
                  Họ tên không hợp lệ!
                </div>
              )}
            </div>
            <div className="col-sm-6 mt-5">
              <label className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                {...register("email", {
                  required: true,
                  pattern: /^\s*\S+.*/,
                })}
              />
              {errors.email && (
                <div className="alert alert-danger" role="alert">
                  Email không hợp lệ!
                </div>
              )}
            </div>
            <div className="col-sm-6 mt-5">
              <label className="form-label">Giới tính</label> <br />
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  {...register("gender", {
                    required: true,
                  })}
                  value="Nam"
                />
                <label class="form-check-label" for="inlineRadio1">
                  Nam
                </label>
              </div>
              <div class="form-check form-check-inline ml-5">
                <input
                  class="form-check-input"
                  type="radio"
                  {...register("gender", {
                    required: true,
                  })}
                  value="Nữ"
                />
                <label class="form-check-label">Nữ</label>
              </div>
            </div>
            <div className="col-12 mt-5">
              <label className="form-label">Địa chỉ</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={3}
                {...register("address", {
                  required: true,
                  pattern: /^\s*\S+.*/,
                })}
              ></textarea>
              {errors.address && (
                <div className="alert alert-danger" role="alert">
                  Địa chỉ không hợp lệ!
                </div>
              )}
            </div>

            <div className="col-sm-6 mt-5">
              <label className="form-label">Số điện thoại</label>
              <input
                type="text"
                className="form-control"
                {...register("phone", {
                  required: true,
                  pattern: /^0[0-9]{9}$/,
                })}
              />
              {errors.phone && (
                <div className="alert alert-danger" role="alert">
                  Số điện thoại không hợp lệ!
                </div>
              )}
            </div>
            <div className="col-sm-6 mt-5">
              <label className="form-label">Ngày sinh</label>
              <input
                type="date"
                className="form-control"
                {...register("birthDate", {
                  required: true
                })}
              />
              {errors.birthDate && (
                <div className="alert alert-danger" role="alert">
                  Ngày sinh không hợp lệ!
                </div>
              )}
            </div>
            <div className="col-sm-6 mt-5">
              <label className="form-label">Vai trò</label>
              <select
                className="form-control"
                {...register("roleName", { required: true })}
              >
                <option value="ADMIN">ADMIN</option>
                <option value="EMP">NHÂN VIÊN</option>
                <option value="CUS">KHÁCH HÀNG</option>
              </select>
            </div>
            <div className="col-sm-6 mt-5">
              <label className="form-label">Trạng thái</label>
              <select
                className="form-control"
                {...register("isActive", { required: true })}
              >
                <option value="true">Hoạt động</option>
                <option value="false">Không hoạt động</option>
              </select>
            </div>
          </div>

          <button
            className="btn btn-primary btn-lg mt-5 mb-5"
            type="submit"
            style={{ marginLeft: 500, borderRadius: 50 }}
          >
            Cập nhật
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAccount;
