import React,{useState} from "react"
import {ChurchLayout} from '../../../components/layout'
import {PageTitle} from '../../../components/utils'
import {Row,Col, Button,Divider,Card} from 'antd'
import Profile from '../../../components/account/profile'
import ChangePassword from '../../../components/account/ChangePassword'
import WithAuth from '../../../components/hoc/WithAth'


const Index = ()=>{
    const [open, setOpen] = useState(false)

    return(
        <ChurchLayout>
            <Row>
                <Col md={12}>
                    <PageTitle title="Profile"/>
                </Col>
               
            </Row>
           <Card>
                <Profile />
                <Divider style={{margin:"20px 0"}}/>
                <ChangePassword />
           </Card>
           
        </ChurchLayout>
    )
}

export default WithAuth(Index)