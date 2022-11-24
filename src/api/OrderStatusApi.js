import Instance from '../axios/Instance'

export const getAllOrderStatus = () =>{
    const url = `/api/site/get-order-statuses`;
    return Instance.get(url);
}
