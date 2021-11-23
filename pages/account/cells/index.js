import React,{useState} from "react"
import {ChurchLayout} from '../../../components/layout'
import {PageTitle} from '../../../components/utils'
import {Row,Col, Button} from 'antd'
import CellList from '../../../components/account/cellList'
import CreateCell from '../../../components/account/CreateCell'
import WithAuth from "../../../components/hoc/WithAth"
import Router from "next/router"

const Index = ({role,cellId})=>{
    const [modal, setModal] = useState({
        add:false
    })

    if(role != "ADMIN"){
        Router.replace('/account/adm/dashboard')
    }

    return(
        <ChurchLayout pageTitle="Cells">
            <Row justify="end" style={{marginBottom:20}}>
                <Col>
                   <Button onClick={()=>setModal({...modal,add:true})} type="primary">Add Cell</Button>
                </Col>
            </Row>
            <CellList />
            <CreateCell role={role} cellId={cellId} visible={modal.add} setClose={()=>setModal({...modal,add:false})}/>
        </ChurchLayout>
    )
}

export default WithAuth(Index)