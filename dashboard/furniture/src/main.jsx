import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from './page/HomePage'
import About from './page/About'
import { Provider } from "react-redux"
import { store } from './app/store'
//  tạo router 

let router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/about',
    element: <About />
  }
])
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
)
