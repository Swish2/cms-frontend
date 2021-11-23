import React from "react";
import { Card,Space } from "antd"
import dynamic from 'next/dynamic'
import style from './Index.module.scss'

const Chart = dynamic(
    () => import("react-apexcharts"),
    { ssr: false }
  )


const Analytics = ()=>{
    return(
        <div className={style.wrap}>
            <CardItem title="Members" value="20"/>
            <CardItem title="Cells" value="5"/>
            <CardItem title="Baptized" value="10"/>
            <CardItem title="Partners" value="10"/>
            <CardItem title="Leaders" value="10"/>
        </div>
    )
}

export default Analytics


const CardItem = ({title,value})=>{
    return(
        <Card>
            <div className={style.item_wrapper}>
                <p>{value}</p>
                <h4>{title}</h4>
            </div>
        </Card>
    )
}


export const DonutChart = ({labels=[],series=[],title})=>{
    const chartConfig ={
        options:{
            labels:[...labels],
        },
        series:[...series]
    }

    return(
        <Card>
            <h3 style={{marginBottom:15}}>{title}</h3>
            <Chart options={chartConfig.options} series={chartConfig.series} type="donut"/>
        </Card>
        
    )
}