import React from 'react'
import {Row,Col,Form,Input,Card,Button,message} from 'antd'
import style from './Index.module.scss'
import { LOGIN_CHURCH_ADMIN } from '../../graphql/Auth'
import { useMutation } from '@apollo/client'
import Router from 'next/router'

const {Item} = Form
const ChurchLogin = ()=>{

    const [loginChurchAdmin,{loading}] = useMutation(LOGIN_CHURCH_ADMIN,{
        onCompleted({loginChurchAdmin}){
            if(loginChurchAdmin?.status){
                localStorage.setItem("token",loginChurchAdmin?.token)
                message.success(loginChurchAdmin?.message)
                if(loginChurchAdmin?.firstTimeLogin){
                    Router.replace('/change-password')
                }else{  

                   if(loginChurchAdmin.role == "CELL_MANAGER" || loginChurchAdmin.role == "ADMIN"){
                    Router.replace('/account/members')
                    }
                    
                }
            }else{
                message.error(loginChurchAdmin?.message)
            }
        },
        onError(error){
            console.log(error)
        }
    })

    return(
        
        <Card className={style.card}>
            <h3 className="page-title">Login</h3>
            <Form layout="vertical" requiredMark={false}
                onFinish={(e)=>loginChurchAdmin({variables:e})}>
                <Item label="Email address" name="email"
                    rules={[{message:"Email is required",required:true}]}>
                    <Input type="email" placeholder="e.g mail@mail.com"/>
                </Item>
                <Item label="Password" name="password"
                    rules={[{message:"Password is required",required:true}]}>
                    <Input type="password" placeholder="*******"/>
                </Item>
                <Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>Authenticate</Button>
                </Item>
            </Form>
        </Card>

    )
}

export default ChurchLogin