import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from './app/store'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./scss/main.scss"
import Hompage from './page/Hompage'
import Login from './page/Login';
import SignUp from './page/SignUp';
import ProtectedRoute from './router/ProtectedRoute';
import AllProduct from './page/AllProduct';
import UpdateProduct from './page/UpdateProduct';
//  tạo router 

let router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute>
      <Hompage/>
    </ProtectedRoute>,
     children: [ // Các route con
      { path: "/products", element: <ProtectedRoute><AllProduct/></ProtectedRoute> }, 
      { path: "/update-product/:id", element: <ProtectedRoute><UpdateProduct/></ProtectedRoute> }, 
    ]
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
