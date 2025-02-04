import { useContext, useEffect, useMemo, useState } from 'react'
import DataTable, { TableColumn, TableStyles } from 'react-data-table-component'
import { roleContext } from '../context/RolesContext';
import { Permission } from '../context/permissionsContext';
import Modal from './Modal';


type RolesDisplay = {
    role: string,
    permissions: string[]
}


export default function RolesTable({ permissions }: { permissions: Permission[] }) {
    const { roles, deleteRole, editRolePermissions } = useContext(roleContext)
    const [filter, setFilter] = useState("")
    const [openModal, setOpenModal] = useState(false)
    const [selectedRole, setSelectedRole] = useState<RolesDisplay | null>(null)
    const [selectedRolePermissions, setSelectedRolePermissions] = useState<string[]>([])

    const rolesDisplay = useMemo<RolesDisplay[]>(() => {
        const data = Object.keys(roles).map((key) => ({ role: key, permissions: roles[key].permissions }))
        if (filter.length) return data.filter(p => p.role.toLowerCase().includes(filter.toLowerCase()))
        return data
    }, [roles, filter])


    const roleColumns = useMemo<TableColumn<RolesDisplay>[]>(() => ([
        {
            name: 'Role',
            cell: (row) => <strong className='text-base'>{row.role}</strong>,
            maxWidth: '200px',
            center: true,
            style: {
                textTransform: "capitalize",
                fontSize: '15px',
            }
        },
        {
            name: 'Permissions',
            cell: (row) => <div className='flex justify-start flex-wrap gap-3 '>
                {row.permissions.map(p => <span key={p}>{p.split("_").join(" ")}</span>)}
            </div>,
            style: {
                textTransform: "capitalize",
                paddingLeft: "10px",
                borderLeft: "1px solid #ccc",
                borderRight: "1px solid #ccc",
            }
        },
        {
            name: "Actions",
            cell: (row) => <div className='flex gap-4 flex-wrap justify-center items-center'>
                <button onClick={() => { setSelectedRole(row); setOpenModal(true) }} className='bg-yellow-500 text-white cursor-pointer  px-4 py-2 rounded-xl'>Edit</button>
                <button onClick={() => { deleteRole(row.role) }} className='bg-red-500 text-white cursor-pointer  px-4 py-2 rounded-xl'>Delete</button>
            </div>,
            maxWidth: "200px",
            center: true
        }
    ]), [deleteRole])

    const customStyles: TableStyles = {
        headRow: {
            style: {
                fontSize: '18px',
                fontWeight: 'bold',
            },
        },
        rows: {
            style: {
                fontWeight: '500',
                fontSize: '14px',
            },
        },
        headCells: {
            style: {
                justifyContent: "center",
            }
        }, cells: {
            style: {
                textTransform: "capitalize",
                fontWeight: '500',
                paddingBlock: "4px"
            }
        }
        ,
        pagination: {
            style: {
            }
        }

    };
    useEffect(() => {
        if (selectedRole) setSelectedRolePermissions(selectedRole.permissions)
    }, [selectedRole])

    return (
        <>
            <DataTable
                columns={roleColumns}
                data={rolesDisplay}
                actions={
                    <input type="text" className='rounded-xl px-2 text-lg  border border-gray-600  outline-0' placeholder='Search' onChange={(e) => setFilter(e.target.value)} value={filter} />
                }
                pagination
                paginationPerPage={5}
                paginationRowsPerPageOptions={[5]}
                highlightOnHover
                striped
                pointerOnHover
                className='rounded-2xl'
                customStyles={customStyles}
                noDataComponent={<h2 className='text-xl font-bold text-blue-700 my-4'>No permissions found</h2>}
            />

            {
                openModal && selectedRole && <Modal closeModel={() => { setOpenModal(false); setSelectedRole(null) }}>
                    <h2 className='text-xl font-bold text-blue-800 my-4'>Edit Role</h2>
                    <form className='max-w-[500px] w-[500px]' onSubmit={(e) => {
                        e.preventDefault();
                        editRolePermissions(selectedRole.role, selectedRolePermissions)
                        setOpenModal(false)
                        setSelectedRole(null)
                    }}>
                        <div className="flex gap-4 items-center my-5">
                            <label htmlFor="role" className='font-bold'>Role Title</label>
                            <input type="text"
                                value={selectedRole.role}
                                readOnly
                                name='role' required className='border border-gray-600 outline-0 rounded-md  grow px-2 py-1' id='role' placeholder='Enter Role' />
                        </div>

                        <div className="flex gap-4 items-center my-5">
                            <label htmlFor="role_permission" className='font-bold'>Role Permissions</label>
                            <select className='border cursor-pointer border-gray-600 outline-0 rounded-md  grow px-2 py-1' id='role_permission' onChange={(e) => {
                                setSelectedRolePermissions(prev => {
                                    const permissionExists = prev.find(p => p === e.target.value)
                                    if (permissionExists) return prev
                                    return [...prev, e.target.value]
                                })
                            }}  >
                                <option value=''>Select Permissions</option>
                                {
                                    permissions.map(p => <option value={p.permission}>{p.permission.split("_").join(" ")}</option>)
                                }
                            </select>
                        </div>

                        {
                            selectedRolePermissions.length > 0 && <div className='bg-white py-3 drop-shadow-lg w-full flex-wrap  rounded-md px-2   flex gap-2 items-center'>
                                {
                                    selectedRolePermissions.map(p =>
                                        <div key={p} className='flex gap-2  items-center text-sm bg-gray-200 px-2 py-1 rounded-2xl' >
                                            <strong>{p.split("_").join(" ")}</strong>
                                            <button className='cursor-pointer justify-center items-center flex  bg-white rounded-full drop-shadow-2xl size-5 font-bold'
                                                onClick={() => {
                                                    setSelectedRolePermissions(prev => prev.filter(per => per !== p))
                                                }} >X</button>
                                        </div>
                                    )
                                }
                            </div>
                        }
                        <button type='submit'
                            className='flex mx-auto min-w-1/2 my-5 justify-center items-center bg-blue-700 text-white cursor-pointer  px-4 py-1.5 rounded-xl '>Save</button>
                    </form>
                </Modal>
            }

        </>

    )
}
