
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/signup'
import Profile from './pages/Profile'
import ChangePassword from './pages/ChangePassword'
import Dashbaord from './pages/Dashbaord'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'

function App() {


  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashbaord />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
      </Routes>
    </>
  )
}

export default App
