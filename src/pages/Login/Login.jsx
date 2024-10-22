import { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';

import { checkUsername } from '../../data/username';

import './Login.css'

function Login( {setToken, setRole} ) {

    const userRef = useRef()
    const passRef = useRef()

    return ( 
        <div className='login-container'
            style={{textAlign:'center', width: '200px', margin: '2rem auto'}}>
                
            <Form.Label htmlFor="username">Username</Form.Label>
                <Form.Control
                    type='text'
                    id="username"
                    placeholder='username'
                    style={{textAlign: 'center'}}
                    ref={userRef}
                />
            <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                    type="password"
                    id="password"
                    placeholder='pass'
                    style={{textAlign: 'center'}}
                    ref={passRef}
                />
                <button className='btn btn-success mt-3'  
                    onClick={() => {
                        const user = userRef.current.value.trim()
                        const pass = passRef.current.value.trim()
                        userRef.current.value = ''
                        passRef.current.value = ''
                        const userInfo = checkUsername(user, pass)
                            if (userInfo === null) {
                                alert('Wrong username or password')
                                userRef.current.setFocus()
                            } else {
                                setToken(userInfo.token)
                                setRole(userInfo.role)
                            }
                    }}>
                    Login
                </button>
        </div>
     );
}

export default Login;