import { Menu, MenuButton, MenuList, MenuItem, Image, Button, Box } from '@chakra-ui/react';
import { IoPersonCircleOutline, IoLogOutOutline } from 'react-icons/io5';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import AuthenticationService from '../services/authentication.service';

function Navbar() {
    const [redirectToLogin, setRedirectToLogin] = useState<boolean>(false);

    const logout = () => {
        AuthenticationService.logout();
        setRedirectToLogin(true);
    };

    if(redirectToLogin) {
        return <Redirect to={ '/login' }/>
    }
    return (
        <Box mt='0' h='4rem' backgroundColor='#2D3748' w='100%'>
            <nav style={{ padding: '10px 20px 10px 20px' }}>
                <Menu>
                    <MenuButton as={Button} float='right' backgroundColor='#2D3748'>
                        <Image
                            boxSize="2rem"
                            borderRadius="full"
                            src='/logo192.png'
                            alt='user'
                            mr="12px"
                            display='inline'
                        />
                        user
                    </MenuButton>
                    <MenuList>
                        <MenuItem icon={ <IoPersonCircleOutline size='25px' color='#48BB78' /> } minH="48px">
                            <span>Profile</span>
                        </MenuItem>
                        <MenuItem icon={ <IoLogOutOutline size='25px' color='#48BB78' /> } minH="40px" onClick={() => { logout() }}>
                            <span>Log Out</span>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </nav>
        </Box>
    )
}

export default Navbar;
