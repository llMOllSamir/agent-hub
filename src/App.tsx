import './App.css'
import ProtectedRoutes from './utils/ProtectedRoutes'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import HomeLayout from './pages/HomeLayout'
import AdminDashboardLayout from './pages/admin/AdminDashboardLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AgentsContextProvider from './context/AgentsContext'
import Agents from './pages/admin/user managemnet/Agents'
import AgentDetails from './pages/admin/user managemnet/AgentDetails'
import SystemManagement from './pages/SystemManagement'
import UserManagement from './pages/admin/user managemnet/UserManagement'
import RoleManagement from './pages/admin/user managemnet/RoleManagement'
import KPIs from './pages/admin/performance/KPIs'
import EvaluationForms from './pages/admin/performance/EvaluationForms'
import Reports from './pages/admin/analytics/Reports'
import Statistical from './pages/admin/analytics/Statistical'
import CallDetails from './pages/admin/interactions/CallDetailes'
import InteractionsSettings from './pages/admin/interactions/InteractionsSettings'
import InteractionSearch from './pages/admin/interactions/InteractionSearch'
import InteractionAnalysis from './pages/admin/interactions/InteractionAnalysis'
import RoleContextProvider from './context/RolesContext'
import PermissionsContextProvider from './context/permissionsContext'
import CallsContextProvider from './context/callsContext'


function App() {


  const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    {
      path: "/", element: <ProtectedRoutes   ><Outlet /></ProtectedRoutes>, children: [
        {
          path: "/", element: <HomeLayout />, children: [ // agents dashboard
            { index: true, element: <h1>Hello From Dashboard</h1> }
          ]
        },
        {
          path: "/admin", element: <AdminDashboardLayout />, children: [ // admin dashboard
            { index: true, element: <AdminDashboard /> },
            { path: "system-management", element: <SystemManagement /> },
            {
              path: "user-management",
              children: [
                { path: "user-management", element: <UserManagement /> },
                { path: "role-management", element: <RoleManagement /> },
                {
                  path: "agents", element: <Outlet />, children: [
                    { index: true, element: <Agents /> },
                    { path: ":id", element: <AgentDetails /> },
                  ]
                },
              ]
            },
            {
              path: "interactions",
              children: [
                { path: "interactions-settings", element: <InteractionsSettings /> },
                { path: "interaction-search", element: <InteractionSearch /> },
                { path: "interaction-analysis", element: <InteractionAnalysis /> },
                { path: ":callTagId", element: <CallDetails /> }
              ]
            },
            {
              path: "performance-management",
              children: [
                { path: "kpis", element: <KPIs /> },
                { path: "evaluation-forms", element: <EvaluationForms /> },
              ]
            },
            {
              path: "analytics",
              children: [
                { path: "reports", element: <Reports /> },
                { path: "statistical", element: <Statistical /> },
              ]
            }
          ]
        },
        { path: "*", element: <h1>404</h1> }

      ]
    },

  ])

  return (
    <>
      <AgentsContextProvider>
        <RoleContextProvider>
          <PermissionsContextProvider>
            <CallsContextProvider>
              <RouterProvider router={router} />
            </CallsContextProvider>
          </PermissionsContextProvider>
        </RoleContextProvider>
      </AgentsContextProvider>
    </>
  )
}

export default App
