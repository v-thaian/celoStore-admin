import React from "react";
import { useForm } from "react-hook-form";
import {createAccount} from '../../api/AccountApi';
import { useHistory} from "react-router-dom";
import { toast } from "react-toastify";

const NewAccount = () => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitHandler = (data) => {
    console.log(data);
    createAccount(data)
    .then(() => {
      toast.success("Thêm tài khoản thành công.");
      history.push('/accounts')
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
            <div className="col-sm-6 mt-2">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                {...register("username", {
                  required: true,
                  pattern: /^\s*\S+.*/
                })}
              />
              {errors.username && (
                <div className="alert alert-danger" role="alert">
                  User không hợp lệ!
                </div>
              )}
            </div>
            <div className="col-sm-6 mt-2">
              <label className="form-label">Mật khẩu</label>
              <input
                type="password"
                className="form-control"
                {...register("password", {
                  required: true,
                  pattern: /^\s*\S+.*/
                })}
              />
              {errors.password && (
                <div className="alert alert-danger" role="alert">
                  Mật khẩu không hợp lệ!
                </div>
              )}
            </div>
            <div className="col-sm-6 mt-5">
              <label className="form-label">Họ tên</label>
              <input
                type="text"
                className="form-control"
                {...register("fullName", {
                  required: true,
                  pattern: /^\s*\S+.*/
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
                  pattern: /^\s*\S+.*/
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
                  required: true
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
                  required: true
                })}
                  value="Nữ"
                />
                <label class="form-check-label">
                  Nữ
                </label>
              </div>
              {errors.gender && (
                <div className="alert alert-danger" role="alert">
                  Mời chọn giới tính!
                </div>
              )}
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
                  pattern: /^0[0-9]{9}$/
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
                  {...register("roleId", { required: false })}
                >
                  <option value="2">Nhân viên</option>
                  <option value="3">Khách hàng</option>
                </select>
              </div>            
          </div>

          <button
            className="btn btn-primary btn-lg mt-5 mb-5"
            type="submit"
            style={{ marginLeft: 500, borderRadius: 50 }}
          >
            Thêm mới
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewAccount;
