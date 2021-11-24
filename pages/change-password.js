import React from "react";
import { Button,Card } from "antd";
import ChangePassword from '../components/auth/changePassword'
import AuthLayout from '../components/layout/auth'

const Index = ()=>{

    return(
       <AuthLayout>
           <ChangePassword />
       </AuthLayout>
    )
}

export default Index