import {gql} from '@apollo/client';
//export query GET_ME
export const GET_ME = gql`
    query Me{
        me {
            _id
            username
            email
            saveBook
        }
    }
`