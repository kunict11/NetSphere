import { Stack } from "@chakra-ui/layout";
import { useEffect } from "react";
import { Post } from "src/models/post";
import PostComponent from "./post.component";

function PostList(props: { posts: Post[] }) {
  const postList = props.posts.map((p: Post) => (
    <PostComponent key={p.id} post={p} />
  ));
  return <Stack spacing="8">{postList}</Stack>;
}

export default PostList;
