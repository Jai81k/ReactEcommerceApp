import React, {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import {useDispatch} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';

import {auth, googleAuthProvider} from '../../_firebase';
import {Button} from 'antd';
import {MailOutlined, GoogleOutlined} from '@ant-design/icons';
import axios from 'axios';

// Create user
const createUser = async (token) => {
    return await axios.post(process.env.REACT_APP_API_URL + '/user/create', {}, {
        headers: {
            authToken: token
        }
    });
}

const Login = () => {
    const [email, setEmail] = useState(window.localStorage.getItem('hyproid:reg-email', ''));
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const googleSubmit = async (e) => {
        e.preventDefault();

        // Sign with Google Auth Provider
        auth
        .signInWithPopup(googleAuthProvider)
        .then(async (result) => {
            const {user} = result;
            const idTokenResult = await user.getIdTokenResult();

            dispatch({
                type: 'LOGGED_IN_USER',
                payload: {
                    email: user.email,
                    token: idTokenResult.token 
                }
            });

            // Redirect to Home Page
            navigate('/');
        })
        .catch((error) => {
            console.log(error);
            toast.error(error.message);
        });


    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.table(email, password);

        try {
            // Check firebase 
            const result = await auth.signInWithEmailAndPassword(email, password);
            const {user} = result;
            const idTokenResult = await user.getIdTokenResult();

            // Create User
            createUser(idTokenResult.token).then((results) => {
                // Set user state
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: {
                        email: user.email,
                        token: idTokenResult.token
                    }
                });

                toast.success('User is created.');

                // Redirect to Home page
                //!navigate('/');
            }).catch((error) => {
                toast.error(`Login Failed. ${error.message}`);
            });

        } catch (error) {
            toast.error('Login Failed. ' + error.message);
            setLoading(false);
        }

    }

    useEffect((e) => {
        const email = window.localStorage.getItem('hyproid:reg-email');
        setEmail(email ? email : 'dev.jeyakumar@gmail.com');

        // @todo: Check if it is redirected from "Reset Password" callback?
        // If so then clear the user state.
    }, []);  

    const loginForm = () => 
        <form onSubmit={handleSubmit}>
            <div className="form-group m-2">
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" autoFocus />
            </div>

            <div className="form-group m-2">
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" />
            </div>
            
            <Button
                type="primary"
                block
                shape="round"
                size="large"
                className="mb-3"
                disabled={!email || password.length < 6}
                icon={<MailOutlined />}            
                onClick={handleSubmit}
            >
                Login with Mail/Password
            </Button>

            <Button
                type="danger"
                shape="round"
                block
                size="large"
                icon={<GoogleOutlined />}
                onClick={googleSubmit}
            >
                Login with Google
            </Button>

            <div style={{textAlign: 'center', 'margin': '20px', fontSize: '14px'}}>
                <Link to="/forgot/password" className="float-right text-danger">Forgot Password</Link>
            </div>
        </form>

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {loading ? (<h4>Loading ...</h4>) : (<h4>Login</h4>)}
                    {loginForm()}
                </div>
            </div>
        </div>
    );
}

export default Login;