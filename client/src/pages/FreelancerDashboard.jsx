import React from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'



function FreelancerDashboard() {

const {logout} = useUser()
  const handleLogout = () => {
    logout();
  }
  return (
    <div>FreelancerDashboard
 
 <button onClick={handleLogout}>Logout</button>


    </div>
  )
}

export default FreelancerDashboard

