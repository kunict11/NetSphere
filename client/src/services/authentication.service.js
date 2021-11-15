import { ajax } from 'rxjs/ajax';
import { authUrl } from '../configuration/environment';

export const setUserData = (user) => {
    localStorage.setItem('user', user);
};

export const getCurrentUser = () => {
    return localStorage.getItem('user');
};

export const getToken = () => {
    const token = localStorage.getItem('user').token;

    if(!token)
        return null;
    return token;
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
    return localStorage.getItem('user') !== null;
}
