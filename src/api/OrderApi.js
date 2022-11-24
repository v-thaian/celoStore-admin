import Instance from '../axios/Instance'

export const createOrder = (data) =>{
    const url = `/api/site/order/create`;
    return Instance.post(url, data);
}
export const updateOrder = (data) =>{
    const url = `/api/site/order/update`;
    return Instance.post(url, data);
}
export const cancelOrder = (id) =>{
    const url = `/api/site/order/cancel?id=${id}`;
    return Instance.get(url);
}
export const getAllOrder = (id, status) =>{
    const url = `/api/site/order/get-orders?id=${id}&status=${status}`;
    return Instance.get(url);
}

export const getOrderByOrderStatusAndYearAndMonth = (status, year, month, page, size) =>{
    const url = `/api/admin/order/page-orders-by-year-and-month?id=${status}&year=${year}&month=${month}&page=${page}&size=${size}`;
    return Instance.get(url);
}

export const getOrderByOrderStatusBetweenDate = (status, from, to, page, size) =>{
    const url = `/api/admin/order/page-orders-between-date?id=${status}&from=${from}&to=${to}&page=${page}&size=${size}`;
    return Instance.get(url);
}

export const getAllOrderAndPagination = (status, page, size) =>{
    const url = `/api/admin/order/get-orders-and-pagination?page=${page}&size=${size}&status=${status}`;
    return Instance.get(url);
}

export const getOrderById = (id) =>{
    const url = `/api/site/order/get-order-by-id?id=${id}`;
    return Instance.get(url);
}

export const getOrderDetailByOrderId = (id) =>{
    const url = `/api/site/order/get-order-detail-by-id?id=${id}`;
    return Instance.get(url);
}

export const updateOrderWithStatus = (orderId, statusId) =>{
    const url = `/api/admin/order/update-order-with-status?id=${orderId}&status=${statusId}`;
    return Instance.get(url);
}

export const reportByProduct = (page, size) =>{
    const url = `/api/admin/order/page-report-product?page=${page}&size=${size}`;
    return Instance.get(url);
}

export const getOrderByProduct = (id, page, size) =>{
    const url = `/api/admin/order/page-orders-by-product?id=${id}&page=${page}&size=${size}`;
    return Instance.get(url);
}

export const reportAmountYear = () =>{
    const url = `/api/admin/order/amount-year`;
    return Instance.get(url);
}

export const reportAmountMonth = (year) =>{
    const url = `/api/admin/order/amount-month?year=${year}`;
    return Instance.get(url);
}

export const countOrder = () =>{
    const url = `/api/admin/order/count-order`;
    return Instance.get(url);
}

export const countOrderByName = () =>{
    const url = `/api/admin/order/count-order-by-name`;
    return Instance.get(url);
}

export const updateProcess = (data) =>{
    const url = `/api/site/order/process-order`;
    return Instance.post(url, data);
}

export const updateShip = (data) =>{
    const url = `/api/site/order/ship-order`;
    return Instance.post(url, data);
}

export const updateSuccess = (data) =>{
    const url = `/api/site/order/success-order`;
    return Instance.post(url, data);
}

export const updateCancel = (data) =>{
    const url = `/api/site/order/cancel-order`;
    return Instance.post(url, data);
}