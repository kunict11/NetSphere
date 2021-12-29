import { Box, Flex, Heading, Image, Text, Button } from "@chakra-ui/react";
import { Post } from "src/models/post";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import UserService from "src/services/user.service";
import { HttpResponse } from "src/helpers/http.response";
import { AjaxResponse } from "rxjs/ajax";
import { useEffect, useState } from "react";
import AuthenticationService from "src/services/authentication.service";
import Alert from "./alert";

function PostComponent(props: {
  post: Post;
  isLiked?: boolean;
  triggerUpdate: () => void;
}) {
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<string>("");
  const likePost = (post: Post) => {
    if (
      post.user.username === AuthenticationService.getCurrentUser()?.username
    ) {
      console.log("true");
      openAlert();
      setAlertMsg("Please don't like your own posts :)");
      return;
    }

    UserService.likePost(post).subscribe((res: AjaxResponse<HttpResponse>) => {
      console.log(res);
      props.triggerUpdate();
    });
  };

  const openAlert = () => {
    setAlertOpen(true);
  };
  const closeAlert = () => {
    setAlertOpen(false);
  };

  return (
    <Box padding="1rem" border="1px solid #3F444E">
      {alertOpen ? (
        <Alert message={alertMsg} open={alertOpen} onModalClose={closeAlert} />
      ) : (
        ""
      )}
      <Flex alignItems="flex-start">
        <Image
          boxSize="2rem"
          borderRadius="full"
          src="/logo192.png"
          alt="user"
          mr="12px"
          display="inline"
        />
        <Heading fontSize="14pt">
          <a href={`/user/${props.post.user.username}`}>
            {props.post.user.username}
          </a>
        </Heading>
        <Text ml="1.5rem" fontSize="12pt" color="gray.600">
          {new Date(props.post.timestamp).toLocaleDateString("en-UK")}
        </Text>
        <Text mt="10" display="block" ml="-9.5rem">
          {props.post.text}
        </Text>
      </Flex>
      <Flex alignItems="flex-start">
        <button type="button" onClick={() => likePost(props.post)}>
          {props.isLiked ? (
            <BsSuitHeartFill style={heartIconStyle} />
          ) : (
            <BsSuitHeart style={heartIconStyle} />
          )}
        </button>
        <Text>{props.post.likesCount}</Text>
      </Flex>
    </Box>
  );
}

const heartIconStyle = {
  color: "#C53030",
  marginTop: "1rem",
  fontSize: "16pt",
};

export default PostComponent;
