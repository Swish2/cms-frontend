import React from 'react'
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'antd/dist/antd.css'
import '../public/css/global.scss'
import AuthProvider from '../graphql/Connection'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Router from 'next/router'



Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const App = ({Component,pageProps})=>{
    return(
        <AuthProvider><Component {...pageProps}/></AuthProvider>
    )
}

export default App