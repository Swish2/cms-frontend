import {gql} from '@apollo/client'


export const GET_ALL_SESSION = gql`
    {
        getAllSessionByTeacher{
            id
            title
            desc
            status
            totalStudent
            createdAt
        }
    }
`