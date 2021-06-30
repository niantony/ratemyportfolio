import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const EditPortfolio = ({ portfolio }) =>  {
    const [form, setForm] = useState({ title: portfolio.title, description: portfolio.description })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState({})
    const router = useRouter()

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                updatePortfolio();
                router.push('/explore')
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

    const updatePortfolio = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/portfolios/${router.query.id}`, {
                method: 'PUT',
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

    return (
        <div className="form-container">
            <h1>Create Portfolio</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" name="title" placeholder="Title..." value={form.title} onChange={handleChange}/>
                </label>
                <label>
                    Description:
                    <input type="text" name="description" placeholder="Description..." value={form.description} onChange={handleChange}/>
                </label>
                <input type="submit" value="Update"/>
            </form>
        </div>
    )
}

EditPortfolio.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/portfolios/${id}`)
    const { data } = await res.json()

    return { portfolio: data }
}

export default EditPortfolio