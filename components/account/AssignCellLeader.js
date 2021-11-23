import { Modal,Form,Select, Button,Switch, message } from 'antd'
import React from 'react'
import { GET_ALL_CELL_LEADER, ASSIGN_CELL_LEADER } from '../../graphql/Member'
import { useQuery,useMutation } from '@apollo/client'

const {Item} = Form
const Index = ({open,onClose=()=>{},id})=>{

    const {data} = useQuery(GET_ALL_CELL_LEADER)
    const leaders = data?.getAllCellLeader?.map(({firstName,lastName,id})=>({label:firstName+' '+lastName, value:id}))

    const [assignCellLeader,{loading}] = useMutation(ASSIGN_CELL_LEADER,{
        onCompleted({assignCellLeader}){
            if(assignCellLeader.status){
                message.success(assignCellLeader.message)
            }else{
                message.error(assignCellLeader.message)
            }
        }
    })




    return(
        <Modal width={400} visible={open} 
            title="Assign Leader" footer={null}
            onCancel={()=>onClose()}>
                <Form layout="vertical" onFinish={(e)=>assignCellLeader({variables:{cellId:parseInt(id),...e}})}>
                    <Item label="User" name="userId">
                       <Select 
                         options={leaders}/>
                    </Item>
                    <Item name="isSendPassword">
                        <SwitchWrapper label="Send login credentials"/>
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