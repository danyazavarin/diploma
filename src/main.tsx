import React from 'react'
import ReactDOM from 'react-dom/client'
import { appRouter } from './appRouter.tsx'
import { RouterProvider } from 'react-router-dom';
import './main.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={appRouter}/>
  </React.StrictMode>
)
