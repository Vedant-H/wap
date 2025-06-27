import React from 'react'
import { useNavigate, useParams } from 'react-router';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
const HomePage = () => {
const navigate = useNavigate();
const params = useParams();
const {login, register, isAuthenticated, isLoading,user,token} = useAuth();

return (
    <>
    
    <div>HomePage</div>
    <Button type="submit" onClick={()=>{navigate(`/dashboard/${user.id}`)}}>
      Dashboard
    </Button>
    </>
    
  )
}

export default HomePage