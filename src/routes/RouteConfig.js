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
  },
  {
    name: 'Manage Members',
    path: '/manage-members',
    icon: FiUsers,
    component: lazy(() => import('../pages/ManageMembers.js')),  // ManageMembers.js at "/manage-members"
  },
  {
    name: 'Family Tree',
    path: '/family-tree',
    icon: FaTree,
    component: lazy(() => import('../pages/FamilyTree.js')),
  },
];

export default routes;
