import React from 'react'
import { GET_MY_PROFILE } from '../../graphql/Manager'
import { useQuery } from '@apollo/client'
import Router from 'next/router'

const WithAuth = (OriginalComponent)=>{
    const NewComponent = ()=>{

        const {data,loading} = useQuery(GET_MY_PROFILE)
        

        if(loading) return <>Loading...</>

        

        if(!loading && data?.getMyProfile == null){
            Router.replace("/")
            return <></>
        }

        document.body.classList.add('dark-mode');

        return <OriginalComponent {...data?.getMyProfile}/>
    }

    return NewComponent
}

export default WithAuth