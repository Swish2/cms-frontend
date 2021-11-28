import React from "react";
import { ChurchLayout } from "../../../components/layout";
import {Row,Col} from 'antd'
import WithAuth from '../../../components/hoc/WithAth'

const Index = ()=>{

    return (
        <ChurchLayout pageTitle="Live Stream">
        <Row>
            <Col md={24} sm={24}>
                <p>No stream at the moment</p>
            </Col>
        </Row>
        
    </ChurchLayout>
    )
}

export default WithAuth(Index)