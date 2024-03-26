import { Outlet } from "react-router"
import { useContext } from "react";
import { User } from "./App";

const ProtectedRoutes = () => {

  const {user} = useContext(User)
  const changeURL = () => {
    window.location.href = '/auth/signin'
  }

  return (
    user ? <Outlet /> : changeURL()
  )
}

export default ProtectedRoutes;