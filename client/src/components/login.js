import { useState } from 'react';
import { Input, Button, Form, FormControl, FormLabel, Container } from '@chakra-ui/react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const authService = require('../services/authentication.service');

    const login = (e) => {
        e.preventDefault();

        authService.login(username, password).subscribe(res => {
            if(res.status === 201 || res.status === 200) {
                authService.setUserData(res.response);
                console.log(res.response);
            }
        });
    };

    return (
        <Container>
            <form onSubmit={ login }>
                <FormControl isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input 
                        type='text' 
                        placeholder='Username' 
                        value={ username } 
                        onChange={ (e) => { setUsername(e.target.value) } }/>
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input 
                        type='password' 
                        placeholder='Password'
                        value={ password }
                        onChange={ (e) => { setPassword(e.target.value) } }/>
                    <Button type='submit'>Log in</Button>
                    <span>Don't have an account? <a>Click here to sign up.</a> </span>
                </FormControl>
            </form>
        </Container>
    );
}

export default Login;

