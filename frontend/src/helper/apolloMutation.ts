import {gql} from '@apollo/client'



export const createBook =  gql`mutation addBook($input:createUserInput) {
                    addBook(input: $input){
                        name
                        genre
                    }
                }`

export const deleteBook = gql`

mutation($id:ID){
    deleteBook(id : $id){
        deletedCount
    }
}

`