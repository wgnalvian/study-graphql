import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { queryBook } from '../helper/apolloQuery'

function BookDetail({state}:{state:any}) {
    
        const {loading, data,error} = useQuery(queryBook, {
            variables : {id : state.id}
        })
        
  
    
    return (
        <div>
           <h1>Book Detail</h1>
            {data?.book && (
                <ul>
                    <li>name : {data.book.name}</li>
                    <li>genre : {data.book.genre}</li>
                    <li>author : 
                        <ul>
                            <li>name : {data.book.author.name}</li>
                            <li>name : {data.book.author.age}</li>
                            </ul></li>
                </ul>
            )}
        </div>
    )
}

export default BookDetail
