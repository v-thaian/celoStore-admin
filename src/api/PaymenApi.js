import Instance from '../axios/Instance'

export const getPaypalPayment = (data) =>{
    const url = `/api/site/payment`;
    return Instance.post(url, data);
}