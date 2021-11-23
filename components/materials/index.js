import { Card,Tabs } from "antd"
import React from "react"
import PdfList from "./PdfList"

const {TabPane} = Tabs
const Materials = ()=>{

    return(
        <Card>
            <Tabs defaultActiveKey="pdf">
                <TabPane tab="PDF" key="pdf">
                    <p>There is no pdf for now</p>
                </TabPane>
                <TabPane tab="AUDIO" key="audio">
                    <p>There is no audio for now</p>
                </TabPane>
                <TabPane tab="VIDEO" key="video">
                    <p>There is no video for now</p>
                </TabPane>
                </Tabs>
            
        </Card>
        
    )
}

export default Materials