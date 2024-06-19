import {gql} from '@apollo/client';
//export query GET_ME
export const GET_ME = gql`
    query Me{
        _id
        username
        email
        saveBook{
            BookId{
                authors
                description
                title
                image
                link
            }
        }
    }
`