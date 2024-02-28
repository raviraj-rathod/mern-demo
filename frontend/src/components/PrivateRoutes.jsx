import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {

    let isAuthanticate = localStorage.getItem('token');
    return(
      isAuthanticate ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes