import { ChangeEvent, SyntheticEvent, useState } from 'react';
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
import { AjaxResponse } from 'rxjs/ajax';
import { User } from 'src/models/user';
import AuthenticationService from '../services/authentication.service';
import { LocationState } from 'src/helpers/locationState';

function Login() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [redirectToReferrer, setRedirectToReferrer] = useState<boolean>(false);
    const location = useLocation<LocationState>();

    const login = (e: SyntheticEvent) => {
        e.preventDefault();

        AuthenticationService.login(username, password).subscribe((res: AjaxResponse<User>) => {
            if(res.status === 201 || res.status === 200) {
                AuthenticationService.setUserData(res.response);
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
                <form onSubmit={ (e: SyntheticEvent) => { login(e); } }>
                    <FormControl isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input 
                            type='text' 
                            placeholder='Username' 
                            value={ username } 
                            onChange={ (e: ChangeEvent<HTMLInputElement>) => { setUsername(e.target.value) } }/>
                    </FormControl>

                    <FormControl mt='4' isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input 
                            type='password' 
                            placeholder='Password'
                            value={ password }
                            onChange={ (e: ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) } }/>
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

