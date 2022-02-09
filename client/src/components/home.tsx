import {
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Subscription } from "rxjs";
import { AjaxResponse } from "rxjs/ajax";
import { Post } from "src/models/post";
import UserService from "src/services/user.service";
import Navbar from "./navbar";
import PostList from "./post.list";
import PostTextarea from "./post.textarea";

function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [likedPosts, setLikedPosts] = useState<any[]>([]);
  let postSub: Subscription = new Subscription();
  let likedPostsSub: Subscription = new Subscription();
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    postSub = UserService.getAllPosts().subscribe(
      (res: AjaxResponse<Post[]>) => {
        setPosts(res.response);
      }
    );
    likedPostsSub = UserService.getAllLikedPosts().subscribe(
      (res: AjaxResponse<Post[]>) => {
        setLikedPosts(res.response);
      }
    );
    return () => {
      postSub.unsubscribe();
      likedPostsSub.unsubscribe();
    };
  }, [counter]);

  const triggerUpdate = () => {
    setCounter(counter + 1);
  };

  return (
    <div>
      <Navbar />
      <Container mt="2rem">
        <PostTextarea triggerUpdate={triggerUpdate} />
        <Tabs size="lg" variant="enclosed" w="2xl" ml="-6rem" mt="2rem">
          <TabList>
            <Tab>All Posts</Tab>
            <Tab>Liked Posts</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <PostList
                posts={posts}
                likedPosts={likedPosts}
                triggerUpdate={triggerUpdate}
              />
            </TabPanel>
            <TabPanel>
              <PostList
                posts={likedPosts}
                likedPosts={likedPosts}
                triggerUpdate={triggerUpdate}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </div>
  );
}

export default Home;
