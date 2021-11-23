import { ajax } from 'rxjs/ajax';
import { Post } from 'src/models/post';
import { User } from 'src/models/user';
import { postUrl, userUrl } from '../configuration/environment'
import AuthenticationService from './authentication.service';

class UserService {
    public getUserByUsername = (username: string) => {
        return ajax.get<User>(`${userUrl}/${username}`);
    };

    public getAllPosts = () => {
        const token = AuthenticationService.getToken();
        if(token != null)
            return ajax.get<Post[]>(`${postUrl}`, { 'Authorization': `bearer ${token}` });
        return ajax.get<Post[]>(`${postUrl}`);
    }
}

export default new UserService();