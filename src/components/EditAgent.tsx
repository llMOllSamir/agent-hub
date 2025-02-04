import { useContext } from 'react'
import { agentsContext } from '../context/AgentsContext'
import { useFormik } from 'formik'
import { X } from 'lucide-react'
import { roleContext } from '../context/RolesContext'
import { Agent } from '../types/dataTypes'

type EditProps = {
    openModel: boolean,
    agent: Agent,
    closeModel: () => void
}
export default function EditAgent({ closeModel, openModel, agent }: EditProps) {
    const { editAgent, agents } = useContext(agentsContext)
    const { roles } = useContext(roleContext)

    const formik = useFormik({
        initialValues: {
            name: agent.name,
            email: agent.contact.email,
            phone: agent.contact.phone,
            role: agent.role.toLowerCase(),
            department: agent.department,
            extension: agent.contact.extension
        }, onSubmit: (values) => {
            if (agent) {
                const editData: Agent = {
                    ...agent,
                    name: values.name,
                    role: values.role,
                    department: values.department,
                    contact: {
                        email: values.email,
                        extension: values.extension,
                        phone: values.phone
                    }
                }
                editAgent(editData)
                closeModel()
            }
        }
    })
    if (!agent || !openModel) return null
    return (
        <section className='fixed inset-0 z-10 bg-[rgba(0,0,0,0.4)] flex justify-center items-center ' onClick={() => { closeModel() }}>
            <div onClick={(e) => e.stopPropagation()} className='popUp min-w-[450px] md:min-w-[500px] shadow-2xl shadow-gray-600 rounded-2xl bg-[rgba(255,255,255,0.8)] relative  p-10 aspect-video'>
                <button onClick={() => { closeModel() }} className='absolute end-5 top-5 cursor-pointer rounded-full size-8 transition-all hover:bg-gray-400 flex justify-center items-center '><X /></button>
                <h2 className='text-blue-700 text-2xl my-5  font-bold'>Edit Information</h2>
                <form onSubmit={formik.handleSubmit} onReset={formik.handleReset} className='flex flex-col gap-4  '>
                    <div className='flex gap-4 w-full'>
                        <label htmlFor="name" className='font-bold w-3/12'>Name :</label>
                        <input type="text" name='name' id='name'
                            className='border border-blue-700 rounded-2xl px-4 py-px  focus:border-2 outline-0 grow'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                        />
                    </div>

                    <div className='flex gap-4 w-full'>
                        <label htmlFor="email" className='font-bold w-3/12'>Email :</label>
                        <input type="email" name='email' id='email'
                            className='border border-blue-700 rounded-2xl px-4 py-px  focus:border-2 outline-0 grow'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                    </div>

                    <div className='flex gap-4 w-full'>
                        <label htmlFor="phone" className='font-bold w-3/12'>Phone :</label>
                        <input type="text" name='phone' id='phone'
                            className='border border-blue-700 rounded-2xl px-4 py-px  focus:border-2 outline-0 grow'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}
                        />
                    </div>

                    <div className='flex gap-4 w-full'>
                        <label htmlFor="role" className='font-bold w-3/12' >Role :</label>
                        <select name="role" id="role"
                            className='border border-blue-700 capitalize rounded-2xl px-4 py-px  focus:border-2 outline-0 cursor-pointer grow'
                            onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.role} >
                            {
                                Object.keys(roles).map((role, index) => <option key={index} className='capitalize' value={role}>{role}</option>)
                            }
                        </select>
                    </div>

                    <div className='flex gap-4 w-full '>
                        <label htmlFor="department" className='font-bold w-3/12'>Department :</label>
                        <select name="department" id="department"
                            className='border border-blue-700 rounded-2xl px-4 py-px  focus:border-2 outline-0 cursor-pointer grow'
                            onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.department} >
                            {
                                agents.map(a => a.department).map((dep, index) => <option key={index} value={dep}>{dep}</option>)
                            }
                        </select>
                    </div>

                    <div className='flex gap-4 w-full'>
                        <label htmlFor="extension" className='font-bold w-3/12'>Extension :</label>
                        <input type="text" name='extension' id='extension'
                            className='border border-blue-700 rounded-2xl px-4 py-px  focus:border-2 outline-0 grow'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.extension}
                        />
                    </div>
                    <button className='flex cursor-pointer justify-center items-center mx-auto w-9/12 bg-yellow-600 rounded-2xl py-2  font-bold  '>Edit</button>
                </form>
            </div>
        </section>
    )
}
