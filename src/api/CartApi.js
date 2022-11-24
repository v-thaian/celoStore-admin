import Instance from '../axios/Instance'

export const getCartItemByAccountId = (id) =>{
    const url = `/api/site/cart/get-by-account-id/${id}`;
    return Instance.get(url);
}

export const modifyCartItem = (data) =>{
    const url = `/api/site/cart/modify`;
    return Instance.post(url, data);
}

export const removeCartItem = (data) =>{
    const url = `/api/site/cart/remove`;
    return Instance.post(url, data);
}

export const reloadCartItem = (id) =>{
    const url = `/api/site/cart/reload?id=${id}`;
    return Instance.get(url);
}

export const isEnoughCartItem = (id, quantity) =>{
    const url = `/api/site/cart/is-enough?id=${id}&quantity=${quantity}`;
    return Instance.get(url);
}