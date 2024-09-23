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
// import EditMenu from './admin/EditMenu';
import Orders from './admin/Orders';
import Success from './components/Success';
import { useUserStore } from './store/useUserStore';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Loading from './components/loading';



const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {

  const { isAuthenticated, user } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />
  }
  //  children m component rehate hai Protected Routes k ander kitne bhi component rahenge
  return children;
}

const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />
  }
  return children;
}

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();

  if (!isAuthenticated) {
    return <Navigate to="login" replace />

  }
  if (!user?.admin) {
    return <Navigate to="/" replace />
  }
  return children;
}

const appRouter = createBrowserRouter([

  {
    path: "/",
    element: <ProtectedRoutes><MainLayout /></ProtectedRoutes>,
    // element: <MainLayout />,
    children: [{
      path: "/",
      element: <Herosection />
    },
    {
      path: "/profile",
      element: <Profile />
    },
    {
      path: "/search/:text",
      element: <SearchPage />
    },
    {
      path: "/restaurant/:id",
      element: <RestaurantDetatil />
    },
    {
      path: "/cart",
      element: <Cart />
    },
    {
      path: "/order/status",
      element: <Success />
    },

    // ADMIN START 
    {
      path: "/admin/restaurant",
      element: <AdminRoute> <Restaurant /></AdminRoute>
    },
    {
      path: "/admin/menu",
      element: <AdminRoute> <AddMenu /></AdminRoute>
    },
    // {
    //   path: "/admin/editmenu",
    //   element:<EditMenu/>
    // },

    {
      path: "/admin/orders",
      element: <AdminRoute> <Orders /></AdminRoute>
    },

    ]

  },
  {
    path: "/login",
    element: <AuthenticatedUser> <Login /></AuthenticatedUser>,
    // element:  <Login/> ,
  },
  {
    path: "/signup",
    element: <AuthenticatedUser><Signup /></AuthenticatedUser>,
    // element:  <Signup/> ,
  },
  {
    path: "/ForgetPassword",
    element: <AuthenticatedUser>   <ForgetPassword /></AuthenticatedUser>,
  },

  {
    path: "/ResetPassword",
    element: <ResetPassword />,
  },

  {
    path: "/VerifyEmail",
    element: <VerifyEmail />,
  },

  {
    path: "/Navbar",
    element: <Navbar />,
  },

])

function App() {

  // jab bhi checkingauthentication m kuj  chnge hoga tb tb chlega uski ischeckingAuth check hogi
  //checking auth everytime when page is load
  const { checkAuthentication, isCheckingAuth } = useUserStore();
  useEffect(() => {

    checkAuthentication();

  }, [checkAuthentication])

  if (isCheckingAuth) return <Loading />
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
