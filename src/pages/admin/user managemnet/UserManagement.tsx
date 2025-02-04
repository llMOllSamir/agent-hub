import { useFormik } from 'formik'
import React, { useContext } from 'react'
import * as yup from "yup"
import { agentsContext } from '../../../context/AgentsContext'
import { useNavigate } from 'react-router-dom'
import { roleContext } from '../../../context/RolesContext'
import { Agent } from '../../../types/dataTypes'

export default function UserManagement() {
  const { agents, addAgent } = useContext(agentsContext)
  const { roles } = useContext(roleContext)
  const navigate = useNavigate()


  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    role: yup.string().required("Role is required"),
    department: yup.string().required("Department is required"),
    contact: yup.object({
      email: yup.string().required("Email is required").email("Email is invalid"),
      phone: yup.string().required("phone is required"),
      extension: yup.string().required(),
    }),
    shifts: yup.array().required(),
    location: yup.string().required("Location is required"),
  })
  const formik = useFormik<Agent>({
    initialValues: {
      "id": Math.max(...agents.map(a => a.id)) + 1,
      name: "",
      role: "",
      department: "",
      contact: {
        email: "",
        phone: "",
        extension: ""
      },
      status: "Active",
      shifts: ["morning"],
      hire_date: "",
      experience: "0 years",
      supervisor: "",
      location: "",
      performance: {
        avg_call_duration: "00m 00s",
        total_calls: 0,
        missed_calls: 0,
        resolved_calls: 0,
        call_rating_avg: 0,
        call_distribution: {
          morning: 0,
          evening: 0,
        }
      },
      activity: {
        last_login: "",  // Empty as no activity yet
        last_call_time: "",  // Empty as no call history yet
        break_time_today: "0m",  // Empty as no data yet
        active_time_today: "0h 0m"  // Empty as no data yet
      },
      skills: [],
      notes: [],
      call_history: []  // Empty as no call history yet
    },
    validationSchema,
    onSubmit: async (values) => {
      addAgent(values)
      formik.resetForm()
      navigate("/admin/user-management/agents")
    }
  })

  return (
    <section>
      <form onSubmit={formik.handleSubmit} >
        <section className='p-5 grid  md:grid-cols-2 gap-4 '>
          <div className='border-b border-yellow-700  flex flex-col p-5 gap-4'>
            <h2 className='text-xl font-bold md:col-span-2 text-blue-800 underline underline-offset-8 mb-3 '>Personal Details</h2>
            <div className='flex flex-col gap-2 '>
              <label htmlFor="name">Name</label>
              <input
                id='name'
                type="text"
                name='name'
                placeholder='example: John Doe'
                className='border border-gray-400 rounded-md p-1 px-2 outline-0'
                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name && (
                <div className='text-red-600 font-bold text-sm -mt-1 capitalize '>{formik.errors.name}</div>
              )}
            </div>
            <div className='flex flex-col gap-2 '>
              <label htmlFor="email">Email</label>
              <input
                id='email'
                type="email"
                name='contact[email]'
                placeholder='example: John.email.com'
                className='border border-gray-400 rounded-md p-1 px-2 outline-0'
                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.contact.email}
              />
              {formik.touched.contact?.email && formik.errors.contact?.email && (
                <div className='text-red-600 font-bold text-sm -mt-1 capitalize'>{formik.errors.contact?.email}</div>
              )}
            </div>
            <div className='flex flex-col gap-2 '>
              <label htmlFor="phone">Phone</label>
              <input
                id='phone'
                type="phone"
                name='contact[phone]'
                placeholder='example: +23-1232314'
                className='border border-gray-400 rounded-md p-1 px-2 outline-0'
                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.contact.phone}
              />
              {formik.touched.contact?.phone && formik.errors.contact?.phone && (
                <div className='text-red-600 font-bold text-sm -mt-1 capitalize'>{formik.errors.contact?.phone}</div>
              )}
            </div>
            <div className='flex flex-col gap-2 '>
              <label htmlFor="location">Location</label>
              <input
                id='location'
                type="text"
                name='location'
                placeholder='example: New York'
                className='border border-gray-400 rounded-md p-1 px-2 outline-0'
                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.location}
              />
              {formik.touched.location && formik.errors.location && (
                <div className='text-red-600 font-bold text-sm -mt-1 capitalize'>{formik.errors.location}</div>
              )}
            </div>
          </div>

          <div className='border-b border-yellow-700  flex flex-col p-5 gap-4'>
            <h2 className='text-xl font-bold md:col-span-2 text-blue-800 underline underline-offset-8 mb-3 '>Hospital Details</h2>
            <div className='flex flex-col gap-2 '>
              <div className='flex flex-col gap-2 '>
                <label htmlFor="id">Agent Id</label>
                <input
                  id='id'
                  type="text"
                  readOnly
                  placeholder='example: 123'
                  className='border border-gray-400 rounded-md p-1 px-2 outline-0 '
                  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.id}
                />
                {formik.touched.id && formik.errors.id && (
                  <div className='text-red-600 font-bold text-sm -mt-1 capitalize '>{formik.errors.id}</div>
                )}
              </div>

              <div className='flex flex-col gap-2 '>
                <label htmlFor="role">Role</label>
                <select name="role" id="role"
                  className='border capitalize border-gray-400 rounded-md p-1 px-2 outline-0 cursor-pointer '
                  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.role} >
                  {
                    Object.keys(roles).map((role, index) => <option key={index} className='capitalize' value={role}>{role}</option>)
                  }
                </select>

                {formik.touched.role && formik.errors.role && (
                  <div className='text-red-600 font-bold text-sm -mt-1 capitalize '>{formik.errors.role}</div>
                )}
              </div>

              <div className='flex flex-col gap-2 '>
                <label htmlFor="department">Department</label>
                <select name="department" id="department"
                  className='border border-gray-400 rounded-md p-1 px-2 outline-0 cursor-pointer '
                  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.department} >
                  {
                    agents.map(a => a.department).map((dep, index) => <option key={index} value={dep}>{dep}</option>)
                  }

                </select>

                {formik.touched.department && formik.errors.department && (
                  <div className='text-red-600 font-bold text-sm -mt-1 capitalize '>{formik.errors.department}</div>
                )}
              </div>
              <div className='flex justify-start items-start gap-4 '>
                <div className='flex flex-col gap-2 grow '>
                  <label htmlFor="date">Date Of Join</label>
                  <input
                    id='date'
                    type="date"
                    placeholder='example: 123'
                    name='hire_date'
                    className='border border-gray-400 rounded-md p-1 px-2 outline-0 '
                    onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.hire_date}
                  />
                </div>
                <div className='flex flex-col gap-2 grow   '>
                  <label htmlFor="extension">Extension</label>
                  <input
                    id='extension'
                    type="text"
                    name='contact[extension]'
                    placeholder='example: 1232'
                    className='border border-gray-400 rounded-md p-1 px-2 outline-0 '
                    onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.contact.extension}

                  />
                  {formik.touched.contact?.extension && formik.errors.contact?.extension && (
                    <div className='text-red-600 font-bold text-sm -mt-1 capitalize '>{formik.errors.contact?.extension}</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col p-5 gap-4'>
            <h2 className='text-xl font-bold md:col-span-2 text-blue-800 underline underline-offset-8 mb-3 '>Stuff Role Access</h2>
            {
              Object.keys(roles).map(role => (
                <article key={role} className='flex flex-col border-yellow-700 border-b pb-2  '>
                  <h3 className='font-bold text-xl capitalize'>{role} </h3>
                  <p className='font-semibold capitalize '>{roles[role].permissions.map(p => p.split("_").join(" ")).join(', ')}</p>
                </article>
              ))
            }
          </div>
          <div className='p-5'>
            <h2 className='text-xl font-bold md:col-span-2 text-blue-800 underline underline-offset-8 mb-3  '>Confirmation</h2>
            <p>Please make sure all the details are correct before submitting the form.
              After you submit, the new agent will be added to the system.</p>
            <button type='submit' className='rounded-xl cursor-pointer w-40 px-5 py-2 bg-blue-700 text-white font-bold flex justify-center items-center ms-auto'>Confirm</button>
          </div>
        </section>
      </form>
    </section>
  )
}
