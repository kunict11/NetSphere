import { Container, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Subscription } from 'rxjs';
import { AjaxResponse } from 'rxjs/ajax';
import { Post } from 'src/models/post';
import UserService from 'src/services/user.service';
import Navbar from './navbar';
import PostList from './post.list';

function Home() {
    const [posts, setPosts] = useState<any[]>([]);
    let postSub: Subscription = new Subscription();

    useEffect(() => {
        postSub = UserService.getAllPosts().subscribe((res: AjaxResponse<Post[]>) => {
            setPosts(res.response);
        });

        return () => {
            postSub.unsubscribe();
        }
    }, []);
    return (
        <div>
            <Navbar/>
            <Container mt='2rem'>
                <Tabs size='lg' variant='enclosed' w='2xl' ml='-6rem'>
                    <TabList>
                        <Tab>All Posts</Tab>
                        <Tab>Liked Posts</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <PostList posts={ posts }/>
                        </TabPanel>
                        <TabPanel>

                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Container>
        </div>
    )
}

export default Home
