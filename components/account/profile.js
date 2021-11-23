import React from 'react'
import {Row,Col,List} from 'antd'
import {GET_MY_PROFILE} from '../../graphql/Manager'
import { useQuery } from '@apollo/client';



const Index = ()=>{

  const {data,loading} = useQuery(GET_MY_PROFILE)

  const info = data?.getMyProfile
  const profile = [
    {
      title: 'Name',
      description:info?.name
    },
    {
      title: 'Phone',
      description:info?.phone
    },
    {
      title: 'Email',
      description:info?.email
    },{
      title:"Role",
      description:info?.role
    },{
      title:"Church",
      description:info?.church?.name
    },{
      title:"Group",
      description:info?.group?.name
    }
  ];

    return(
        <Row>
            <Col md={12}>
                <h1 className="small-title">Info</h1>
                <List
                    itemLayout="horizontal"
                    dataSource={profile}
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                        title={item.title}
                        description={item.description}
                        />
                    </List.Item>
                    )}
                />
            </Col>
        </Row>
    )
}

export default Index