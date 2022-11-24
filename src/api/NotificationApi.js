import Instance from '../axios/Instance';

export const loadNotification = () =>{
    const url = `/api/admin/load-notification`;
    return Instance.get(url);
}

export const readNotification = (id) =>{
    const url = `/api/admin/read-notification?id=${id}`;
    return Instance.get(url);
}

export const pushNotification = () =>{
    const url = `/api/admin/push-notification`;
    return Instance.get(url);
}