import { createBrowserRouter } from 'react-router'

import DefaultLayout from './layouts/DefaultLayout'

import HomePage from './pages/HomePage'

export const routes = createBrowserRouter([
  {
    path: "",
    Component: DefaultLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      }
    ]
  }
])