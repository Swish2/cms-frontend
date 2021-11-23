import React,{useState} from "react";
import { Card, Table,Dropdown,Menu,Button } from "antd";
import {GET_ALL_MEMBER} from '../../graphql/Member'
import { useQuery } from "@apollo/client";
import UpdateMember from "./UpdateMember";

const {Item} = Menu
const Index = ({list=[]})=>{
    const [open,setOpen] = useState(false)
    const [id, setId] = useState(0)

    const {data,loading} = useQuery(GET_ALL_MEMBER)

    const column = [
        {
            title:"#",
            render:(_,__,i)=>i+1,
            width:'5%'
        },
        {
            title:"Title",
            dataIndex:"title",
            filters: [
                { text: 'Brother', value: 'BROTHER' },
                { text: 'Sister', value: 'SISTER' },
                { text: 'Deacon', value: 'DEACON' },
                { text: 'Deaconness', value: 'DEACONNESS' }
              ],
              width: '15%'
        },
        {
            title:"Full Name",
            render:(_,{firstName,lastName})=>firstName+' '+lastName
        },
        {
            title:"Phone",
            dataIndex:"phone"
        },
        {
            title:"Email",
            dataIndex:"email"
        },
        {
            title:"Gender",
            dataIndex:"gender"
        },
        {
            title:"Cell",
            render:(_,{cell})=>cell?.name || 'NA'
        },
        ,{
            render:(_,{id})=>(
                <Dropdown overlay={(
                    <Menu>
                        <Item onClick={()=>{
                            setId(id)
                            setOpen(true)
                        }}>Update Info</Item>
                    </Menu>
                )}>
                    <Button type="link">Edit</Button>
                </Dropdown>
            )
        }
    ]

    return(
        <>
        <Card>
            <Table scroll={{x:true}} rowKey="id" columns={column} loading={loading} dataSource={data?.getAllMember}/>
        </Card>
        <UpdateMember visible={open} setClose={()=>setOpen(false)} id={id}/>
        </>
    )
}


export default Index