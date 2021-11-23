import React from "react";
import styled from "styled-components";
import style from './Index.module.scss'
import Link from 'next/link'
import { GET_MY_PROFILE } from "../../../graphql/Manager";
import { useQuery } from "@apollo/client";

import {Avatar,Space,Button} from 'antd'


const Logo = styled.h2`
    width:100px;
    color:#ffffff;
`

const Index =()=>{

    return(
        <>
        <div className={style.topbar}>
           
        </div>
        <Profile />
        </>
    )
}

export default Index


const Profile = ()=>{

    const {data,loading} = useQuery(GET_MY_PROFILE)

    return(
        <>
        <div className="profile">
            <Link href="/account/profile">
                <a><Avatar size={50} 
                style={{ color: '#f56a00', 
                backgroundColor: '#fde3cf' }}>{data?.getMyProfile?.member.firstName?.charAt(0)}</Avatar></a></Link>
            <p>{data?.getMyProfile?.member.firstName+' '+data?.getMyProfile?.member.lastName}</p>
        </div>

        <style jsx>{`
            .profile{
                margin-top:15px;
                height:100px;
                text-align:center;
                color:#fff;
            }

            .profile p{
                margin-bottom:0 !important;
                line-height:1.8rem;
            }
        
        `}</style>
        </>
    )
}