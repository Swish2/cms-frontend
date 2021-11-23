import {gql} from '@apollo/client'


export const GET_ALL_MEMBER = gql`
    {
        getAllMember{
            id
            firstName
            lastName
            cell{
                name
                id
            }
            gender
            email
            phone
            title
    }
    }
`

export const GET_ALL_CELL_LEADER = gql`
    {
        getAllCellLeader{
            id
            firstName
            lastName
    }
    }
`

export const GET_MEMBER_BY_ID = gql`
    query GetMemberById($id:Int!){
        getMemberById(id:$id){
            id
            firstName
            lastName
            dob
            gender
            homeAddress
            officeAddress
            email
            phone
            maritalStatus
            employmentStatus
            education
            language
            title
            designation
            foundationSchool
            baptism
            
        }
    }
`


export const CREATE_MEMBER = gql`
    mutation CreateMember(
        $firstName:String!
        $lastName:String!
        $dob:Date
        $gender:String!
        $homeAddress:String!
        $officeAddress:String
        $email:String
        $phone:String!
        $maritalStatus:String!
        $employmentStatus:String!
        $education:String!
        $language:String!
        $title:String!
        $designation:String!
        $foundationSchool:String!
        $baptism:Boolean!
        $cellId:Int
    ){
        createMember(input:{
            firstName:$firstName
            lastName:$lastName
            dob:$dob
            gender:$gender
            homeAddress:$homeAddress
            officeAddress:$officeAddress
            email:$email
            phone:$phone
            maritalStatus:$maritalStatus
            employmentStatus:$employmentStatus
            education:$education
            language:$language
            title:$title
            designation:$designation
            foundationSchool:$foundationSchool
            baptism:$baptism
            cellId:$cellId
        }){
            message
            status
            data{
                id
                firstName
                lastName
                email
                gender
                phone
                cell{
                    id
                    name
                }
                email
            }
        }
    }
`

export const UPDATE_MEMBER = gql`
    mutation UpdateMember(
        $id:Int!
        $firstName:String!
        $lastName:String!
        $dob:Date
        $gender:String!
        $homeAddress:String!
        $officeAddress:String
        $email:String
        $phone:String!
        $maritalStatus:String!
        $employmentStatus:String!
        $education:String!
        $language:String!
        $title:String!
        $designation:String!
        $foundationSchool:String!
        $baptism:Boolean!
        $cellId:Int
    ){
        updateMember(input:{
            id:$id
            firstName:$firstName
            lastName:$lastName
            dob:$dob
            gender:$gender
            homeAddress:$homeAddress
            officeAddress:$officeAddress
            email:$email
            phone:$phone
            maritalStatus:$maritalStatus
            employmentStatus:$employmentStatus
            education:$education
            language:$language
            title:$title
            designation:$designation
            foundationSchool:$foundationSchool
            baptism:$baptism
            cellId:$cellId
        }){
            message
            status
            data{
                id
                firstName
                lastName
                email
                gender
                phone
                email
            }
        }
    }
`

export const ASSIGN_CELL_LEADER = gql`
    mutation AssignCellLeader(
        $userId:Int!
        $cellId:Int!
        $isSendPassword:Boolean
    ){
        assignCellLeader(input:{
            userId:$userId
            cellId:$cellId
            isSendPassword:$isSendPassword
        }){
            message
            status
        }
    }
`