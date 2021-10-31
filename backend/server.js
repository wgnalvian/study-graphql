const express = require('express')
const app = express()
const {graphqlHTTP} = require('express-graphql')
const mongoose = require('mongoose')
const cors = require('cors')
main().then(() => console.log('database conncention succesfully')).catch(err => console.log(err));

async function main() {
  await mongoose.connect('');
}

const schema = require('./schema/graphqlSchema')
app.use(cors())
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql : true
}))
const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`server running in port ${PORT}`)) 