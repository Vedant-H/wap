import React from 'react'
import { useNavigate, useParams } from 'react-router';
import { Button } from '../components/ui/button';
const HomePage = () => {
const navigate = useNavigate();
const params = useParams();
const user_id = localStorage.getItem("user_id");
console.log(user_id);

return (
    <>
    
    <div>HomePage</div>
    <Button type="submit" onClick={()=>{navigate(`/dashboard/${user_id}`)}}>
      Dashboard
    </Button>
    </>
    
  )
}

export default HomePage