import { Box, Flex, Heading, Image, Text, Button } from "@chakra-ui/react"
import { Post } from "src/models/post";
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';

function PostComponent(props: { post: Post }) {
    return (
        <Box padding='1rem' border='1px solid #3F444E'>
            <Flex alignItems='flex-start'>
                <Image
                    boxSize="2rem"
                    borderRadius="full"
                    src='/logo192.png'
                    alt='user'
                    mr="12px"
                    display='inline'
                />
                <Heading fontSize='14pt'>{ props.post.user.username }</Heading>
                <Text ml='1.5rem' fontSize='12pt' color='gray.600'>{ new Date(props.post.timestamp).toLocaleDateString('en-UK') }</Text>
                <Text mt='10' display='block' ml='-9.5rem'>
                    { props.post.text }
                </Text>
            </Flex>
            <Flex alignItems='flex-start'>
                <button>
                { props.post.likedByUser 
                    ? <BsSuitHeartFill style={ heartIconStyle }/> 
                    : <BsSuitHeart style={ heartIconStyle }/> }
                </button>
            </Flex>
        </Box>
    )
}

const heartIconStyle = {
    color:'#C53030', 
    marginTop: '1rem', 
    fontSize: '16pt'
}

export default PostComponent;
