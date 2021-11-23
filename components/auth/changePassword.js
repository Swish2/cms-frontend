import React from 'react'
import {Row,Col,Form,Input,Card,Button,message} from 'antd'
import style from './Index.module.scss'
import { CHANGE_CHURCH__ADMIN_PASSWORD } from '../../graphql/Auth'
import { useMutation } from '@apollo/client'
import Router from 'next/router'

const {Item} = Form
const ChangePassword = ()=>{

    const [changeChurchAdminPassword,{loading}] = useMutation(CHANGE_CHURCH__ADMIN_PASSWORD,{
        onCompleted({changeChurchAdminPassword}){
            if(changeChurchAdminPassword?.status){
                
                message.success(changeChurchAdminPassword?.message)
                if(changeChurchAdminPassword?.data?.role == "ADMIN" || changeChurchAdminPassword?.data?.role == "CELL_MANAGER"){
                    Router.replace('/account/members')
                }
                         
            }else{
                message.error(changeChurchAdminPassword?.message)
            }
        },
        onError(error){
            console.log(error)
        }
    })

    return(
        
        <Card className={style.card}>
            <h3 className="page-title">Change Password</h3>
            <Form layout="vertical" requiredMark={false}
                onFinish={(e)=>changeChurchAdminPassword({variables:e})}>
                <Item label="Password" name="password"
                    rules={[{message:"Password is required",required:true}]}>
                    <Input.Password  placeholder="*******"/>
                </Item>
                <Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>Change Password</Button>
                </Item>
            </Form>
        </Card>

    )
}

export default ChangePassword