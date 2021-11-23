import React,{useEffect} from 'react'
import {Modal,Button,Form,Input,Select, message, TimePicker} from 'antd'
import {UPDATE_CELL, GET_ALL_CELL,GET_CELL_BY_ID} from '../../graphql/Cell'
import { useLazyQuery, useMutation,useQuery } from '@apollo/client'
import moment from 'moment'

const {Item} = Form
const UpdateCell = ({visible,setClose=()=>{},id})=>{
    const [form] = Form.useForm()
    const [getCellById] = useLazyQuery(GET_CELL_BY_ID,{
        onCompleted({getCellById}){
            form.setFieldsValue({
                id:getCellById?.id,
                name:getCellById?.name,
                address:getCellById?.address,
                meetingDay:getCellById?.meetingDay,
                meetingTime:moment(getCellById?.meetingTime,'HH:mm'),
                type:getCellById?.type
            })
        }
    })
 

const [updateCell,{loading}] = useMutation(UPDATE_CELL,{
    update(cache,{data}){
        const existingEntry = cache.readQuery({query:GET_ALL_CELL})
        const newEntry = data?.updateCell?.data
        if(newEntry && existingEntry){
            const index = existingEntry?.getAllCell?.findIndex(el=>el.id == id)

            let cacheData = JSON.parse(JSON.stringify(existingEntry?.getAllCell))

            cacheData[index].name = newEntry.name
            cacheData[index].type = newEntry.type
            cacheData[index].address = newEntry.address
            cacheData[index].meetingDay = newEntry.meetingDay
            cacheData[index].meetingTime = newEntry.meetingTime

            cache.writeQuery({
                query:GET_ALL_CELL,
                data:{
                    getAllCell:cacheData
                }
            })
        }
    },
    onCompleted({updateCell}){
        if(updateCell?.status){
            message.success(updateCell.message)
            setClose()
        }else{
            message.error(updateCell.message)
        }
    }
})

useEffect(()=>{
    if(id){
        getCellById({variables:{id:parseInt(id)}})
    }
},[id])

    return(
        <Modal title="Update Cell" visible={visible} onCancel={()=>setClose()} width={400} footer={null}>
            <Form layout="vertical" form={form} requiredMark={false} 
                onFinish={(e)=>updateCell({variables:{id:parseInt(id),...e}})}>
                <Item label="Cell Name*" name="name"
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
                    <TimePicker format="HH:mm"
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
                    <Button type="primary" loading={loading} htmlType="submit" block>Update Cell</Button>
                </Item>
            </Form>
        </Modal>
    )
}

export default UpdateCell