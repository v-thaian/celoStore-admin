import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import {
  getOrderById,
  getOrderDetailByOrderId,
  updateCancel,
  updateProcess,
  updateShip,
  updateSuccess,
} from "../../api/OrderApi";
import "../table/table.css";
import Badge from "../badge/Badge";
import { toast } from "react-toastify";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import Spinner from "../spinner/Spinner";

const orderStatus = {
  "Chờ xác nhận": "secondary",
  "Đang xử lí": "primary",
  "Đang vận chuyển": "warning",
  "Đã giao": "success",
  "Đã hủy": "danger",
};

const pendingStatus = {
  true: "success",
  false: "danger",
};

const SearchOrder = () => {
  const [orders, setOrders] = useState();
  const [status, setStatus] = useState(1);
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);
  const [showFouth, setShowFouth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shipment, setShipment] = useState(null);
  const [code, setCode] = useState(null);
  const [description, setDescription] = useState(null);
  const [reason, setReason] = useState(null);
  const [shipDate, setShipDate] = useState(null);

  const { id } = useParams();

  const shipmentHandler = (value) => {
    setShipment(value);
  };

  const codeHandler = (value) => {
    setCode(value);
  };

  const descriptionHandler = (value) => {
    setDescription(value);
  };

  const reasonHandler = (value) => {
    setReason(value);
  };

  const shipDateHandler = (value) => {
    setShipDate(value);
  };

  const [flagProcess, setFlagProcess] = useState(false);

  const handleCloseFirst = () => {
    setShowFirst(false);
    setFlagProcess(false);
  };

  const handleShowFirst = (orderId, statusId) => {
    getOrderById(orderId)
      .then((resp) => setTemp(resp.data))
      .catch((error) => console.log(error));

    getOrderDetailByOrderId(orderId)
      .then((resp) => setAttribute(resp.data))
      .catch((error) => console.log(error));

    setShowFirst(true);
    setObj({
      orderId: orderId,
      statusId: statusId,
    });
  };

  const handleCloseSecond = () => {
    setShowSecond(false);
    setShipment(null);
    setCode(null);
    setShipDate(null);
  };
  const handleShowSecond = (orderId, statusId) => {
    setShowSecond(true);
    setObj({
      orderId: orderId,
      statusId: statusId,
    });
  };

  const [flagSuccess, setFlagSuccess] = useState(false);

  const handleCloseThird = () => {
    setShowThird(false);
    setFlagSuccess(false);
  };
  const handleShowThird = (orderId, statusId) => {
    getOrderById(orderId)
      .then((resp) => setTemp(resp.data))
      .catch((error) => console.log(error));
    setShowThird(true);
    setObj({
      orderId: orderId,
      statusId: statusId,
    });
  };

  const handleCloseFouth = () => {
    setShowFouth(false);
    setReason(null);
    setDescription(null);
  };
  const handleShowFouth = (orderId, statusId) => {
    setShowFouth(true);
    setObj({
      orderId: orderId,
      statusId: statusId,
    });
  };
  const [obj, setObj] = useState({});
  const [temp, setTemp] = useState();
  const [attribute, setAttribute] = useState([]);

  useEffect(() => {
    onLoad();
  }, [id, status]);

  const onLoad = () => {
    getOrderById(id)
      .then((res) => {
        setOrders(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  const updateStatusHandlerFirst = (orderId, statusId) => {
    handleShowFirst(orderId, statusId);
  };

  const updateStatusHandlerSecond = (orderId, statusId) => {
    handleShowSecond(orderId, statusId);
  };

  const updateStatusHandlerThird = (orderId, statusId) => {
    handleShowThird(orderId, statusId);
  };

  const updateStatusHandlerFouth = (orderId, statusId) => {
    handleShowFouth(orderId, statusId);
  };

  const confirmUpdateProcess = () => {
    const data = {
      id: obj.orderId,
      status: obj.statusId,
      shipment: shipment,
      code: code,
      description: `${reason} - ${description}`,
      shipDate: shipDate,
    };

    updateProcess(data)
      .then(() => {
        getOrderById(id)
          .then((res) => {
            setOrders(res.data);
          })
          .catch((error) => console.log(error));
        toast.success("Cập nhật thành công.");
      })
      .catch((error) => toast.error(error.response.data.Errors));
    setFlagProcess(false);
    setShowFirst(false);
    setStatus(2);
  };

  const confirmUpdateShip = () => {
    const data = {
      id: obj.orderId,
      status: obj.statusId,
      shipment: shipment,
      code: code,
      description: `${reason} - ${description}`,
      shipDate: shipDate,
    };

    updateShip(data)
      .then(() => {
        getOrderById(id)
          .then((res) => {
            setOrders(res.data);
          })
          .catch((error) => console.log(error));
        toast.success("Cập nhật thành công.");
      })
      .catch((error) => toast.error(error.response.data.Errors));
    setShipment(null);
    setCode(null);
    setShipDate(null);
    setShowSecond(false);
    setStatus(3);
  };

  const confirmUpdateSuccess = () => {
    const data = {
      id: obj.orderId,
      status: obj.statusId,
      shipment: shipment,
      code: code,
      description: `${reason} - ${description}`,
      shipDate: shipDate,
    };

    if (orders.total >= 1000000) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 10000);
    }
    updateSuccess(data)
      .then(() => {
        getOrderById(id)
          .then((res) => {
            setOrders(res.data);
          })
          .catch((error) => console.log(error));
        toast.success("Cập nhật thành công.");
      })
      .catch((error) => toast.error(error.response.data.Errors));
    setFlagSuccess(null);
    setShowThird(false);
    setStatus(4);
  };

  const confirmUpdateCancel = () => {
    const data = {
      id: obj.orderId,
      status: obj.statusId,
      shipment: shipment,
      code: code,
      description: `${reason} - ${description}`,
      shipDate: shipDate,
    };

    updateCancel(data)
      .then(() => {
        getOrderById(id)
          .then((res) => {
            setOrders(res.data);
          })
          .catch((error) => console.log(error));
        toast.success("Cập nhật thành công.");
      })
      .catch((error) => toast.error(error.response.data.Errors));

    setReason(null);
    setDescription(null);
    setShowFouth(false);
    setStatus(5);
  };

  const flagProcessHandler = (e) => {
    const { checked } = e.target;
    setFlagProcess(checked);
  };

  const flagSuccessHandler = (e) => {
    const { checked } = e.target;
    setFlagSuccess(checked);
  };
  return (
    <div className="col-12">
      <div className="card">
        <div className="card__header">
          <h3>Đơn hàng</h3>
        </div>
        {loading && (
          <div className="text-center">
            <Spinner></Spinner>
          </div>
        )}
        <div className="row"></div>
        <div className="card__body">
          {orders && (
            <div>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Mã đơn hàng</th>
                      <th scope="col">Ngày mua</th>
                      <th scope="col">Thanh toán</th>
                      <th scope="col">Tổng tiền</th>
                      <th scope="col">
                        <Badge
                          type={orderStatus["Chờ xác nhận"]}
                          content={"Chờ xác nhận"}
                        />
                      </th>
                      <th scope="col">
                        <Badge
                          type={orderStatus["Đang xử lí"]}
                          content={"Đang xử lí"}
                        />
                      </th>
                      <th scope="col">
                        <Badge
                          type={orderStatus["Đang vận chuyển"]}
                          content={"Đang vận chuyển"}
                        />
                      </th>
                      <th scope="col">
                        <Badge
                          type={orderStatus["Đã giao"]}
                          content={"Đã giao"}
                        />
                      </th>
                      <th scope="col">
                        <Badge
                          type={orderStatus["Đã hủy"]}
                          content={"Đã hủy"}
                        />
                      </th>
                      <th scope="col">#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders && (
                      <tr>
                        <th scope="row">
                          <NavLink to={`/detail-order/${orders.id}`} exact>
                            #OD{orders.id}
                          </NavLink>
                        </th>
                        <th>{orders.createDate}</th>
                        <th>
                          <Badge
                            type={pendingStatus[orders.isPending]}
                            content={
                              orders.isPending
                                ? "Đã thanh toán"
                                : "Chưa thanh toán"
                            }
                          />
                        </th>
                        <th> {orders.total} ₫</th>
                        <th>
                          <div className="form-check mb-4">
                            <input
                              className="form-check-input"
                              type="radio"
                              name={orders}
                              checked={
                                orders.orderStatus &&
                                orders.orderStatus.id === 1
                              }
                              value="1"
                            />
                          </div>
                        </th>
                        <th>
                          <div className="form-check mb-4">
                            <input
                              className="form-check-input"
                              type="radio"
                              name={orders}
                              checked={
                                orders.orderStatus &&
                                orders.orderStatus.id === 2
                              }
                              value="2"
                              onChange={(e) =>
                                updateStatusHandlerFirst(
                                  orders.id,
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </th>
                        <th>
                          <div className="form-check mb-4">
                            <input
                              className="form-check-input"
                              type="radio"
                              name={orders}
                              checked={
                                orders.orderStatus &&
                                orders.orderStatus.id === 3
                              }
                              value="3"
                              onChange={(e) =>
                                updateStatusHandlerSecond(
                                  orders.id,
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </th>
                        <th>
                          <div className="form-check mb-4">
                            <input
                              className="form-check-input"
                              type="radio"
                              name={orders}
                              checked={
                                orders.orderStatus &&
                                orders.orderStatus.id === 4
                              }
                              value="4"
                              onChange={(e) =>
                                updateStatusHandlerThird(
                                  orders.id,
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </th>
                        <th>
                          <div className="form-check mb-4">
                            <input
                              className="form-check-input"
                              type="radio"
                              name={orders}
                              checked={
                                orders.orderStatus &&
                                orders.orderStatus.id === 5
                              }
                              value="5"
                              onChange={(e) =>
                                updateStatusHandlerFouth(
                                  orders.id,
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </th>
                        <th>
                          {orders.orderStatus &&
                          orders.orderStatus.id !== 4 &&
                          orders.orderStatus &&
                          orders.orderStatus.id !== 3 &&
                          orders.orderStatus &&
                          orders.orderStatus.id !== 5 ? (
                            <NavLink to={`/order-detail/${orders.id}`} exact>
                              <i
                                className="fa fa-pencil-square-o"
                                aria-hidden="true"
                              ></i>
                            </NavLink>
                          ) : (
                            ""
                          )}
                        </th>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal show={showFirst} onHide={handleCloseFirst}>
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: "center" }}>
            Xác nhận cập nhật?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="success">
            <Alert.Heading>
              Gọi điện cho khách hàng xác nhận những thông tin
            </Alert.Heading>
            <hr />
            <p className="font-weight-bold">
              Tên khách hàng: {temp && temp.fullname}
            </p>
            <p className="font-weight-bold">
              Số điện thoại: {temp && temp.phone}
            </p>
            <p className="font-weight-bold">
              Địa chỉ nhận hàng: {temp && temp.address}
            </p>
            <p className="font-weight-bold">Sản phẩm mua:</p>
            {attribute &&
              attribute.map((item, index) => (
                <p key={index}>
                  {item.attribute.name} - Size {item.attribute.size} - Số lượng{" "}
                  {item.quantity}
                </p>
              ))}
          </Alert>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Đã xác nhận đơn hàng."
              defaultChecked={flagProcess}
              onChange={(e) => flagProcessHandler(e)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            disabled={!flagProcess}
            onClick={confirmUpdateProcess}
          >
            Xác nhận
          </Button>
          <Button variant="primary" onClick={handleCloseFirst}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSecond} onHide={handleCloseSecond}>
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: "center" }}>
            Xác nhận cập nhật?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="success">
            <Alert.Heading>Cập nhật thông tin vận đơn</Alert.Heading>
            <hr />
            <Form.Label style={{ marginRight: 30, marginBottom: 10 }}>
              Hãng vận chuyển
            </Form.Label>
            <Form.Select
              style={{ height: 40, width: 300, marginBottom: 20 }}
              onChange={(e) => shipmentHandler(e.target.value)}
            >
              <option value={null}></option>
              <option value="ViettelPost">ViettelPost</option>
              <option value="J&T">J&T</option>
              <option value="Gojek">Gojek</option>
              <option value="AhaMove">AhaMove</option>
            </Form.Select>
            <Form>
              <Form.Label style={{ marginRight: 30, marginBottom: 10 }}>
                Mã vận đơn
              </Form.Label>
              <Form.Control
                style={{ height: 40, width: 300, marginBottom: 20 }}
                type="text"
                onChange={(e) => codeHandler(e.target.value)}
              />
            </Form>
            <Form>
              <Form.Label style={{ marginRight: 30, marginBottom: 10 }}>
                Ngày nhận dự kiến
              </Form.Label>
              <Form.Control
                style={{ height: 40, width: 300 }}
                type="date"
                onChange={(e) => shipDateHandler(e.target.value)}
              />
            </Form>
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={confirmUpdateShip}
            disabled={!shipment || !code || !shipDate}
          >
            Xác nhận
          </Button>
          <Button variant="primary" onClick={handleCloseSecond}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showThird} onHide={handleCloseThird}>
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: "center" }}>
            Xác nhận cập nhật?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="success">
            <Alert.Heading>Tiền đã về tay?</Alert.Heading>
            <hr />
            <p className="font-weight-bold">
              Tổng tiền đơn hàng: {temp && temp.total.toLocaleString()} đ
            </p>
          </Alert>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Xác nhận đã nhận tiền."
              defaultChecked={flagProcess}
              onChange={(e) => flagSuccessHandler(e)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            disabled={!flagSuccess}
            onClick={confirmUpdateSuccess}
          >
            Xác nhận
          </Button>
          <Button variant="primary" onClick={handleCloseThird}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showFouth} onHide={handleCloseFouth}>
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: "center" }}>
            Xác nhận cập nhật?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="danger">
            <Alert.Heading>Hủy đơn hàng</Alert.Heading>
            <hr />
            <Form.Label style={{ marginRight: 30, marginBottom: 10 }}>
              Lí do hủy đơn
            </Form.Label>
            <Form.Select
              style={{ height: 40, width: 420, marginBottom: 20 }}
              onChange={(e) => reasonHandler(e.target.value)}
            >
              <option value={null}></option>
              <option value="Đặt trùng">Đặt trùng</option>
              <option value="Thêm bớt sản phẩm">Thêm bớt sản phẩm</option>
              <option value="Gojek">Không còn nhu cầu</option>
              <option value="AhaMove">Lí do khác</option>
            </Form.Select>
            <Form>
              <Form.Label style={{ marginRight: 30, marginBottom: 10 }}>
                Mô tả
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => descriptionHandler(e.target.value)}
              />
            </Form>
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={confirmUpdateCancel}
            disabled={!reason || !description}
          >
            Xác nhận
          </Button>
          <Button variant="primary" onClick={handleCloseFouth}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SearchOrder;
