import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import AddDetails from "./components/AddDetails"
import EditDetails from "./components/EditDetails"
import Home from "./components/Home"


function App() {
  return <>
    <BrowserRouter>
      <div>
        <NavBar />
      </div>
      <div className="container-fluid">
        <Routes>
          <Route path="/create" element={<AddDetails />} />
          <Route path="/users/:id" element={<EditDetails />} />
          <Route path="/" element={<Home />} />
          <Route path="*/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  </>
}

export default App