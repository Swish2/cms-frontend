import React,{useState} from "react"
import {ChurchLayout} from '../../../components/layout'
import {Row,Col, Button,Modal} from 'antd'
import { Filter } from "react-feather"
import MemberList from '../../../components/account/memberList'
import CreateMember from '../../../components/account/CreateMember'
import WithAuth from '../../../components/hoc/WithAth'

const Index = ({role,cellId})=>{
    const [modal, setModal] = useState({
        add:false
    })

    return(
        <ChurchLayout pageTitle="Members">
            <Row justify="end"  style={{marginBottom:20}}>
                <Col>
                   <Button onClick={()=>setModal({...modal,add:true})} type="primary">Add member</Button>
                </Col>
            </Row>
            <MemberList />
            <CreateMember role={role} cellId={cellId} visible={modal.add} setClose={()=>setModal({...modal,add:false})}/>
        </ChurchLayout>
    )
}

export default WithAuth(Index)