import router from 'next/router'
import { useState, useEffect } from 'react'
import { verify } from 'jsonwebtoken'

const NewPortfolio = async (req, res) =>  {
    const [form, setForm] = useState({ title: '', description: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                createPortfolio();
                router.push('/explore')
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

    const createPortfolio = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/portfolios', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
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

        if (!form.title) {
            err.title = 'Title is required';
        }
        if (!form.description) {
            err.description = 'Description is required';
        }
        return err;
    }

    await verify(req.cookies.auth, process.env.TOKEN_SECRET, async function(err, decoded) {
        if (!err && decoded) {
            return (
                <div className="form-container">
                    <h1>Create Portfolio</h1>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Title:
                            <input type="text" name="title" placeholder="Title..." onChange={handleChange}/>
                        </label>
                        <label>
                            Description:
                            <input type="text" name="description" placeholder="Description..." onChange={handleChange}/>
                        </label>
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
            )
        }
    })
}

export default NewPortfolio