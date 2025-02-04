import { createContext, useEffect, useState } from "react";


export type Permission = {
    permission: string
    description: string
}

type PermissionsContext = {
    permissions: Permission[],
    deletePermission: (permission: string) => void,
    addPermission: (permission: Permission) => void,
    editPermission: (props: { title: string, permission: Permission }) => void
}

export const permissionsContext = createContext<PermissionsContext>({
    permissions: [],
    deletePermission: () => { },
    addPermission: () => { },
    editPermission: () => { },
})


export default function PermissionsContextProvider({ children }: { children: React.ReactNode }) {
    const [permissions, setPermissions] = useState<Permission[]>([])


    const addPermission = ({ permission, description }: Permission) => {
        const existPermission = permissions.find(p => p.permission.toLowerCase() === permission.toLowerCase())
        if (existPermission) return
        const fixedPermission = permission.toLowerCase().split(" ").join("_")
        setPermissions((prev) => [...prev, { permission: fixedPermission, description }])
    }

    const deletePermission = (permission: string) => {
        setPermissions(prev => prev.filter(p => p.permission.toLowerCase() !== permission.toLowerCase()))
    }

    const editPermission = ({ title, permission }: { title: string, permission: Permission }) => {
        const findPermission = permissions.find(p => p.permission.toLowerCase() === title.toLowerCase())
        if (!findPermission) return
        findPermission.permission = permission.permission.split(" ").join("_")
        findPermission.description = permission.description
        setPermissions([...permissions])
    }


    useEffect(() => {
        fetch("/permisionsData.json")
            .then((response) => response.json())
            .then((data) => setPermissions(data))
            .catch((error) => console.error("Error loading agents:", error));
    }, []);

    return (
        <permissionsContext.Provider value={{ permissions, deletePermission, addPermission, editPermission }}>
            {children}
        </permissionsContext.Provider>
    )
}