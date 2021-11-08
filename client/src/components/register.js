import { useState } from 'react';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const authService = require('../services/authentication.service');

    const register = (e) => {
        e.preventDefault();

        authService.register(username, password).subscribe(res => {
            if(res.status === 201 || res.status === 200) {
                authService.setUserData(res.response.user);
            }
        });
    };

    return (
        <div>
            <form onSubmit={ register }>
                <div>
                    <label>Username</label>
                    <input 
                        type='text' 
                        placeholder='Username' 
                        value={ username } 
                        onChange={ (e) => { setUsername(e.target.value) } }/>

                    <label>Password</label>
                    <input 
                        type='password' 
                        placeholder='Password'
                        value={ password }
                        onChange={ (e) => { setPassword(e.target.value) } }/>
                </div>
                <button type='submit'>Sign in</button>
            </form>
        </div>
    );
}

export default Register;

