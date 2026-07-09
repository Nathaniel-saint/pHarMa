import React, {useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';


//import goes up here


function SignIn(){

    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: '',
    });


    const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        
        const created_token = 'fuckyou'
        localStorage.setItem('user_token', created_token)
        const rawData = localStorage.getItem('dummyUser');

        console.log(rawData)

        if(!rawData){
            alert('user does not exist redirecting to signup');
            navigate('/register');
            return;
        }

        const logData = JSON.parse(rawData);
  

        if (logData.email===form.email && logData.password===form.password){
            navigate('/dashboard');
            // console.log(logData)
            alert('Successfully signed in');
        }
        else{
            alert('invalid credentials');
        }        
    }

    return(
            <div className="input-form-wrapper">
            <form className="form sign-in" onSubmit={handleSubmit}>
                <h1>Sign In</h1>
                <img className="img-auth" src="src/assets/auth.jpg" alt="" />

                <div className="sign-in email-lable">
                    <label className="email">Email</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required></input>
                </div>

                <div className="sign-in pass-label">
                    <label className='pass'>Password</label>
                    <input type="password" name="password" value={form.password} onChange={handleChange} required></input>
                </div>
                <button className="submit-in" type="submit">Sign In</button>

                <p>Don't have an account? <Link to="/register"><em>register</em></Link>.</p>
            </form>
        </div>
    );

}

export default SignIn;