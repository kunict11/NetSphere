import { ajax } from 'rxjs/ajax';
import { authUrl } from '../configuration/environment';

var currentUser = null;

export const setUserData = (user) => {
    localStorage.setItem('user', user.token);
    currentUser = user;
};

export const getCurrentUser = () => {
    return currentUser;
};

export const getToken = () => {
    const token = localStorage.getItem('user');

    if(!token)
        return null;
    return token;
};

export const setToken = (token) => {
    localStorage.setItem('user', token);
};

export const register = (username, password) => {    
    return ajax.post(`${authUrl}/register`, { username: username, password: password });
};

export const login = (username, password) => {
    return ajax.post(`${authUrl}/login`, { username: username, password: password });
}

export const logout = () => {
    localStorage.removeItem('user');
}

export const userLoggedIn = () => {
    console.log(localStorage.getItem('user') !== null);
    return localStorage.getItem('user') !== null;
}
