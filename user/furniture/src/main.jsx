import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from './app/store'
import "./scss/main.scss"
import Hompage from './page/Hompage'
//  tạo router 

let router = createBrowserRouter([
  {
    path: '/',
    element: <Hompage />
  }
])
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
)
