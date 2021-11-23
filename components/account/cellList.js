import React,{useState} from "react";
import { Card, Table,Button,Dropdown,Menu } from "antd";
import {GET_ALL_CELL} from '../../graphql/Cell'
import { useQuery } from "@apollo/client";
import AssignCellLeader from './AssignCellLeader'
import UpdateCell from './UpdateCell'
import moment from 'moment';

const {Item} = Menu

const Index = ()=>{
    const [open, setOpen] = useState({
        assign:false,
        update:false
    })
    const [item, setItem] = useState(0)

    const {data,loading} = useQuery(GET_ALL_CELL)

    const column = [
        {
            title:"#",
            render:(_,__,i)=>i+1,
            width:'5%'
        },
        {
            title:"Name",
            dataIndex:"name",
              width: '15%'
        },
        {
            title:"Meeting Day & Time",
            render:(_,{meetingDay,meetingTime})=>meetingDay+' '+moment(meetingTime).format('HH:mm A')
        },
        {
            title:"Meeting Type",
            dataIndex:"type"
        },
        {
            title:"Meeting Address / ID",
            dataIndex:"address"
        },
        {
            title:"Leader",
            render:(_,{leader})=> leader ? leader?.firstName+' '+leader?.lastName: "NA"
        },
        {
            title:"Total Member",
            dataIndex:"totalMembers"
        },{
            render:(_,{id})=>(
                <Dropdown overlay={(
                    <Menu>
                        <Item onClick={()=>{
                            setItem(id)
                            setOpen({update:true})
                        }}>Update Info</Item>
                        <Item onClick={()=>{
                            setItem(id)
                            setOpen({assign:true})
                        }}>Change Leader</Item>
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
            <Table scroll={{x:true}} columns={column} loading={loading} dataSource={data?.getAllCell}/>
        </Card>
        <AssignCellLeader 
            open={open.assign} 
            id={item}
            onClose={()=>setOpen({assign:false})}/>
        <UpdateCell 
            visible={open.update} 
            id={item}
            setClose={()=>setOpen({update:false})}/>
        </>
    )
}


export default Index