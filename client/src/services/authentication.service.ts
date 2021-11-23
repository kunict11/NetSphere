import { ajax } from 'rxjs/ajax';
import { User } from 'src/models/user';
import { authUrl } from '../configuration/environment';

class AuthenticationService {
    // private user: User | null = null;
    
    public setUserData = (user: User) => {
        localStorage.setItem('user', JSON.stringify(user));
    };
    
    public getCurrentUser = () => {
        const userData = localStorage.getItem('user');

        if(userData !== null)
            return JSON.parse(userData) as User;
        return null;
    };
    
    public getToken = () => {
        const user: User | null= this.getCurrentUser()
    
        if(!user)
            return null;
        return user.token;
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