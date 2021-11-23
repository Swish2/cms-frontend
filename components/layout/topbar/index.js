import React from "react"
import { Layout,Menu,Row,Col } from "antd"
import style from './Index.module.scss'
import { User,Tool,Bell,LogOut } from "react-feather";


const {Header} = Layout

const {Item} = Menu
const Head = ({title})=>{

    return(
        <Header className={style.header}>
           <nav>
               <div>
                    <h4 className="page-title">{title}</h4>
               </div>
               <div>
                    <HorizonalMenu />
               </div>
           </nav>
        </Header>
      
    )
}

export default Head



const HorizonalMenu = ()=>{

    return(
        <>
        <ul className="horizonal-menu-custom">
            {/* <Notification /> */}
            <li><LogOut /></li>
        </ul>

        <style jsx>{`
            .horizonal-menu-custom{
                list-style-type:none;
                padding:0;
                display:flex;
                gap:30px;
                color: #4e4e4e;
                padding-top:10px;
                padding-right:20px;
            }

            .horizonal-menu-custom li{
                cursor:pointer;
            }

        `}</style>
        </>
    )
}



const Notification = ()=>{

    return(
        <>
            <li className="notification">
                <Bell/>
                {/* <span>20</span> */}
                </li>

            <style jsx>{`
                .notification{
                    position:relative;
                    cursor:pointer;
                }

                .notification span{
                    display:flex;
                    position:absolute;
                    min-width:20px;
                    padding:2px;
                    min-height:20px;
                    align-items:center;
                    justify-content:center;
                    background-color:red;
                    border-radius:50%;
                    top:-10px;
                    right:-10px;
                    color:#fff;

                }
            `}</style>
        </>
    )
}