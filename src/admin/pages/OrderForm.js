import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  getOrderById,
  getOrderDetailByOrderId,
  updateOrder,
} from "../../api/OrderApi";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const OrderForm = () => {
  const [order, setOrder] = useState();
  const [orderDetail, setOrderDetail] = useState([]);
  const [amount, setAmount] = useState();
  const [sub, setSub] = useState();
  const id = useParams();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    getOrderById(id.id)
      .then((resp) => {
        setOrder(resp.data);
        reset({
          ...resp.data,
          orderStatus: resp.data.orderStatus.id,
        });
        setAmount(resp.data.total);
      })
      .catch((error) => console.log(error));
    getOrderDetailByOrderId(id.id)
      .then((resp) => {
        setOrderDetail(resp.data);
        const result = resp.data.reduce(
          (price, item) => price + item.sellPrice * item.quantity,
          0
        );
        setSub(result);
      })
      .catch((error) => console.log(error));
  };

  const onSubmitHandler = (data) => {
    const result = {
      orderId: order.id,
      address: data.address,
      fullname: data.fullname,
      phone: data.phone,
      email: data.email,
      note: data.note,
      isPending: data.isPending,
    };
    updateOrder(result)
      .then(() => {
        toast.success("Cập nhật thành công.");
        history.push("/orders");
      })
      .catch((error) => toast.error(error.response.data.Errors));
  };
  return (
    <div className="pb-3 container-fluid card">
      <div className="py-3 col-10 offset-1 text-center">
        <h2 className="text-danger">Đơn hàng #OD{id.id}</h2>
      </div>
      <div className="row">
        <div className="col-md-5 col-lg-4 order-md-last">
          <h4 className="d-flex justify-content-between align-items-center mb-5">
            <span className="text-dark">Chi tiết đơn hàng</span>
          </h4>
          <ul className="list-group mb-3">
            {orderDetail &&
              orderDetail.map((item, index) => (
                <li
                  className="list-group-item d-flex justify-content-between lh-sm"
                  key={index}
                >
                  <div>
                    <h6 className="my-0">
                      {item.attribute.name} - Size {item.attribute.size}
                    </h6>
                    <small className="text-muted">
                      Giá {item.sellPrice.toLocaleString()} x {item.quantity}
                    </small>
                  </div>
                  <strong>
                    {(item.sellPrice * item.quantity).toLocaleString()} đ
                  </strong>
                </li>
              ))}
            {sub > amount && (
              <li className="list-group-item d-flex justify-content-between">
                <span>Giá giảm (VND)</span>
                <strong>- {(sub - amount).toLocaleString()} đ</strong>
              </li>
            )}
            <li className="list-group-item d-flex justify-content-between">
              <span>Tổng tiền (VND)</span>
              <strong>{amount && amount.toLocaleString()} đ</strong>
            </li>
          </ul>
        </div>
        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3">Địa chỉ nhận hàng</h4>
          <form
            className="needs-validation"
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <div className="row g-3">
              <div className="col-12 mt-2">
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

              <div className="col-sm-6 mt-2">
                <label className="form-label">Họ tên</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  {...register("fullname", {
                    required: true,
                    pattern: /^\s*\S+.*/,
                  })}
                />
                {errors.fullname && (
                  <div className="alert alert-danger" role="alert">
                    Họ tên không hợp lệ!
                  </div>
                )}
              </div>
              <div className="col-sm-6 mt-2">
                <label className="form-label">Số điện thoại</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
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

              <div className="col-sm-6 mt-2">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  {...register("email", {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  })}
                />
                {errors.email && (
                  <div className="alert alert-danger" role="alert">
                    Email không hợp lệ!
                  </div>
                )}
              </div>
              <div className="col-12 mt-2">
                <label className="form-label">Ghi chú</label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows={3}
                  {...register("note", { required: false })}
                />
              </div>
              <div className="col-sm-6 mt-2">
                <label className="form-label">Trạng thái thanh toán</label>
                <select
                  className="form-control"
                  {...register("isPending", { required: false })}
                >
                  <option value="false">Chưa thanh toán</option>
                  <option value="true">Đã thanh toán</option>
                </select>
              </div>
            </div>

            <button
              className="btn btn-primary btn-lg mt-5 mb-5"
              type="submit"
              style={{ marginLeft: 680, borderRadius: 50 }}
            >
              Cập nhật
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
