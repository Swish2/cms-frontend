import React from "react"
import { Home,Book,Film,User,DollarSign,Tool,Box,Figma,Calendar } from "react-feather"
import { Layout } from "antd"
import style from './Index.module.scss'
import Top from './Top'
import {Menu} from 'antd'
import Link from 'next/link'
import { GET_MY_PROFILE } from "../../../graphql/Manager"
import { useQuery } from "@apollo/client"

const {Sider} = Layout

const { Item,SubMenu,ItemGroup } = Menu




export const ChurchSidebar = ()=>{

    const {data,loading} = useQuery(GET_MY_PROFILE)
    const info = data?.getMyProfile

    return(
        <Sider width={288} className={style.sidebar} collapsedWidth={0} breakpoint="sm">
            <Top/>
            <Menu className={style.menu}>
                {/* <Item icon={<Home size={18}/>} key="dashboard"><Link href="/account/dashboard"><a>Dashboard</a></Link></Item> */}
                <Item icon={<User size={18}/>} key="members"><Link href="/account/members"><a>Members</a></Link></Item>
               {
                   info?.role == "ADMIN" ?
                   <Item icon={<Box size={18}/>} key="cells"><Link href="/account/cells"><a>Cells</a></Link></Item>:null
               }
                <Item icon={<Book size={18}/>} key="materials"><Link href="/account/materials"><a>Library</a></Link></Item>
                <Item icon={<Tool size={18}/>} key="settings"><Link href="/account/settings"><a>Settings</a></Link></Item>
            </Menu>
        </Sider>
    )
}

