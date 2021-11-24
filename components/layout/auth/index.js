import React from 'react'


const Index = ({children})=>{


    return(
        <>
            <div className="wrapper">
                <div style={{display:"flex", alignItems:"center", gap:10, flexDirection:"column"}}>
                    <img src="/img/logo.png" />
                    <h5 style={{color:"#fff", fontWeight:500}}>CELZ3 CHURCH MANAGEMENT SOFTWARE</h5>
                    </div>
                {children}
            </div>

            <style jsx>{`
                .wrapper{
                    position:absolute;
                    top:0;
                    bottom:0;
                    right:0;
                    left:0;
                    gap:40px;
                    background-color:#1082c1;
                    display:flex;
                    flex-direction:column;
                    align-items:center;
                    justify-content:center;
                }
            `}</style>
        </>
    )
}

export default Index