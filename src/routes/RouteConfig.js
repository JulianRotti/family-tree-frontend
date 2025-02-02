import { lazy } from 'react';
import { FiHome, FiUsers } from 'react-icons/fi';
import { FaTree } from 'react-icons/fa';  // Import the tree icon

// Centralized route configuration
const routes = [
  {
    name: 'Home',
    path: '/',
    icon: FiHome,
    component: lazy(() => import('../pages/HomePage.js')),  // HomePage.js at "/"
    role: 'public',
  },
  {
    name: 'Familienmitglieder verwalten',
    path: '/manage-members',
    icon: FiUsers,
    component: lazy(() => import('../pages/ManageMembers.js')),  // ManageMembers.js at "/manage-members"
    role: 'editor',
  },
  {
    name: 'Stammbaum',
    path: '/family-tree',
    icon: FaTree,
    component: lazy(() => import('../pages/FamilyTree.js')),
    role: 'viewer',
  },
  {
    name: 'Kein Zugriff auf diese Seite',
    path: '/no-access',
    icon: null,
    component: lazy(() => import('../pages/NoAccess.js')),
    role: 'public',
    hidden: true,
  },
];

export default routes;
