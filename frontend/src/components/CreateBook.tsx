import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { createBook } from '../helper/apolloMutation'
import { authorQuery, bookQuery } from '../helper/apolloQuery'

function CreateBook() {
    const { loading, data, error } = useQuery(authorQuery)
    const [addBook,{data : dataCreateBook ,error : dataErrorBook ,loading : dataLoadingBook}] = useMutation(createBook,{
        refetchQueries: [
          bookQuery, // DocumentNode object parsed with gql
          'getBooks' // Query name
        ],
      })
    const [state, setstate] = useState({
        name: "",
        genre: "",
        author: ""
    })
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        if(state.name && state.genre && state.author){

            await addBook({variables : {input : state}})
        }
        let form = document.querySelector('.form') as HTMLFormElement
        form.reset() 
      
    }

    
   
    return (
        <div style={{width : 250}}>

        <div style={{ width: 200 }}>
            {loading ? <p>Loading</p> : (
                <>
                    <h1>Create Book</h1>
                    <form  className="form" onSubmit={(e) =>{ 
                        e.preventDefault()
                        handleSubmit(e)
                        }} style={{ display: 'flex', flexDirection: 'column' }}>
                        <label>name</label>
                        <input type="text" onChange={(e) => {
                            setstate((prev) => { return { ...prev, name: e.target.value } })
                        }} />
                        <label>genre</label>
                        <input type="text" onChange={(e) => {
                            setstate((prev) => { return { ...prev, genre: e.target.value } })
                        }} />
                        <label>author</label>
                        <select onChange={(e) => {
                            setstate((prev) => { return { ...prev, author: e.target.value } })
                            console.log(e.target.value)
                        }}>
                            <option selected value={0}>Select option</option>

                            {
                                data.authors.map((i: { name: string, id: string }, index: number) => <option key={index} value={i.id}>{i.name}</option>)

                            }




                        </select>
                        <button type="submit">Submit</button>
                    </form>
                </>
            )}

        </div>
        </div>
    )
}

export default CreateBook
