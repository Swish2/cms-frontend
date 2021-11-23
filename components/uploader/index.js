import React from 'react'
import { Upload,Input,Form } from 'antd'
import style from './Index.module.scss'
import { UploadCloud } from 'react-feather'

const {Dragger} = Upload
const Index = ({placeholder,})=>{

    const handleChange = (e)=>{
        console.log(e)
    }

    return(
        <Dragger
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            onChange={(e)=>handleChange(e)}
            showUploadList={false}>
            <div className={style.dragger}>
               <UploadCloud size={40} color="#a772cb"/>
               <p className="ant-upload-hint">Drag and Drop an image file here</p>
            </div>
        </Dragger>
    )
}

export default Index