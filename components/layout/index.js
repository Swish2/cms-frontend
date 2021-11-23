import React from "react";
import { Layout } from "antd";
import {ChurchSidebar} from "./sidebar";
import Header from './topbar'
import style from './Index.module.scss'
import Head from 'next/head'

const {Content} = Layout


export const ChurchLayout = ({children, pageTitle})=>{

    return(
        <>
        <Head>
        <title>CMS | {pageTitle}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
        <Layout className={style.layout}>
            <ChurchSidebar />
            <Layout>
                <Header title={pageTitle}/>
            <Content className={style.content}>{children}</Content>
      </Layout>
        </Layout>
        </>
    )
}
