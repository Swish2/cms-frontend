import React,{useState} from "react"
import {ChurchLayout} from '../../../components/layout'
import {Row,Col,Card,Tabs} from 'antd'
import ChangePassword from '../../../components/account/ChangePassword'
import ManagerList from '../../../components/account/ManagerList'
import WithAuth from "../../../components/hoc/WithAth"


const {TabPane} = Tabs
const Index = ({role})=>{

    

    return(
        <ChurchLayout pageTitle="Settings">
            <Row>
                <Col sm={24}>
                    <Card>
                        <Tabs defaultActiveKey={["1"]}>
                            <TabPane tab="Account" key="1">
                                <ChangePassword />
                            </TabPane>
                            {
                                role == "ADMIN" ?
                                <TabPane tab="Managers" key="2">
                                <ManagerList />
                            </TabPane>:null
                            }
                           
                            <TabPane tab="Configurations" key="3">
                                <p>Configurations contents</p>
                            </TabPane>
                        </Tabs>

                    </Card>
                </Col>
            </Row>
        </ChurchLayout>
    )
}

export default WithAuth(Index)