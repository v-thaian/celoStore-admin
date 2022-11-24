import Instance from '../axios/Instance';

export const getSaleDetail = (id) =>{
    const url = `/api/admin/sale/detail/${id}`;
    return Instance.get(url);
}
export const getSale = (page, size) =>{
    const url = `/api/admin/sale/get-all?page=${page}&size=${size}`;
    return Instance.get(url);
}

export const createSale = (data) =>{
    const url = `/api/admin/sale/create`;
    return Instance.post(url, data);
}

export const updateSale = (data) =>{
    const url = `/api/admin/sale/update`;
    return Instance.post(url, data);
}
