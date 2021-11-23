import { Modal,Form,Select, Button,Switch, message,Input } from 'antd'
import React from 'react'
import {CREATE_CHURCH_ADMIN, GET_ALL_CHURCH_ADMIN } from '../../graphql/Manager'
import {GET_ALL_MEMBER} from '../../graphql/Member'
import { useMutation,useQuery } from '@apollo/client'

const {Item} = Form
const Index = ({open,onClose=()=>{},id})=>{

const [form] = Form.useForm()

const {data, loading:loadingMembers} = useQuery(GET_ALL_MEMBER)
const members = data?.getAllMember?.map(({firstName,lastName,id})=>({label:firstName+' '+lastName, value:id}))

    const [createChurchAdmin,{loading}] = useMutation(CREATE_CHURCH_ADMIN,{
        update(cache,{data}){
            const newEntry = {...data?.createChurchAdmin?.data}
            const existingEntry = cache.readQuery({query:GET_ALL_CHURCH_ADMIN})
            if(newEntry && existingEntry){
                cache.writeQuery({
                    query:GET_ALL_CHURCH_ADMIN,
                    data:{
                        getAllChurchAdmin:[...existingEntry.getAllChurchAdmin,newEntry]
                    }
                })
            }
        },
        onCompleted({createChurchAdmin}){
            if(createChurchAdmin.status){
                message.success(createChurchAdmin.message)
                form.resetFields()
                onClose()
            }else{
                message.error(createChurchAdmin.message)
            }
        }
    })


    return(
        <Modal width={400} visible={open} 
            title="Create Admin" footer={null}
            onCancel={()=>onClose()}>
                <Form form={form} layout="vertical" requiredMark={false}
                 onFinish={(e)=>createChurchAdmin({variables:e})}>
                    <Item label="User*" name="userId"
                        rules={[{message:"User is required", required:true}]}>
                      <Select placeholder="Choose a user"
                        options={members} loading={loadingMembers}/>
                    </Item>
                    <Item label="Role*" name="role"
                        rules={[{message:"Role is required", required:true}]}>
                      <Select placeholder="Choose role"
                        options={[
                            {label:"Admin",value:"ADMIN"},
                            {label:"Cell Manager",value:"CELL_MANAGER"},
                            {label:"Finance",value:"FINANCE"},
                            {label:"Foundation School",value:"FOUNDATION_SCHOOL"},
                            {label:"Media",value:"MEDIA"},
                            ]}/>
                    </Item>
                    <Item>
                        <Button loading={loading} type="primary" htmlType="submit">Save</Button>
                    </Item>
                </Form>
        </Modal>
    )
}

export default Index


const SwitchWrapper = ({label, ...rest})=>{

    return(
        <>
        <div className="sw">
            <span>{label}:</span>
            <Switch {...rest}/>
        </div>
        <style jsx>{`
            .sw{
                display:flex;
                justify-content:space-between;
            }
        `}</style>
        </>
    )
}