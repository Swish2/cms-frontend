import React from 'react'
import {Modal,Button,Form,Input,Select,TimePicker, message} from 'antd'
import {CREATE_CELL, GET_ALL_CELL} from '../../graphql/Cell'
import { useMutation } from '@apollo/client'


const {Item} = Form
const CreateCell = ({role, cellId, visible,setClose=()=>{}})=>{

const [createCell,{loading}] = useMutation(CREATE_CELL,{
    update(cache,{data}){
        const newEntry = {...data?.createCell?.data}
        newEntry.leader = null
        newEntry.totalMembers = 0
        const existingEntry = cache.readQuery({query:GET_ALL_CELL})
        if(newEntry && existingEntry){
            cache.writeQuery({
                query:GET_ALL_CELL,
                data:{
                    getAllCell:[...existingEntry.getAllCell,newEntry]
                }
            })
        }
    },
    onCompleted({createCell}){
        if(createCell?.status){
            message.success(createCell.message)
            setClose()
        }else{
            message.error(createCell.message)
        }
    }
})

    return(
        <Modal title="Create Cell" visible={visible} onCancel={()=>setClose()} width={400} footer={null}>
            <Form layout="vertical" requiredMark={false} onFinish={(e)=>createCell({variables:e})}>
                <Item label="Cell Name" name="name"
                    rules={[{message:"Cell Name is required", required:true}]}>
                    <Input type="text" placeholder="Enter cell name"/>
                </Item>
                <Item label="Meeting Address / Meeting Credentials*" name="address"
                    rules={[{message:"Cell meeting address is required", required:true}]}>
                    <Input.TextArea type="text" placeholder="Enter meeting address"/>
                </Item>
                <Item label="Meeting Day*" name="meetingDay"
                    rules={[{message:"Cell meeting day is required", required:true}]}>
                    <Select options={[
                        {label:"Sunday",value:"SUNDAY"},
                        {label:"Monday",value:"MONDAY"},
                        {label:"Wednessday",value:"WEDNESSDAY"},
                        {label:"Thursday",value:"THURSDAY"},
                        {label:"Friday",value:"FRIDAY"},
                        {label:"Saturday",value:"SATURDAY"},
                    ]}
                        placeholder="Enter cell meeting day"/>
                </Item>
                <Item label="Meeting Time*" name="meetingTime"
                    rules={[{message:"Cell meeting time is required", required:true}]}>
                    <TimePicker
                     placeholder="Enter cell meeting time"/>
                </Item>
                <Item label="Meeting Type*" name="type"
                    rules={[{message:"Cell meeting type is required", required:true}]}>
                    <Select options={[
                        {label:"Online",value:"ONLINE"},
                        {label:"Onsite",value:"ONSITE"},
                        {label:"Mix",value:"MIX"},
                    ]}
                        placeholder="Enter cell meeting type"/>
                </Item>
                <Item>
                    <Button type="primary" loading={loading} htmlType="submit" block>Add Cell</Button>
                </Item>
            </Form>
        </Modal>
    )
}

export default CreateCell