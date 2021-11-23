import React,{useState} from 'react'
import {Button, Divider, Dropdown,Menu,message,Popconfirm } from 'antd'
import UpdateManager from './AssignCellLeader'
import {GET_ALL_CHURCH_ADMIN,DELETE_ADMIN} from '../../graphql/Manager'
import { useMutation, useQuery } from '@apollo/client'
import CreateAdmin from './CreateAdmin'
import ChangeRole from './ChangeRole'

const key = 'updatable';



const Index = ()=>{
const [open,setOpen] = useState({
    add:false,
    update:false,
    role:false
})

const [info, setInfo] = useState({
    id:0,
    role:''
})

const {data,loading,refetch} = useQuery(GET_ALL_CHURCH_ADMIN)



    return(
        <>
        <div style={{display:"flex",
            width:600,
             justifyContent:"space-between", marginBottom:40}}>
            <h3 style={{marginBottom:30}}>Account Managers</h3>
            <Button type="primary" onClick={()=>setOpen({...open,add:true})}>Add New</Button>
             </div>
        <ul>
            {
                data?.getAllChurchAdmin?.map(({member,role,status},i)=>(
                    <ListItem key={i} changeRole={()=>{
                        setInfo({role,id:member?.id})
                        setOpen({...open,role:true})
                    }} refetch={()=>refetch()} status={status} id={member?.id} name={member?.firstName+' '+member?.lastName} role={role} email={member?.email} onClick={()=>setOpen(true)}/>
                ))
            }
        </ul>
        <CreateAdmin open={open.add} onClose={()=>setOpen({...open,add:false})}/>
        <ChangeRole role={info?.role} id={info?.id} open={open.role} onClose={()=>setOpen({...open,role:false})}/>
        
        <style jsx>{`
            ul{
                list-style-type:none;
                padding:0;
                width:600px;
            }
        `}</style>
        </>
    )
}

export default Index


const {Item} = Menu
const ListItem = ({name,email,status,role,id,refetch=()=>{}, changeRole=()=>{}})=>{

    const [deleteAdmin] = useMutation(DELETE_ADMIN,{
        onCompleted({deleteAdmin}){
            if(deleteAdmin.status){
                message.success({ content: deleteAdmin.message, key, duration: 2 });
                refetch()
            }
        }
    })

    return(
        <>
        <li className="item-wrapper">
            <div>
                <div style={{fontSize:16, lineHeight:1, display:"flex", gap:10}}>
                    {name} <span className={`status ${
                        status == "ACTIVATED" ? 'status-success':
                        status == "PENDING" ? 'status-error':'status-inactive'
                    }`}>{status}</span><span className="status status-shade1">{role}</span>
                </div>
                <span className="text-muted">{email}</span>
            </div>
            <Dropdown
                overlay={(
                    <Menu>
                        <Item onClick={()=>changeRole(id)}>Change Role</Item>
                       <Menu.Divider/>
                       <Item><Popconfirm 
                            onConfirm={()=>{
                                message.loading({ content: 'Deleting...', key });
                                deleteAdmin({variables:{id}})
                            }}
                            title={`Delete ${name}?`}>Delete</Popconfirm>
                        </Item>
                        {/* <Item><Popconfirm
                            title={`Reset ${name}?`}>Reset</Popconfirm>
                        </Item> */}
                    </Menu>
                )}><Button type="link">Change</Button></Dropdown></li>
        <Divider />
        <style jsx>{`
            .item-wrapper{
                display:flex;
                justify-content:space-between;
                align-items:center;
            }

            .item-wrapper div p{
                margin:0;
            }

            .item-wrapper div span{
                display:block;
            }
        `}</style>
        </>
    )
}