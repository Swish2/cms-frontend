import React from "react"
import {Form,Input,Button, message} from 'antd'
import {CHANGE_ADMIN_PASSWORD} from '../../graphql/Manager'
import { useMutation } from "@apollo/client"

const {Item} = Form
const Index = ()=>{

    const [form] = Form.useForm()

    const [changeAdminPassword,{loading}] = useMutation(CHANGE_ADMIN_PASSWORD,{
        onCompleted({changeAdminPassword}){
            if(changeAdminPassword.status){
                form.resetFields()
                message.success(changeAdminPassword.message)
            }else{
                message.error(changeAdminPassword.message)
            }
        }
    })

    return(
        <>
        <div className="wrapper">
            <h3 style={{marginBottom:30}}>Change Password</h3>
            <Form layout="vertical" form={form} 
                requiredMark={false} onFinish={(e)=>changeAdminPassword({variables:e})}>
                <Item label="Current Password" name="currentPassword" 
                    rules={[{message:"Current Password is required", required:true}]}>
                    <Input.Password  placeholder="*******"/>
                </Item>
                <Item label="New Password" name="password"
                    rules={[{message:"You must enter new password",required:true}]}>
                    <Input.Password  placeholder="*******"/>
                </Item>
                <Item>
                    <Button loading={loading} htmlType="submit" type="primary">Change Password</Button>
                </Item>
            </Form>
        </div>
        <style jsx>{`
            .wrapper{
                border-radius:8px;
                padding:10px;
                width:400px;
            }
        `}</style>
        </>
    )
}

export default Index