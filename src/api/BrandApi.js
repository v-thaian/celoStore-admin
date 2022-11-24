import Instance from '../axios/Instance';

export const getBrandDetail = (id) =>{
    const url = `/api/admin/brand/detail/${id}`;
    return Instance.get(url);
}
export const getBrands = (page, size) =>{
    const url = `/api/admin/brand/find-all?page=${page}&size=${size}`;
    return Instance.get(url);
}

export const createBrand = (data) =>{
    const url = `/api/admin/brand/create`;
    return Instance.post(url, data);
}

export const updateBrand = (data) =>{
    const url = `/api/admin/brand/update`;
    return Instance.post(url, data);
}

