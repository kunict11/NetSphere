import { Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { User } from 'src/models/user';
import { authUrl } from '../configuration/environment';

class AuthenticationService {
    private user: User | null = null;
    
    public setUserData = (user: User) => {
        localStorage.setItem('user', user.token);
        this.user = new User(user.id, user.username, user.token, user.posts, user.connections);
    };
    
    public getCurrentUser = () => {
        return this.user;
    };
    
    public getToken = () => {
        const token: string | null= localStorage.getItem('user');
    
        if(!token)
            return null;
        return token;
    };
    
    public register = (username: string, password: string) => {    
        return ajax.post<User>(`${authUrl}/register`, { username: username, password: password });
    };
    
    public login = (username: string, password: string) => {
        return ajax.post<User>(`${authUrl}/login`, { username: username, password: password });
    }
    
    public logout = () => {
        localStorage.removeItem('user');
    }
    
    public userLoggedIn = () => {
        return localStorage.getItem('user') !== null;
    }
}

export default new AuthenticationService();