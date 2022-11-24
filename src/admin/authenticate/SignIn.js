import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./signin.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { signIn, getMe } from "../../api/AccountApi";

const SignIn = (props) => {
  const history = useHistory();

  const signInHandler = (data) => {
    const userFlag = {
      ...data,
      admin: true,
    };
    signIn(userFlag)
      .then((res) => {
        toast.success("Đăng nhập thành công!");
        localStorage.setItem("token", res.data.accessToken);
        getMe(res.data.accessToken)
          .then((res) => {
            props.userHandler(res.data);
            localStorage.setItem("username", "admin");
            localStorage.setItem("password", "123456");
            if (res.data.roleName === "ADMIN") {
              history.push("/");
            } else {
              history.push("/orders");
            }
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => toast.error(error.response.data.Errors));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div>
      {" "}
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">
                      Administrator
                    </h2>
                    <form
                      className="needs-validation"
                      onSubmit={handleSubmit(signInHandler)}
                    >
                      <div className="form-outline form-white mb-4">
                        <input
                          type="text"
                          id="typeEmailX"
                          className="form-control form-control-lg"
                          {...register("username", {
                            required: true,
                            pattern: /^\s*\S+.*/,
                          })}
                        />
                        <label className="form-label" htmlFor="typeEmailX">
                          Tài khoản
                        </label>
                        {errors.username && (
                          <div className="alert alert-danger" role="alert">
                            Tài khoản không hợp lệ!
                          </div>
                        )}
                      </div>
                      <div className="form-outline form-white mb-4">
                        <input
                          type="password"
                          id="typePasswordX"
                          className="form-control form-control-lg"
                          {...register("password", {
                            required: true,
                            pattern: /^\s*\S+.*/,
                          })}
                        />
                        <label className="form-label" htmlFor="typePasswordX">
                          Mật khẩu
                        </label>
                        {errors.password && (
                          <div className="alert alert-danger" role="alert">
                            Mật khẩu không hợp lệ!
                          </div>
                        )}
                      </div>
                      <p className="small mb-5 pb-lg-2">
                        <a className="text-white-50" href="#!">
                          Quên mật khẩu?
                        </a>
                      </p>
                      <button
                        className="btn btn-outline-light btn-lg px-5"
                        type="submit"
                      >
                        Đăng nhập
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
