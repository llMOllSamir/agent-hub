import { useContext, useMemo, useState } from 'react'
import DataTable, { TableColumn, TableStyles } from 'react-data-table-component'
import { permissionsContext, Permission } from '../context/permissionsContext';
import { roleContext } from '../context/RolesContext';
import Modal from './Modal';

export default function PermissionsTable() {
    const { permissions, deletePermission, editPermission } = useContext(permissionsContext)
    const { removePermissionFromRoles, editPermissionFromRoles } = useContext(roleContext)
    const [filter, setFilter] = useState("")
    const [openModal, setOpenModal] = useState(false)
    const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null)

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
            }
        }
        ,
        pagination: {
            style: {
            }
        }

    };

    const permissionsColumns = useMemo<TableColumn<Permission>[]>(() => ([
        {
            name: 'Permission',
            cell: (row) => <strong  > {row.permission.split("_").join(" ")} </strong>,
            maxWidth: '200px',
            center: true,
            style: {
                textTransform: "capitalize",
                fontSize: '15px',
            }
        },
        {
            name: 'Description',
            cell: (row) => row.description,
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
                <button
                    onClick={() => {
                        setSelectedPermission(row)
                        setOpenModal(true)
                    }}
                    className='bg-yellow-500 text-white cursor-pointer  px-4 py-2 rounded-xl'>Edit</button>
                <button onClick={() => {
                    deletePermission(row.permission)
                    removePermissionFromRoles(row.permission)
                }} className='bg-red-500 text-white cursor-pointer  px-4 py-2 rounded-xl'>Delete</button>
            </div>,
            maxWidth: "200px",
            center: true
        }
    ]), [deletePermission, removePermissionFromRoles])

    const permissionsDisplay = useMemo<Permission[]>(() => {
        if (filter.length) return permissions.filter(p => p.permission.toLowerCase().includes(filter.replace(" ", "_").toLowerCase()))
        return permissions

    }, [permissions, filter])


    return (
        <>
            <DataTable
                columns={permissionsColumns}
                data={permissionsDisplay}
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
                openModal && selectedPermission && <Modal closeModel={() => { setOpenModal(false); setSelectedPermission(null) }}>
                    <h2 className='text-xl font-bold text-blue-800 my-4'>Edit Permission</h2>
                    <form className='max-w-[500px] w-[500px]' onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target as HTMLFormElement)
                        if (selectedPermission.permission !== formData.get("Permission") as string) {
                            editPermissionFromRoles(selectedPermission.permission, formData.get("Permission") as string)
                        }
                        editPermission({
                            title: selectedPermission.permission, permission: {
                                permission: formData.get("Permission") as string,
                                description: formData.get("description") as string,
                            }
                        })
                        setOpenModal(false)
                        setSelectedPermission(null)
                    }}>
                        <div className="flex gap-4 items-center my-5">
                            <label htmlFor="Permission" className='font-bold'>Permission Title</label>
                            <input type="text"
                                defaultValue={selectedPermission.permission.split("_").join(" ")}
                                name='Permission' required className='border border-gray-600 outline-0 rounded-md  grow px-2 py-1' id='Permission' placeholder='Enter Permission' />
                        </div>

                        <div className="flex flex-col gap-4 items-start my-5">
                            <label htmlFor="description" className='font-bold'>Role Title</label>
                            <textarea name='description' required
                                defaultValue={selectedPermission.description}
                                className='border w-full border-gray-600 outline-0 rounded-md  resize-none grow px-4 py-2'
                                id='description' placeholder='Enter description'
                                rows={4}
                            />
                        </div>
                        <button type='submit'
                            className='flex mx-auto min-w-1/2 my-5 justify-center items-center bg-blue-700 text-white cursor-pointer  px-4 py-1.5 rounded-xl '>Save</button>
                    </form>
                </Modal>}


        </>

    )
}
