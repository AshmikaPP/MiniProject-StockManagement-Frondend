import React from 'react'
import Register from './pages/Signup'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Userroute from './routes/Userroute'
import { Provider } from 'react-redux';
import { store } from "./Store.jsx";
const App = () => {
  return (
    <>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Userroute />} />
      </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
