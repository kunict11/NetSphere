import { Box, Button, Textarea } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { AjaxResponse } from "rxjs/ajax";
import { Post } from "src/models/post";
import UserService from "src/services/user.service";

const PostTextarea = (props: { triggerUpdate: (x: boolean) => void }) => {
  const [postText, setPostText] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(e.target.value);
  };
  const makeNewPost = () => {
    UserService.createPost(postText).subscribe((res: AjaxResponse<Post>) => {
      console.log(res);
      if (res.status === 200) {
        props.triggerUpdate(true);
        setPostText("");
      }
    });
  };
  return (
    <Box marginLeft="-6rem">
      <Textarea
        onChange={handleInputChange}
        placeholder="..."
        value={postText}
        resize={"none"}
        size="lg"
        w="2xl"
      />
      <Button
        type="button"
        colorScheme="cyan"
        onClick={() => makeNewPost()}
        mt=".5rem"
      >
        Post
      </Button>
    </Box>
  );
};

export default PostTextarea;
