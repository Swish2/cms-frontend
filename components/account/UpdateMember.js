import React,{useEffect} from 'react'
import {Modal,Button,Form,Input,Select, message,Row,Col, DatePicker} from 'antd'
import {CREATE_CELL, GET_ALL_CELL} from '../../graphql/Cell'
import {UPDATE_MEMBER,GET_ALL_MEMBER,GET_MEMBER_BY_ID} from '../../graphql/Member'
import { useMutation, useQuery,useLazyQuery } from '@apollo/client'
import moment from 'moment'
import { GET_MY_PROFILE } from '../../graphql/Manager'

const {Item} = Form
const UpdateMember = ({visible,setClose=()=>{},id})=>{
    const [form] = Form.useForm()

    const {data:profile, loading:gettingProfile} = useQuery(GET_MY_PROFILE) 
    const myProfile = profile?.getMyProfile

    const [getAllCell,{data,loading:loadingCell}] = useLazyQuery(GET_ALL_CELL)
    const cells = data?.getAllCell?.map(({id,name})=>({label:name,value:id}))


    const [getMemberById] = useLazyQuery(GET_MEMBER_BY_ID,{
        onCompleted({getMemberById}){
            const info = {...getMemberById}
            info.dob =  getMemberById.dob ? moment(getMemberById.dob):moment()
            
            form.setFieldsValue(info)
        }
    })


const [updateMember,{loading}] = useMutation(UPDATE_MEMBER,{
    update(cache,{data}){
        const existingEntry = cache.readQuery({query:GET_ALL_MEMBER})
        const newEntry = data?.updateMember?.data
        if(newEntry && existingEntry){
            const index = existingEntry?.getAllMember?.findIndex(el=>el.id == id)

            let cacheData = JSON.parse(JSON.stringify(existingEntry?.getAllMember))

            cacheData[index].firstName = newEntry.firstName
            cacheData[index].lastName = newEntry.lastName
            cacheData[index].email = newEntry.email
            cacheData[index].phone = newEntry.phone
            cacheData[index].title = newEntry.title
            cacheData[index].gender = newEntry.gender
           

            cache.writeQuery({
                query:GET_ALL_MEMBER,
                data:{
                    getAllMember:cacheData
                }
            })
        }
    },
    onCompleted({updateMember}){
        if(updateMember?.status){
            message.success(updateMember.message)
            form.resetFields()
            setClose()
        }else{
            message.error(updateMember.message)
        }
    }
})

useEffect(()=>{
    if(myProfile.role == "ADMIN"){
        getAllCell()
    }
},[])

useEffect(()=>{
    if(id){
        getMemberById({variables:{id:parseInt(id)}})
    }
},[id])

    return(
        <Modal title="Update Member" visible={visible} onCancel={()=>setClose()} width={600} footer={null}>
            <Form layout="vertical" form={form} requiredMark={false} 
                onFinish={(e)=>updateMember({variables:{...e, id:parseInt(id)}})}>
            <Row gutter={12}>
                <Col md={12} sm={24}>
                    <Item label="Title" name="title"
                        rules={[{message:"Title is required", required:true}]}>
                        <Select options={[{label:"Brother",value:"BROTHER"},
                        {label:"Sister", value:"SISTER"},
                        {label:"Deacon",value:"DEACON"},
                        {label:"Deaconness", value:"DEACONNESS"},
                        {label:"Pastor", value:"PASTOR"}]}
                        placeholder="Select an option"/>
                </Item>
                </Col>
                <Col md={12}  sm={24}>
                    <Item label="Designation" name="designation"
                        rules={[{message:"Designation is required", required:true}]}>
                        <Select options={[{label:"Pastor",value:"PASTOR"},
                        {label:"Cell Leader", value:"CELL LEADER"},
                        {label:"Cell Executive",value:"CELL EXECUTIVE"},
                        {label:"Co-ordinator", value:"CO-ORDINATOR"},
                        {label:"Staff", value:"STAFF"},
                        {label:"None", value:"NONE"}]}
                        placeholder="Select an option"/>
                    </Item>
                </Col>
            </Row>
            
               <Row gutter={12}>
                   <Col md={12}  sm={24}>
                    <Item label="First Name" name="firstName"
                        rules={[{message:"First Name is required", required:true}]}>
                            <Input type="text" placeholder="Enter first name"/>
                        </Item>
                   </Col>
                   <Col md={12}>
                    <Item label="Last Name" name="lastName"
                        rules={[{message:"Last Name is required", required:true}]}>
                        <Input type="text" placeholder="Enter last name"/>
                    </Item>
                   </Col>
               </Row>
               
                
               <Row gutter={12}>
                   <Col md={12}  sm={24}>
                    <Item label="Email" name="email">
                            <Input type="email" placeholder="Enter email address"/>
                        </Item>
                   </Col>
                   <Col md={12}  sm={24}>
                    <Item label="Phone Number" name="phone"
                        rules={[{message:"Phone number is required", required:true}]}>
                        <Input type="tel" placeholder="Enter phone number"/>
                        </Item>
                   </Col>
               </Row>
               <Row gutter={12}>
                   <Col md={12}  sm={24}>
                   <Item label="Gender" name="gender"
                        rules={[{message:"Gender is required", required:true}]}>
                        <Select options={[{label:"Male",value:"MALE"},{label:"Female", value:"FEMALE"}]}
                        placeholder="Select an option"/>
                    </Item>
                   </Col>
                   <Col md={12}  sm={24}>
                    <Item label="Education" name="education"
                        rules={[{message:"Education status is required", required:true}]}>
                        <Select options={[{label:"Graduate",value:"GRADUATE"},
                        {label:"Under-graduate", value:"UNDER-GRADUATE"}]}
                        placeholder="Select an option"/>
                    </Item>
                   </Col>
                </Row>
               <Row gutter={12}>
                   <Col md={12}  sm={24}>
                   <Item label="Marital Status" name="maritalStatus"
                        rules={[{message:"Marital status is required", required:true}]}>
                        <Select options={[{label:"Single",value:"SINGLE"},{label:"Married", value:"MARRIED"},{label:"Divorced",value:"DIVORCED"},{label:"Widow", value:"WIDOW"}]}
                        placeholder="Select an option"/>
                    </Item>
                   </Col>
                   <Col md={12}  sm={24}>
                    <Item label="Employment Status" name="employmentStatus"
                        rules={[{message:"Employment status is required", required:true}]}>
                        <Select options={[{label:"Employed",value:"EMPLOYED"},
                        {label:"Self-Employed", value:"SELF-EMPLOYED"},
                        {label:"Unemployed",value:"UN-EMPLOYED"}]}
                        placeholder="Select an option"/>
                    </Item>
                   </Col>
                </Row>
                <Row gutter={12}>
                   <Col md={12}  sm={24}>
                    <Item label="Home Address" name="homeAddress"
                        rules={[{message:"Home address is required", required:true}]}>
                            <Input type="text" placeholder="Enter home address"/>
                        </Item>
                   </Col>
                   <Col md={12}  sm={24}>
                    <Item label="Office Address" name="officeAddress">
                        <Input type="text" placeholder="Enter office address"/>
                        </Item>
                   </Col>
               </Row>
               <Row gutter={12}>
                   <Col md={12}  sm={24}>
                    <Item label="Date of Birth" name="dob"
                        rules={[{message:"Date of Birth is required", required:true}]}>
                            <DatePicker placeholder="Enter date of birth"/>
                        </Item>
                   </Col>
                   <Col md={12}  sm={24}>
                    <Item label="Language(s)" name="language">
                        <Input type="text" placeholder="E.g English,Yoruba"/>
                        </Item>
                   </Col>
               </Row>

               <Row gutter={12}>
                   <Col md={12}  sm={24}>
                   <Item label="Baptism Status" name="baptism"
                        rules={[{message:"Baptism status is required", required:true}]}>
                        <Select options={[{label:"Baptized",value:true},{label:"Not Baptized", value:false}]}
                            placeholder="Select an option"/>
                    </Item>
                   </Col>
                   <Col md={12}  sm={24}>
                    <Item label="Foundation school Status" name="foundationSchool"
                        rules={[{message:"Foundation school status is required", required:true}]}>
                        <Select options={[{label:"Ongoing",value:"ONGOING"},
                            {label:"Enrolled", value:"ENROLLED"},
                            {label:"Graduated",value:"GRADUATED"}]}
                            placeholder="Select an option"/>
                    </Item>
                   </Col>
                </Row>
                {
                    gettingProfile?.role == "ADMIN" ?
                    <Item label="Cell" name="cellId">
                    <Select 
                        loading={loadingCell} 
                        options={cells}
                        placeholder="Select an option"/>
                </Item>:null
                }
                
                <Item>
                    <Button 
                        style={{marginTop:20}} 
                        type="primary" 
                        block 
                        loading={loading} 
                        htmlType="submit">Update Member</Button>
                </Item>
            </Form>
        </Modal>
    )
}

export default UpdateMember