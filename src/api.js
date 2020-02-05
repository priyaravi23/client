const axios = require('axios');
const BASE_URL = 'http://localhost:8000';

export const listUsers = () => {
    return axios({
        url: `${BASE_URL}/users`,
        method: 'get',
    });
};
export const getUser = id => {
    return axios({
        url: `${BASE_URL}/users/${id}`,
        method: 'get',
    });
};
export const createUser = user => {
    console.log('making a post request ... ');
    return axios({
        url: `${BASE_URL}/users`,
        method: 'post',
        data: user,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
export const updateUser = user => {
    return axios({
        url: `${BASE_URL}/users/${user.id}`,
        method: 'put',
        data: user
    });
};
export const deleteUser = id => {
    return axios({
        url: `${BASE_URL}/users/${id}`,
        method: 'delete',
    });
};

