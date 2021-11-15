import { useState } from 'react';
import { 
    Input,
    Button,
    FormControl, 
    FormLabel, 
    Container, 
    Box, 
    Heading 
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const authService = require('../services/authentication.service');

    const register = (e) => {
        e.preventDefault();

        authService.register(username, password).subscribe(res => {
            if(res.status === 201 || res.status === 200) {
                authService.setUserData(res.response);
            }
        });
    };

    return (
        <Container>
            <Heading mt='2rem' as='h1' size='3xl'>Register</Heading>
            <Box mt='3rem' padding='1rem 2rem 2.5rem 2rem' border='solid 1px #51555E' borderRadius='11'>
                <form onSubmit={ register }>
                    <FormControl isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input 
                            type='text' 
                            placeholder='Username' 
                            value={ username } 
                            onChange={ (e) => { setUsername(e.target.value) } }/>
                    </FormControl>

                    <FormControl mt='4' isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input 
                            type='password' 
                            placeholder='Password'
                            value={ password }
                            onChange={ (e) => { setPassword(e.target.value) } }/>
                    </FormControl>
                        <Box mt='6'>
                            <Button colorScheme='blue' mr='4' type='submit'>Sign Up</Button>
                            <Button colorScheme='blue' variant='outline' type='button'><Link to='/login'>Cancel</Link></Button>
                        </Box>
                </form>
            </Box>
        </Container>
    );
}

export default Register;

