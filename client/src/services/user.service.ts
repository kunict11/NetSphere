import { ajax } from "rxjs/ajax";
import { HttpResponse } from "src/helpers/http.response";
import { Post } from "src/models/post";
import { User } from "src/models/user";
import { postUrl, userUrl } from "../configuration/environment";
import AuthenticationService from "./authentication.service";

class UserService {
  public getUserByUsername = (username: string) => {
    return ajax.get<User>(`${userUrl}/${username}`);
  };

  public getAllPosts = () => {
    const token = AuthenticationService.getToken();
    if (token != null)
      return ajax.get<Post[]>(`${postUrl}`, {
        Authorization: `bearer ${token}`,
      });
    return ajax.get<Post[]>(`${postUrl}`);
  };

  public connectWithUser = (user: User) => {
    const token = AuthenticationService.getToken();
    if (token != null)
      return ajax.patch<HttpResponse>(
        `${userUrl}/connect`,
        { username: user.username },
        { Authorization: `bearer ${token}` }
      );
    return ajax.patch<HttpResponse>(`${userUrl}/connect`, {
      username: user.username,
    });
  };

  public createPost = (text: string) => {
    const token = AuthenticationService.getToken()!;

    return ajax.post<Post>(
      postUrl,
      { text: text },
      { Authorization: `bearer ${token}` }
    );
  };

  public getAllLikedPosts = () => {
    const token = AuthenticationService.getToken()!;
    return ajax.get<Post[]>(`${postUrl}/liked`, {
      Authorization: `bearer ${token}`,
    });
  };

  public likePost = (post: Post) => {
    const token = AuthenticationService.getToken()!;
    return ajax.patch<HttpResponse>(
      `${postUrl}/like`,
      { id: post.id },
      { Authorization: `bearer ${token}` }
    );
  };
}

export default new UserService();
