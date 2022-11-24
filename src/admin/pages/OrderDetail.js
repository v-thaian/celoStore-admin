import React, { useState, useEffect } from "react";
import { getOrderById, getOrderDetailByOrderId } from "../../api/OrderApi";
import { useParams, NavLink, useHistory } from "react-router-dom";

const OrderDetail = () => {
  const history = useHistory();
  const [orderDetail, setOrderDetail] = useState([]);
  const [order, setOrder] = useState({});
  const { id } = useParams();
  const [amount, setAmount] = useState();
  const [sale, setSale] = useState();
  const [total, setTotal] = useState();

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    getOrderById(id).then((resp) => {
      setOrder(resp.data);
      setSale(resp.data.voucher ? resp.data.voucher.discount : 0);
      setTotal(resp.data.total);
    });
    getOrderDetailByOrderId(id).then((resp) => {
      setOrderDetail(resp.data);
      const result = resp.data.reduce(
        (price, item) => price + item.sellPrice * item.quantity,
        0
      );
      setAmount(result);
    });
  };
  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="container-fluid row padding mb-5 card">
      <button style={{ width: 60 }} onClick={() => goBack()}>
        <i
          className="fa fa-arrow-left"
          style={{ fontSize: 18 }}
          aria-hidden="true"
        ></i>
      </button>
      <div className="col-12 welcome mb-5 mt-5">
        <div className="col-10 offset-1 text-center ">
          <p
            className="display-4 text-danger"
            style={{ fontSize: "34px", fontWeight: "bolder" }}
          >
            Đơn hàng #{order && order.id}
          </p>
        </div>
        <div className="col-12 row mb-5 mt-5">
          <div className="col-6 text ">
            <p className="display-4 text-primary" style={{ fontSize: "24px" }}>
              Thông tin mua hàng
            </p>
            <p>Ngày tạo: {order && order.createDate}</p>
            <p>Người nhận: {order && order.fullname}</p>
            <p>Email: {order && order.email}</p>
          </div>
          <div className="col-6 text ">
            <p className="display-4 text-primary" style={{ fontSize: "24px" }}>
              Địa chỉ nhận hàng
            </p>
            <p>SDT: {order && order.phone}</p>
            <p>DC: {order && order.address}</p>
          </div>
        </div>
        <div className="col-12 mb-5">
          <p className="display-4 text-primary" style={{ fontSize: "24px" }}>
            Chi tiết đơn hàng
          </p>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">Tên sản phẩm</th>
                <th scope="col">Size</th>
                <th scope="col">Giá</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Tổng</th>
              </tr>
            </thead>
            <tbody>
              {orderDetail &&
                orderDetail.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{item.attribute.name}</th>
                    <td>{item.attribute.size}</td>
                    <td>{item.sellPrice.toLocaleString()}₫</td>
                    <td>{item.quantity}</td>
                    <td>
                      {(item.sellPrice * item.quantity).toLocaleString()}₫
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="row mb-5">
            <div className="col-12 text ">
              <p style={{ fontWeight: "bolder" }}>
                Tạm tính: {amount && amount.toLocaleString()} đ
              </p>
              <p style={{ fontWeight: "bolder" }}>
                Giảm giá: -{" "}
                {sale ? ((amount * sale) / 100).toLocaleString() : 0} đ
              </p>
              <p className="text-danger" style={{ fontWeight: "bolder" }}>
                Tổng cộng: {total && total.toLocaleString()} đ
              </p>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col text ">
              <p
                className="display-4 text-primary"
                style={{ fontSize: "24px" }}
              >
                Trạng thái thanh toán
              </p>
              <p className="text-danger" style={{ fontWeight: "bolder" }}>
                {order && order.isPending ? "Đã thanh toán" : "Chưa thanh toán"}
              </p>
            </div>
            <div className="col text ">
              <p
                className="display-4 text-primary"
                style={{ fontSize: "24px" }}
              >
                Trạng thái đơn hàng
              </p>
              <p className="text-danger" style={{ fontWeight: "bolder" }}>
                {order.orderStatus && order.orderStatus.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
