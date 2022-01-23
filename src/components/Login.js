import React, { useState } from 'react'
import './login.css'
import { Link, useHistory } from 'react-router-dom'
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
const Login = () => {
    const history = useHistory();
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    

    const login = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password)
            history.push("/")
        } catch (error) {
            alert(error.message)
        }
    }

    const register = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            history.push("/")
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div className="login">
            <Link to="/">
                <img
                    className="login_logo"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'

                    alt="amazon-logo"
                />
            </Link>

            <div className="login_container">
                <h2>Sign in</h2>
                <form>
                    <h5>Email</h5>
                    <input value={email} onChange={e => setemail(e.target.value)} type="email" />
                    <h5>Password</h5>
                    <input value={password} onChange={e => setpassword(e.target.value)} type="password" />
                    <button type="submit" onClick={login} className="login_signin">Sign in</button>
                </form>

                <p>By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.</p>
                {/* {useAuth.email} */}

                <button type="submit" onClick={register} className="login_register">Create your Amazon account</button>
            </div>
        </div>

    )
}



export default Login;