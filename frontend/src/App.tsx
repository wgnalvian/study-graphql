import React, { useState } from 'react';
import BookList from './components/BookList';
import { ApolloProvider } from '@apollo/client'
import { client } from './helper/appolloClient';
import CreateBook from './components/CreateBook';
import BookDetail from './components/BookDetail';
function App() {
  const [state,setState] = useState({id : ''})
  return (
    <ApolloProvider client={client}>
      <div className="App" style={{display : 'flex'}}>
        <CreateBook />
        <BookList setState={setState}/>
        <BookDetail state={state}/>
      </div>
    </ApolloProvider>
  );
}

export default App;
