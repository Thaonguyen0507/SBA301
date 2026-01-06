import { useState } from 'react'
import '../pages/Page.css'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        alert('Thank you for your message! We will get back to you soon.')
        setFormData({ name: '', email: '', message: '' })
    }

    return (
        <main>
            <div className="container">
                <h1>Contact Us</h1>
                <section>
                    <h2>Contact Information</h2>
                    <p><strong>Email:</strong> nguyentht@gmail.com</p>
                    <p><strong>Phone:</strong> +84 (0) 123 456 789</p>
                    <p><strong>Address:</strong> 123 Hahaha</p>
                </section>
            </div>
        </main>
    )
}
