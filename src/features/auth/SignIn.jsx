import React, {useState} from "react";
import { Link, useNavigate } from 'react-router-dom';


//import goes up here


function SignIn(){

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        const rawData = localStorage.getItem('dummyUser');

        if(!rawData){
            alert('user does not exist redirecting to signup');
            navigate('/register');
            return;
        }

        const logData = JSON.parse(rawData);


        if (logData.email===form.email && logData.password===form.password){
            alert('Successfully signed in');
            navigate('/dashboard');
        }
        else{
            alert('invalid credentials');
        }        
    }

    return(
            <div className="input-form-wrapper">
            <form className="form" onSubmit={handleSubmit}>
                <h1>Sign In</h1>
                <label className="email">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required></input>
                <label className='pass'>Password</label>
                <input type="password" name="password" value={form.password} onChange={handleChange} required></input>
                <button type="submit">Sign In</button>

                <p>Don't have an account? <Link to="/register"><emp>register</emp></Link>.</p>
            </form>
        </div>
    );

}

export default SignIn;