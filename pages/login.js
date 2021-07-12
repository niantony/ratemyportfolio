import { set } from 'js-cookie'
import router from 'next/router'
import { useState, useEffect } from 'react'

const Login = () =>  {
    const [form, setForm] = useState({ title: '', description: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [loginSuccess, setLoginSuccess] = useState(false)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                userLogin();
                // router.push('/')
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

    const userLogin = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/user/login', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: form.email,
                    password: form.password
                })
            })
            if (res.status === 200) setLoginSuccess(true)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const validate = () => {
        let err = {};

        if (!form.email) {
            err.email = 'Email is required';
        }
        if (!form.password) {
            err.password = 'Password is required';
        }
        return err;
    }

    return (
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="text" name="email" placeholder="Email..." onChange={handleChange}/>
                </label>
                <label>
                    Password:
                    <input type="text" name="password" placeholder="Password..." onChange={handleChange}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default Login