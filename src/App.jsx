import React from "react"
import {Route, Routes} from 'react-router-dom'
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Nav } from "./pages/Nav"
import { useSelector } from "react-redux"
import { MoreInformation } from "./pages/MoreInformation"
import { EditPage } from "./pages/EditPage"
function App() {
  let {username} = useSelector((state) => state.user);
  return (
    <div className="">
      <Nav />
        <Routes>
          {username ? <Route path="/" element={<Home />} /> : <Route path="/" element={<Login />} />}
          {!username ? <Route path="/login" element={<Login />} /> : <Route path="/login" element={<Home />} />}
          {!username ? <Route path="/register" element={<Register />} /> : <Route path="/register" element={<Home />} />}
          {!username ? <Route path="/more/:id" element={<Register />} /> : <Route path="/more/:id" element={<MoreInformation />} />}
          {!username ? <Route path="/edit/:id/:Amount/:ExpenseText" element={<Register />} /> : <Route path="/edit/:id/:Amount/:ExpenseText" element={<EditPage />} />}
        </Routes>
    </div>
  )
}

export default App
