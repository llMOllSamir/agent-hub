import React from 'react'
import { login } from '../utils/data';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LoaderCircle, Lock, User as UserFace } from 'lucide-react';
import { User } from '../App';
import loginPic from "../../public/assets/images/login-bg.webp"


type Props = {
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}
export default function Login({ setUser }: Props) {
    const [showPassword, setShowPassword] = React.useState(false);
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
            setUser(user)
            if (user.role === "admin") {
                navigate("/admin")

            } else {
                navigate("/")
            }
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
        <main className='grow flex items-center justify-center ' style={{
            backgroundImage: `url(${loginPic})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat'
        }}>
            <form onSubmit={formik.handleSubmit} className='flex flex-col py-5  rounded-2xl  min-w-md md:min-w-lg text-lg font-semibold   text-black bg-white shadow-md gap-5  ' >
                <h1 className='text-3xl mb-5  text-black font-extrabold border-b px-5 py-5  border-gray-300 '>Agent Hub</h1>
                <h2 className='text-2xl text-center text-gray-500 font-semibold '>Login</h2>
                {error && <p className='text-red-600 text-center text-sm font-bold'>{error}</p>}
                <div className='flex  items-stretch mx-10 border rounded-lg border-gray-300  text-gray-700  '>
                    <label htmlFor="name" className=' aspect-square border-r p-3 border-gray-300 flex justify-center items-center cursor-pointer'><UserFace size={20} /></label>
                    <input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        placeholder='User Name'
                        type="text" id="name" name="name" className='focus:outline-0   px-5 bg-transparent   ' />
                </div>
                {formik.touched.name && formik.errors.name && <p className='text-red-600 mx-10 -mt-3 text-sm font-semibold'>{formik.errors.name}</p>}
                <div className='flex  items-stretch mx-10 border rounded-lg border-gray-300  text-gray-700 '>
                    <label htmlFor="password" className=' aspect-square border-r p-3 border-gray-300 flex justify-center items-center cursor-pointer'><Lock size={20} /></label>
                    <input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        placeholder='Password'
                        type={showPassword ? "text" : "password"} id="password" name="password" className='focus:outline-0   px-5 bg-transparent   ' />
                    <button type='button' className='flex justify-center items-center ms-auto px-4  text-blue-500 cursor-pointer ' onClick={() => setShowPassword(!showPassword)}>
                        {
                            showPassword ?
                                <EyeOff size={24} />
                                :
                                <Eye size={24} />
                        }
                    </button>
                </div>
                {formik.touched.password && formik.errors.password && <p className='text-red-600 mx-10 -mt-3 text-sm font-semibold'>{formik.errors.password}</p>}

                <button type="submit" className='bg-blue-600 p-2 my-5 mx-10 text-white rounded-lg hover:bg-blue-500 cursor-pointer flex justify-center items-center'>
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
