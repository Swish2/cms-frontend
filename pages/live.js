import React from "react";
import { Button,Card } from "antd";
import ChurchLogin from '../components/auth/ChurchLogin'
import AuthLayout from '../components/layout/auth'

const Index = ()=>{

    return(
        <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
            <iframe width="560" height="315" src="http://172.105.77.49:5080/LiveStream/play.html?name=615634133307500451422115" frameborder="0" allowfullscreen></iframe>
        </div>  
        
    )
}

export default Index