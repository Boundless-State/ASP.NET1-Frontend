import React from 'react';
import { Navigate } from 'react-router-dom';
import { AdminRoute, ProtectedRoute } from './ProtectedRoutes'

import PortalLayout from '../pages/layouts/PortalLayout'
import CenterScreenLayout from '../pages/layouts/CenterScreenLayout'

import SignIn from '../pages/SignIn'
import Projects from '../pages/Projects'
import Members from '../pages/Members'
import Clients from '../pages/Clients'

//Här lånade jag av ditt projekt med lite ändringar

const routesConfig = [
  {
    element: <CenterScreenLayout />,
    children: [
      { path: "/auth/signin", element: <SignIn /> },
      { path: "/", element: <Navigate to="/auth/signin" replace /> }
    ]
  },
  {
    element: (
      <ProtectedRoute>
        <PortalLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/admin/projects", element: <Projects /> },
      { path: "/admin/members", element: <AdminRoute><Members /></AdminRoute> },
      { path: "/admin/clients", element: <AdminRoute><Clients /></AdminRoute> },
      { path: "*", element: <Navigate to="/admin/projects" replace /> }
    ]
  },
  

]

export default routesConfig;