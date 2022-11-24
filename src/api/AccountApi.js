import Instance from '../axios/Instance'

export const getAccountDetailByAccountId = (id) =>{
    const url = `api/admin/account/${id}`;
    return Instance.get(url);
}
export const getAccounts = (page, size) =>{
    const url = `/api/admin/account/find-all?page=${page}&size=${size}`;
    return Instance.get(url);
}
export const getAccountByRole = (page, size, role) =>{
    const url = `/api/admin/account/by-role?page=${page}&size=${size}&roleName=${role}`;
    return Instance.get(url);
}

export const getTotalPage = () =>{
    const url = `/api/admin/account/get-total-page`;
    return Instance.get(url);
}

export const createAccount = (data) =>{
    const url = `/api/admin/account/create`;
    return Instance.post(url, data);
}

export const updateAccount = (data) =>{
    const url = `/api/admin/account/update`;
    return Instance.post(url, data);
}
export const countAccount = () =>{
    const url = `/api/admin/account/count`;
    return Instance.get(url);
}
export const getMe = (token) =>{
    const url = `/api/site/me?token=${token}`;
    return Instance.get(url);
}
export const signIn = (data) =>{
    const url = '/api/site/login';
    return Instance.post(url, data);
}