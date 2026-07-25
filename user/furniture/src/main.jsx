import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from './app/store'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./scss/main.scss"
import Hompage from './page/Hompage'
import Detail from './page/Detail';
import Cart from './page/Cart';
import CheckOut from './page/CheckOut';
import ProtectedRoute from './router/ProtectedRoute';
import Login from './page/Login';
import SignUp from './page/SignUp';
//  tạo router 

let router = createBrowserRouter([
  {
    path: '/',
    element: <Hompage />
  },
  {
    path: "/detail/:id",
    element: <Detail />
  },
  {
    path: "/cart",
    element: <Cart />
  },
  {
    path: "/checkout",
    element: <ProtectedRoute><CheckOut /></ProtectedRoute>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <SignUp />
  }
])
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
)
