import React from "react";
import { Button,Card } from "antd";
import ChurchLogin from '../components/auth/ChurchLogin'


const Index = ()=>{

    return(
       <div className="container">
           <ChurchLogin />
           <p className="text-muted">Product of CELZ3 IT &amp; Data Service Department</p>
       </div>
    )
}

export default Index