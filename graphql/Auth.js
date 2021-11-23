import {gql} from '@apollo/client'


export const LOGIN_TEACHER = gql`
    mutation LoginTeacher(
        $email:String!
        $password:String!
    ){
        loginTeacher(input:{
            email:$email
            password:$password
        }){
            message
            status
            firstTimeLogin
            token
        }
    }
`


export const LOGIN_CHURCH_ADMIN = gql`
    mutation LoginChurchAdmin(
        $email:String!
        $password:String!
    ){
        loginChurchAdmin(input:{
            email:$email
            password:$password
        }){
            message
            status
            firstTimeLogin
            token
            role
        }
    }
`

export const CHANGE_CHURCH__ADMIN_PASSWORD = gql`
    mutation ChangeChurchAdminPassword($password:String!){
        changeChurchAdminPassword(password:$password){
            message
            status
            data{
                role
            }
        }
    }
`