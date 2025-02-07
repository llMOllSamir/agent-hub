import { useContext, useState } from 'react';
import PermissionsTable from '../../../components/PemisionsTable';
import RolesTable from '../../../components/RolesTable ';
import Modal from '../../../components/Modal';
import { roleContext } from '../../../context/RolesContext';
import { permissionsContext } from '../../../context/permissionsContext';

type EditSection = "add role" | "add permission" | ""


export default function RoleManagement() {
    const [openModal, setOpenModal] = useState(false)
    const [editSection, setEditSection] = useState<EditSection>("")
    const { addRole } = useContext(roleContext)
    const { addPermission, permissions } = useContext(permissionsContext)
    const [selectedPermission, setSelectedPermission] = useState<string[]>([])

    const handleOpenModal = (str: EditSection) => {
        setOpenModal(true)
        setEditSection(str)
    }


    const addSelectedPermission = (per: string) => {
        const permissionExists = selectedPermission.find(p => p === per)
        if (permissionExists) return
        setSelectedPermission(prev => [...prev, per])
    }
    const deleteSelectedPermission = (per: string) => setSelectedPermission(prev => prev.filter(p => p !== per))
    return (
        <section className='p-5 '>
            {/* Roles */}
            <div className=' mt-5 '>
                <div className='flex gap-4 justify-start items-center'>
                    <h2 className='text-2xl font-bold text-blue-500 my-4'>Roles Management</h2>
                    <button onClick={() => { handleOpenModal("add role") }} className='flex ms-auto bg-blue-700 text-white cursor-pointer  px-4 py-2 rounded-xl '>Add Role</button>
                </div>

                <div className='bg-white rounded-xl'> <RolesTable permissions={permissions} /></div>

                {openModal && editSection === "add role" && <Modal closeModel={() => { setOpenModal(false); setSelectedPermission([]) }} >
                    <h2 className='text-xl font-bold text-blue-500 my-4'>Add Role</h2>
                    <form className='max-w-[500px] w-[500px]' onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target as HTMLFormElement)
                        addRole({ title: formData.get('role') as string, permissions: selectedPermission })
                        setOpenModal(false)
                        setSelectedPermission([])
                    }}>
                        <div className="flex gap-4 items-center my-5">
                            <label htmlFor="role" className='font-bold'>Role Title</label>
                            <input type="text" name='role' required className='border border-gray-600 outline-0 rounded-md  grow px-2 py-1' id='role' placeholder='Enter Role' />
                        </div>

                        <div className="flex gap-4 items-center my-5">
                            <label htmlFor="role_permission" className='font-bold'>Role Permissions</label>
                            <select className='border cursor-pointer border-gray-600 outline-0 rounded-md  grow px-2 py-1' id='role_permission' onChange={(e) => {
                                addSelectedPermission(e.target.value)
                            }}  >
                                <option value=''>Select Permissions</option>
                                {
                                    permissions.map(p => <option value={p.permission}>{p.permission.split("_").join(" ")}</option>)
                                }
                            </select>
                        </div>

                        {
                            selectedPermission.length > 0 && <div className='bg-white py-3 drop-shadow-lg w-full flex-wrap  rounded-md px-2   flex gap-2 items-center'>
                                {
                                    selectedPermission.map(p =>
                                        <div key={p} className='flex gap-2  items-center text-sm bg-gray-200 px-2 py-1 rounded-2xl' >
                                            <strong>{p.split("_").join(" ")}</strong>
                                            <button className='cursor-pointer justify-center items-center flex  bg-white rounded-full drop-shadow-2xl size-5 font-bold'
                                                onClick={() => { deleteSelectedPermission(p) }} >X</button>
                                        </div>
                                    )
                                }
                            </div>
                        }

                        <button type='submit'
                            className='flex mx-auto min-w-1/2 my-5 justify-center items-center bg-blue-700 text-white cursor-pointer  px-4 py-1.5 rounded-xl '>Save</button>
                    </form>
                </Modal>}
            </div>
            {/* Permissions */}
            <div className=' mt-5 '>
                <div className='flex gap-4 justify-start items-center'>
                    <h2 className='text-2xl font-bold text-blue-500 my-4'>Permissions Management</h2>
                    <button onClick={() => { handleOpenModal("add permission") }} className='flex ms-auto bg-blue-700 text-white cursor-pointer  px-4 py-2 rounded-xl '>Add Permission</button>
                </div>
                <PermissionsTable />
                {openModal && editSection === "add permission" && <Modal closeModel={() => { setOpenModal(false) }} >
                    <h2 className='text-xl font-bold text-blue-500 my-4'>Add Role</h2>
                    <form className='max-w-[500px] w-[500px]' onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target as HTMLFormElement)
                        addPermission({ description: formData.get('description') as string, permission: formData.get('Permission') as string })
                        setOpenModal(false)
                        setSelectedPermission([])
                    }}>
                        <div className="flex gap-4 items-center my-5">
                            <label htmlFor="Permission" className='font-bold'>Permission Title</label>
                            <input type="text" name='Permission' required className='border border-gray-600 outline-0 rounded-md  grow px-2 py-1' id='Permission' placeholder='Enter Permission' />
                        </div>

                        <div className="flex flex-col gap-4 items-start my-5">
                            <label htmlFor="description" className='font-bold'>Role Title</label>
                            <textarea name='description' required
                                className='border w-full border-gray-600 outline-0 rounded-md  resize-none grow px-4 py-2'
                                id='description' placeholder='Enter description'
                                rows={4}
                            />
                        </div>

                        <button type='submit'
                            className='flex mx-auto min-w-1/2 my-5 justify-center items-center bg-blue-700 text-white cursor-pointer  px-4 py-1.5 rounded-xl '>Save</button>
                    </form>

                </Modal>}
            </div>
        </section>
    )
}
