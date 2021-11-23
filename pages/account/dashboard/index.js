import React,{useState} from "react"
import {ChurchLayout} from '../../../components/layout'
import {Row,Col, Button} from 'antd'
import Analytics,{DonutChart} from '../../../components/dashboard'
import WithAuth from '../../../components/hoc/WithAth'

const Index = ()=>{
    const [open, setOpen] = useState(false)

    return(
        <ChurchLayout pageTitle="Analytics">
            <Row  gutter={20} wrap>
                <Col md={12}>
                    <DonutChart />
                </Col>
                <Col md={12}>
                    <Analytics />
                </Col>
            </Row>
            
        </ChurchLayout>
    )
}

export default WithAuth(Index)