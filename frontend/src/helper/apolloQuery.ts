import {gql} from '@apollo/client'
export const bookQuery = 
gql`query getBooks{
        books {
            id
            name
            genre
            author{
                name
                age
                book{
                    name
                    genre
                }
            }
        }
    }`

export const authorQuery = 
gql`{
        authors {
            name
            id
        }
    }`

export const queryBook = 
gql`
query queryBook($id : ID) {
    book(id : $id) {
        name
        id
        genre
        author {
            name
            age
        }
    }
}
`