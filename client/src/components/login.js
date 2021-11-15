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
import { Link, useLocation, Redirect } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);
    const authService = require('../services/authentication.service');
    const location = useLocation();

    const login = (e) => {
        e.preventDefault();

        authService.login(username, password).subscribe(res => {
            if(res.status === 201 || res.status === 200) {
                authService.setUserData(res.response);
                console.log(res.response);
                setRedirectToReferrer(true);
            }
        });
    };

    if(redirectToReferrer) {
        console.log(location);
        return <Redirect to={ location.state?.from.pathname || '/' }/>
    }

    return (
        <Container>
            <Heading mt='2rem' as='h1' size='3xl'>Net Sphere </Heading>
            <Box mt='3rem' padding='1rem 2rem 2.5rem 2rem' border='solid 1px #51555E' borderRadius='11'>
                <form onSubmit={ login }>
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
                        <Box mt='6'>
                            <Button colorScheme='blue' mr='4' type='submit'>Log in</Button>
                            <Box display='inline' color='#687FB0'>Don't have an account? 
                                <Link to='/register' style={{color: '#00697D', textDecoration: 'underline'}}>
                                    Click here to sign up.
                                </Link> 
                            </Box>
                        </Box>
                    </FormControl>
                </form>
            </Box>
        </Container>
    );
}

export default Login;

