import React from "react";
import { Button,Card } from "antd";
import ChurchLogin from '../components/auth/ChurchLogin'
import AuthLayout from '../components/layout/auth'

const Index = ()=>{

    return(
       <AuthLayout>
           <ChurchLogin />
        </AuthLayout>
    )
}

export default Index