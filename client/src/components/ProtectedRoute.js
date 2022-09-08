import {useSelector} from 'react-redux'
import {Outlet,Navigate} from "react-router-dom"

function ProtectedRoute() {
    const {isAuth}=useSelector((state)=>state.user)
  return isAuth ? <Outlet/>:<Navigate to='/login'/>
}

export default ProtectedRoute