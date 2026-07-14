import { useState } from "react"
import sendData from "../services/api"

const Form = () => {
    // Initialize state as a single object
    const [ formData, setFormData ] = useState({
        name:   '',
        email:  '',
        phone:  '',
        city:   '',
        budget: ''
    })


    const fields = [
        { id: "name", label: "Name", type: "text", required: true },
        { id: "email", label: "Email Address", type: "email", required: true },
        { id: "phone", label: "Phone Number", type: "tel" },
        { id: "city", label: "City", type: "text" },
        { id: "budget", label: "Budget", type: "number", required: true },
    ]

    // Dynamically handle changes for all fields using the 'name' attribute
    function handleChange(e) {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    // Handle the submition form to backend using an api
    async function handleSubmit(e) {
        e.preventDefault()

        // Format the data to match your desired structure
        const clientObj = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            city: formData.city,
            budget: formData.budget
        }

        try {
            const result = await sendData(clientObj)

            alert(result.message)

            setFormData({
                name: '',
                email: '',
                phone: '',
                city: '',
                budget: ''
            })

        } catch (err) {
            console.error(err)
            alert('Something went wrong')
        }
    }


    return (
        <form onSubmit={ handleSubmit } className="w-full mt-2">
            <h2 className="text-2xl text-[#0fa8ed]">Find Your Dream Home</h2>
            <p className="mb-2">Fill out the form in less than 2 minutes and get the best options.</p>

            <div className="space-y-0.5">
                {fields.map((field) => (
                    <div key={ field.id } className="flex flex-col">
                        <label 
                            htmlFor={ field.id }
                            className="mb-1 font-medium text-[#ead4ef]"
                        >
                            { field.label }
                        </label>

                        <input 
                            id={ field.id }
                            type={ field.type }
                            name={ field.id }
                            value={ formData[field.id] }
                            onChange={ handleChange }
                            required={ field.required } 
                            className="rounded-md border border-[#0fa8ed] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6eafce]"
                        />
                    </div>
                ))}
            </div>
            
            <button type="submit" className="w-full mt-6 px-3 py-2 bg-[#0fa8ed] text-[#ead4ef] font-bold rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#0c94d2] hover:scale-105">Send</button>
        </form>
    )
}
 
export default Form