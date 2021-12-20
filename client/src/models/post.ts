import { PostComment } from "./postComment";
import { User } from "./user";

interface UserInfo {
    id: number,
    username: string
}

export class Post {
    constructor(
        private _id: number,
        private _text: string,
        private _timestamp: Date,
        private _comments: PostComment[],
        private _likesCount: number,
        private _user: UserInfo
    ){  }

    public get id()         : number        { return this._id }
    public get text()       : string        { return this._text }
    public get timestamp()  : Date          { return this._timestamp }
    public get comments()   : PostComment[] { return this._comments }
    public get likesCount() : number        { return this._likesCount}
    public get user()       : UserInfo      { return this._user }
}