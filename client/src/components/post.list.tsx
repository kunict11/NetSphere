import { Stack } from "@chakra-ui/layout";
import { useEffect } from "react";
import { Post } from "src/models/post";
import PostComponent from "./post.component";

function PostList(props: {
  posts: Post[];
  likedPosts?: Post[];
  triggerUpdate: () => void;
}) {
  const isLiked = (id: number) => {
    return props.likedPosts?.some((post: Post) => post.id === id);
  };
  const postList = props.posts.map((p: Post) => (
    <PostComponent
      key={p.id}
      post={p}
      isLiked={isLiked(p.id)}
      triggerUpdate={props.triggerUpdate}
    />
  ));
  return <Stack spacing="8">{postList}</Stack>;
}

export default PostList;
