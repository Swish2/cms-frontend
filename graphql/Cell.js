import {gql} from '@apollo/client'



export const GET_ALL_CELL = gql`
    {
        getAllCell{
            id
            name
            address
            meetingDay
            meetingTime
            type
            totalMembers
            leader{
                firstName
                lastName
            }
            createdAt
        }
    }
`

export const GET_CELL_BY_ID = gql`
   query GetCellById($id:Int!) {
        getCellById(id:$id){
            id
            name
            address
            meetingDay
            meetingTime
            type
            totalMembers
            leader{
                firstName
                lastName
            }
            createdAt
        }
    }
`

export const CREATE_CELL = gql`
    mutation CreateCell(
        $name:String!
        $leader:Int
        $address:String
        $meetingDay:String!
        $meetingTime:String!
        $type:String!
    ){
        createCell(input:{
            name:$name
            leader:$leader
            address:$address
            meetingDay:$meetingDay
            meetingTime:$meetingTime
            type:$type
        }){
            message
            status
            data{
                name
                address
                meetingTime
                meetingDay
                type
                id
            }
        }
    }
`

export const UPDATE_CELL = gql`
    mutation UpdateCell(
        $id:Int!
        $name:String!
        $address:String
        $meetingDay:String!
        $meetingTime:String!
        $type:String!
    ){
        updateCell(input:{
            id:$id
            name:$name
            address:$address
            meetingDay:$meetingDay
            meetingTime:$meetingTime
            type:$type
        }){
            message
            status
            data{
                name
                address
                meetingTime
                meetingDay
                type
                id
                createdAt
            }
        }
    }
`