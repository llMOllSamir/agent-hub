import { createContext, useEffect, useState } from "react";




export type Roles = Record<string, {
    permissions: string[]
}>

type RoleContext = {
    roles: Roles
    addRole: (props: { title: string, permissions: string[] }) => void
    deleteRole: (title: string) => void
    editRolePermissions: (title: string, permissions: string[]) => void
    removePermissionFromRoles: (permissions: string) => void,
    editPermissionFromRoles: (title: string, permission: string) => void
}

export const roleContext = createContext<RoleContext>({
    roles: {},
    addRole: () => { },
    deleteRole: () => { },
    editRolePermissions: () => { },
    removePermissionFromRoles: () => { },
    editPermissionFromRoles: () => { }
})

export default function RoleContextProvider({ children }: { children: React.ReactNode }) {
    const [roles, setRoles] = useState<Roles>({})

    const addRole = ({ title, permissions }: { title: string, permissions: string[] }) => {
        setRoles(prev => ({ ...prev, [title]: { permissions } }))
    }

    const editRolePermissions = (title: string, permissions: string[]) => {
        if (roles[title]) {
            const fixedRoles = { ...roles }
            fixedRoles[title].permissions = permissions
            setRoles(fixedRoles)
        }
    }

    const removePermissionFromRoles = (permission: string) => {
        const fixedRoles = { ...roles }
        Object.keys(fixedRoles).forEach(title => fixedRoles[title].permissions = fixedRoles[title].permissions.filter(p => p !== permission))
        setRoles(fixedRoles)
    }

    const editPermissionFromRoles = (title: string, permission: string) => {
        const fixedRoles = { ...roles }
        Object.keys(fixedRoles).forEach(key => {
            fixedRoles[key].permissions = fixedRoles[key].permissions.map(p => p === title ? permission.split(" ").join("_") : p)
        })
        setRoles(fixedRoles)
    }

    const deleteRole = (title: string) => {
        if (roles[title]) {
            const fixedRoles = { ...roles }
            delete fixedRoles[title]
            setRoles(fixedRoles)
        }
    }



    useEffect(() => {
        fetch("/rolesData.json")
            .then((response) => response.json())
            .then((data) => setRoles(data))
            .catch((error) => console.error("Error loading agents:", error));
        ;
    }, []);

    return (
        <roleContext.Provider value={{
            roles, addRole, deleteRole, editRolePermissions, removePermissionFromRoles, editPermissionFromRoles
        }}>
            {children}
        </roleContext.Provider>
    )
}