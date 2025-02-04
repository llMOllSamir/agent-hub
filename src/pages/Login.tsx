import React from 'react'
import { login } from '../utils/data';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';
export default function Login() {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const navigate = useNavigate();
    const schema = yup.object({
        name: yup.string().required('Name is required'),
        password: yup.string().required('Password is required'),
    });

    const onSubmit = async (values: { name: string, password: string }
    ) => {
        try {
            setIsSubmitting(true);
            const user = await login(values);
            localStorage.setItem("user", JSON.stringify(user));
            if (user.role === "admin") navigate("/admin")
            if (user.role === "agent") navigate("/")
        } catch (error) {
            if (error instanceof Error) return setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            password: '',
        },
        validationSchema: schema,
        onSubmit
    });

    return (
        <main className='grow flex items-center justify-center '>
            <form onSubmit={formik.handleSubmit} className='flex flex-col p-10 rounded-2xl  min-w-96 text-lg font-semibold   text-black bg-white shadow-md gap-5  ' >
                <h1 className='text-4xl mb-5 text-center text-blue-600 font-extrabold '>Agent Hub</h1>
                <h2 className='text-3xl text-center font-bold '>Login</h2>
                {error && <p className='text-red-600 text-center text-sm font-bold'>{error}</p>}
                <label htmlFor="name" className='text-blue-600'>Name</label>
                <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    type="text" id="name" name="name" className='border-b   focus:outline-0 -mt-4  py-1 bg-transparent   ' />
                {formik.touched.name && formik.errors.name && <p className='text-red-600 -mt-3 text-sm font-semibold'>{formik.errors.name}</p>}
                <label htmlFor="password" className='text-blue-600'>Password</label>
                <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    type="password" id="password" name="password" className='border-b  -mt-4 py-1 focus:outline-0 bg-transparent    ' />
                {formik.touched.password && formik.errors.password && <p className='text-red-600 -mt-3 text-sm font-semibold'>{formik.errors.password}</p>}

                <button type="submit" className='bg-blue-600 p-2 my-5 rounded-lg hover:bg-blue-500 cursor-pointer flex justify-center items-center'>
                    {
                        isSubmitting ?
                            <LoaderCircle className='animate-spin' size={25} />
                            : "Login"
                    }

                </button>
            </form>
        </main >
    )
}
