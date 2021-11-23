import {gql} from '@apollo/client'


export const GET_ALL_CHURCH_ADMIN = gql`
    {
        getAllChurchAdmin{
           member{
               firstName
               lastName
               email
               id
           }
            role
            status
        }
    }
`

export const CREATE_CHURCH_ADMIN = gql`
    mutation CreateChurchAdmin(
        $userId:Int!
        $role:String!
    ){
        createChurchAdmin(
            input:{
                userId:$userId
                role:$role
            }
        ){
            message
            status
            data{
               member{
                   firstName
                   lastName
                   email
               }
                role
                status
            }
        }
    }
`

export const DELETE_ADMIN = gql`
    mutation(
        $id:Int!
    ){
        deleteAdmin(id:$id){
            message
            status
        }
    }
`

export const CHANGE_ADMIN_ROLE = gql`
    mutation ChangeAdminRole($id:Int! $role:String!){
        changeAdminRole(input:{
            id:$id
            role:$role
        }){
            message
            status
            data{
                member{
                    id
                }
                role
            }
        }
    }
`

export const CHANGE_ADMIN_PASSWORD = gql`
    mutation ChangeAdminPassword(
        $currentPassword:String!
        $password:String!
    ){
        changeAdminPassword(
            input:{
                currentPassword:$currentPassword
                password:$password
            }
        ){
            message
            status
        }
    }
`

export const GET_MY_PROFILE = gql`
    {
        getMyProfile{
            status
            role
            member{
                firstName
                lastName
                id
                church{
                    name
                }
                group{
                    name
                }
            }
        }
    }
`