import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

import {auth} from '../../_firebase';


const RegisterComplete = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (! email) {
            toast.error('Email is required.');        
            return;
        } else if (! password) {
            toast.error('Please enter the password.');
            return;
        } else if (password.length < 8) {
            toast.error('Password must be at least 8 characters long.');
            return;
        }

        try {
            const result = await auth.signInWithEmailLink(email, window.location.href);
            console.log(result);

            if (result.user.emailVerified) {
                toast.success(`${email} is verified successfully.`);

                // Clear the local storage
                window.localStorage.removeItem('hyproid:reg-email');

                // update password
                const user = auth.currentUser;
                await user.updatePassword(password);

                // Get user logged-in information
                const idTokenResult = user.getIdTokenResult();
                console.log('User: ', user, 'ID & Token: ', idTokenResult);

                // redux store

                // redirect to dashboard
                navigate('/');  
            }

        } catch(error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // Retrieve an Email at the time of page load.
    useEffect(() => {
        setEmail(window.localStorage.getItem('hyproid:reg-email'));
    }, []);
    

    const registerCompleteForm = () => 
        <form onSubmit={handleSubmit}>
            <input type="text" className="m-2 form-control" value={"E-mail: <" + email + ">"} readOnly />
            <input type="password" className="m-2 form-control" value={password}  onChange={(e) => setPassword(e.target.value)} placeholder="Enter new password" autoFocus />

            <button type="submit" className="m-2 text-center btn btn-raised btn-primary">Complete Registration</button>
        </form>

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4 className="m-2">Complete Registration</h4>
                    {registerCompleteForm()}
                </div>
            </div>

        </div>
    );
}

export default RegisterComplete;