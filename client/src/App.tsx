// import './App.css';
import Login from './auth/Login';
import Signup from './auth/Signup';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ForgetPassword from './auth/ForgetPassword';
import ResetPassword from './auth/ResetPassword';
import VerifyEmail from './auth/VerifyEmail';
import Navbar from './components/navbar';
import Herosection from './components/Herosection';
import MainLayout from './layout/MainLayout';
import Profile from './components/Profile';
import SearchPage from './components/SearchPage';
import RestaurantDetatil from './components/RestaurantDetatil';
import Cart from './components/Cart';
import Restaurant from './admin/Restaurant';
import AddMenu from './admin/AddMenu';
import EditMenu from './admin/EditMenu';
import Orders from './admin/Orders';
import Success from './components/Success';


const appRouter = createBrowserRouter([

  {
    path: "/",
    element: <MainLayout />,
    children:[{
      path: "/",
      element:<Herosection/>
    },
    {
      path: "/profile",
      element: <Profile/>
    },
    {
      path: "/search/:text",
      element:<SearchPage/>
    },
    {
      path: "/restaurant/:id",
      element:<RestaurantDetatil/>
    },
    {
      path: "/cart",
      element:<Cart/>
    },
    {
      path: "/order/status",
      element:<Success/>
    },

    // ADMIN START 
    {
      path: "/admin/restaurant",
      element:<Restaurant/>
    },
    {
      path: "/admin/menu",
      element:<AddMenu/>
    },
    // {
    //   path: "/admin/editmenu",
    //   element:<EditMenu/>
    // },

    {
      path: "/admin/orders",
      element:<Orders/>
    },
 
  ]

  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/ForgetPassword",
    element: <ForgetPassword />
  },

  {
    path: "/ResetPassword",
    element: <ResetPassword />
  },

  {
    path: "/VerifyEmail",
    element: <VerifyEmail />
  },

  {
    path: "/Navbar",
    element: <Navbar />
  },
 
])

function App() {


  return (
    <>
      <main>

        <RouterProvider router={appRouter}>

        </RouterProvider>
      </main>
    </>
  )
}

export default App
