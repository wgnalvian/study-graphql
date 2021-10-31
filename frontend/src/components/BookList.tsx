import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { bookQuery } from '../helper/apolloQuery'
import { deleteBook } from '../helper/apolloMutation'


function BookList({setState} : {setState:Function}) {
    const { loading, error, data } = useQuery(bookQuery)
  const [deleteB,{loading : loadingDelete}] = useMutation(deleteBook,{
    refetchQueries: [
      bookQuery, // DocumentNode object parsed with gql
      'getBooks' // Query name
    ],
  })
    
    const handleDetail = (id:String|Number) => {
        setState((prev:Object) =>{ return {...prev,id}})
    }

    const handleDelete = (id:String|Number) => {
        deleteB({variables : {id : id}})
    }
    return (
        <div style={{width : 400}}>
            {loading ? <p>Loading</p> :

                (
                    <>
                        <h1>Books List</h1>
                        <ul>

                            {
                                data.books.map((i: { name: String, id:String|Number }, index: number) => <li key={index}>{i.name} <button onClick={() => handleDetail(i.id)}>detail</button> <button onClick={() => handleDelete(i.id)}>delete</button></li>)
                            }
                        </ul>
                    </>
                )

            }
        </div>
    )
}

export default BookList
