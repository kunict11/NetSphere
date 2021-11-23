import { PostComment } from "./postComment";

interface UserInfo {
    id: number,
    username: string
}

export class Post {
    constructor(
        private _id: number,
        private _text: string,
        private _timestamp: Date,
        private _likes: number,
        private _comments: PostComment[],
        private _likedByUser: boolean,
        private _user: UserInfo
    ){  }

    public get id()         : number        { return this._id }
    public get text()       : string        { return this._text }
    public get timestamp()  : Date          { return this._timestamp }
    public get likes()      : number        { return this._likes }
    public get comments()   : PostComment[] { return this._comments }
    public get likedByUser(): boolean       { return this._likedByUser }
    public get user()       : UserInfo      { return this._user }
}