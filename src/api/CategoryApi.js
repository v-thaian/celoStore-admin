import Instance from '../axios/Instance';

export const getCategoryDetail = (id) =>{
    const url = `/api/admin/category/get-category-by-id/${id}`;
    return Instance.get(url);
}
export const getCategory = (page, size) =>{
    const url = `/api/admin/category/find-all?page=${page}&size=${size}`;
    return Instance.get(url);
}

export const createCategory = (data) =>{
    const url = `/api/admin/category/create`;
    return Instance.post(url, data);
}

export const updateCategory = (data) =>{
    const url = `/api/admin/category/update`;
    return Instance.post(url, data);
}
