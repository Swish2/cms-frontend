import React from "react";
import Materials from '../../../components/materials'
import { ChurchLayout } from "../../../components/layout";
import {Row,Col} from 'antd'
import WithAuth from '../../../components/hoc/WithAth'

const Index = ()=>{

    return (
        <ChurchLayout pageTitle="Library">
        <Row>
            <Col md={24}>
                <Materials />
            </Col>
        </Row>
        
    </ChurchLayout>
    )
}

export default WithAuth(Index)