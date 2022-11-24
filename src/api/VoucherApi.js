import Instance from '../axios/Instance'

export const getVoucherByCode = (code) =>{
    const url = `/api/site/voucher/get-by-code?code=${code}`;
    return Instance.get(url);
}

export const getVoucherDetail = (id) =>{
    const url = `/api/site/voucher/detail/${id}`;
    return Instance.get(url);
}
export const getVouchers = (page, size) =>{
    const url = `/api/admin/voucher/gel-all?page=${page}&size=${size}`;
    return Instance.get(url);
}

export const createVoucher = (data) =>{
    const url = `/api/admin/voucher/create`;
    return Instance.post(url, data);
}

export const updateVoucher = (data) =>{
    const url = `/api/admin/voucher/update`;
    return Instance.post(url, data);
}

