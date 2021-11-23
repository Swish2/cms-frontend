import { Modal,Form,Select, Button,Switch, message,Input } from 'antd'
import React from 'react'
import {CHANGE_ADMIN_ROLE, GET_ALL_CHURCH_ADMIN } from '../../graphql/Manager'
import { useMutation } from '@apollo/client'

const {Item} = Form
const Index = ({open,onClose=()=>{},role,id})=>{

const [form] = Form.useForm()

    const [changeAdminRole,{loading}] = useMutation(CHANGE_ADMIN_ROLE,{
        update(cache,{data}){
            const newEntry = {...data?.changeAdminRole?.data}
            const existingEntry = cache.readQuery({query:GET_ALL_CHURCH_ADMIN})
            if(newEntry && existingEntry){


                const index = existingEntry?.getAllChurchAdmin?.findIndex(el=>el.member.id == newEntry.member.id)

                const allEntry = JSON.parse(JSON.stringify(existingEntry.getAllChurchAdmin))
                allEntry[index].role = newEntry.role
                cache.writeQuery({
                    query:GET_ALL_CHURCH_ADMIN,
                    data:{
                        getAllChurchAdmin:allEntry
                    }
                })
            }
        },
        onCompleted({changeAdminRole}){
            if(changeAdminRole.status){
                message.success(changeAdminRole.message)
                form.resetFields()
                onClose()
            }else{
                message.error(changeAdminRole.message)
            }
        }
    })


    return(
        <Modal width={400} visible={open} 
            title="Change Role" footer={null}
            onCancel={()=>onClose()}>
                <Form form={form} 
                layout="vertical" requiredMark={false}
                 onFinish={(e)=>changeAdminRole({variables:{...e,id:parseInt(id)}})}>
                    <Item label="Role*" name="role"
                        rules={[{message:"Role is required", required:true}]}>
                      <Select defaultValue={role} placeholder="Choose role"
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
