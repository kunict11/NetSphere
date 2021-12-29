import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Heading,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  TabList,
} from "@chakra-ui/react";
import { User } from "../models/user";
import UserService from "../services/user.service";
import AuthenticationService from "../services/authentication.service";
import { Subscription } from "rxjs";
import { AjaxResponse } from "rxjs/ajax";
import Navbar from "./navbar";
import PostList from "./post.list";
import Alert from "./alert";
import { HttpResponse } from "src/helpers/http.response";

interface RouteParams {
  username: string;
}

function UserDetails() {
  const { username } = useParams<RouteParams>();
  const [user, setUser] = useState<User>();
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<string>("");

  let userSub: Subscription = new Subscription();
  let connectSub: Subscription = new Subscription();

  useEffect(() => {
    userSub = UserService.getUserByUsername(username).subscribe(
      (res: AjaxResponse<User>) => {
        console.log(res.response);
        setUser(res.response);
      }
    );

    return () => {
      userSub.unsubscribe();
      connectSub.unsubscribe();
    };
  }, []);

  const isConnectedWith = (): boolean => {
    return AuthenticationService.getCurrentUser()!.connections.some(
      (u: User) => u.username === user?.username
    );
  };

  const connectWithUser = () => {
    if (user !== undefined)
      connectSub = UserService.connectWithUser(user)?.subscribe(
        (res: AjaxResponse<HttpResponse>) => {
          console.log(res.response);
          setAlertMsg(res.response.message);
          openAlert();
          let currentUser: User = AuthenticationService.getCurrentUser()!;
          currentUser.connections.push(user);
          AuthenticationService.setUserData(currentUser);
        }
      );
  };

  const openAlert = () => {
    setAlertOpen(true);
  };
  const closeAlert = () => {
    setAlertOpen(false);
  };

  return (
    <div>
      <Navbar />
      <Container mt="2rem">
        <Flex direction="column">
          <Flex direction="row">
            <Image
              src="/logo192.png"
              boxSize="125px"
              border="solid 1px #2b6cb0"
              borderRadius="2xl"
            />
            <Heading fontSize="24pt" ml="3rem" mt="40px">
              {user?.username}
            </Heading>
          </Flex>
          <Flex mt="2rem" direction="row" alignSelf="center">
            {isConnectedWith() ||
            user?.username ===
              AuthenticationService.getCurrentUser()?.username ? (
              ""
            ) : (
              <Button
                type="button"
                onClick={() => connectWithUser()}
                ml="-6rem"
                mr="3rem"
                colorScheme="cyan"
              >
                Connect
              </Button>
            )}
            <Flex textAlign="center" direction="column">
              <Heading size="md">Connections</Heading>
              <Heading size="md">{user?.connections.length}</Heading>
            </Flex>
            <Flex textAlign="center" direction="column" ml="3rem">
              <Heading size="md">Posts</Heading>
              <Heading size="md">{user?.posts.length}</Heading>
            </Flex>
          </Flex>
          <Box textAlign="center" mt="2rem"></Box>
          <Tabs size="lg" variant="enclosed" w="2xl" ml="-6rem" mt="2rem">
            <TabList>
              <Tab>All Posts</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {user === undefined ? (
                  "Error fetching user"
                ) : isConnectedWith() ||
                  user?.username ===
                    AuthenticationService.getCurrentUser()?.username ? (
                  <PostList posts={user.posts} />
                ) : (
                  `Connect with ${user.username} to see their posts`
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Container>
      {alertOpen ? (
        <Alert message={alertMsg} open={alertOpen} onModalClose={closeAlert} />
      ) : (
        ""
      )}
    </div>
  );
}

export default UserDetails;
