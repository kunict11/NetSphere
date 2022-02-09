import { Post } from "./post";

export class User {
    constructor(
        private _id: number,
        private _username: string,
        private _token: string,
        private _posts: Post[],
        private _connections: User[]
    ){  }
    
    public get id()         : number { return this._id }
    public get username()   : string { return this._username }
    public get token()      : string { return this._token; }
    public get posts()      : Post[] { return this._posts }
    public get connections(): User[] { return this._connections }

    public set connections(users: User[]) { this._connections = users; }
    public set posts(posts: Post[]) { this._posts = posts }
}