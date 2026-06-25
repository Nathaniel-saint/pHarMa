import React, {useState} from "react";
import { Link, useNavigate } from 'react-router-dom';


//import goes up here


function SignUp(){

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = (e) =>{
        e.preventDefault();

        const {username, email,password, confirmPassword} = form;

        if (password === confirmPassword){
            alert('sign up successful')

            const userdata = {
                username: username,
                email: email,
                password: password
            }

            const temporarySessionMockToken = "auth_session_token_node_" + Date.now();
            localStorage.setItem("user_token", temporarySessionMockToken);

            localStorage.setItem('dummyUser',JSON.stringify(userdata))
                navigate('/dashboard');
                return;
            
        }
        else{
            alert('password mismatch')
        }
    };

return(
    // <div className="one">
        <div className="input-form-wrapper">
            <form className="form" onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                
                <label className="user">Username</label>
                <input type="text" name="username" value={form.username} onChange={handleChange} required/>
                
                <label className="email">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required/>
                
                <label className="pass">Password</label>
                <input type="password" name="password" value={form.password} onChange={handleChange} required/>
                
                <label className="c-pass">Confirm Password</label>
                <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
                
                <button type="submit">Submit</button>
                
                <p>Already have an account? <Link to="/login"><em>Sign in</em></Link>.</p>
            </form>
        </div>
        // </div>
    );

}

export default SignUp;