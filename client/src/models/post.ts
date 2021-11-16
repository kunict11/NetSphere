import { PostComment } from "./postComment";

export class Post {
    constructor(
        private _id: number,
        private _text: string,
        private _timestamp: Date,
        private _likes: number,
        private _comments: PostComment[],
        private _likedByUser: boolean
    ){  }
}