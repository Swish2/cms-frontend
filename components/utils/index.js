import React from 'react'



export const PageTitle =  ({title,subTitle})=>{

    return(
        <div style={{marginBottom:20}}>
        <h4 className="page-title">{title}</h4>
        <p>{subTitle}</p>
        
        </div>
    )
}