
const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLScalarType, GraphQLList, graphqlSync, GraphQLNonNull, GraphQLInputObjectType} = require('graphql')
const _ = require('lodash')
const {Author, Book} = require('../models/mongooseSchema')
// const books = [
//     {
//         id : '1',
//         name : 'Forgive me god',
//         genre : 'religi',
//         author : '2'
//     },
//     {
//         id : '2',
//         name : 'Similarity beetwen islam and hindu',
//         genre : 'religi',
//         author : '3'
//     },
//     {
//         id : '3',
//         name : 'How to get good friend',
//         genre : 'social',
//         author : '2'
//     },
//     {
//         id : '4',
//         name : 'How to be halal',
//         genre : 'social',
//         author : '1'
//     }
//  ]
// const authors = [
//     {
//         id : '1',
//         name : 'Alvian',
//         age : 20
//     },
//     {
//         id : '2',
//         name : 'Arif',
//         age : 21
//     },
//     {
//         id : '3',
//         name : 'Wiguna',
//         age : 22
//     }
//  ]

const BookTypes = new GraphQLObjectType({

  

    name : 'Books',
    fields : () => ({
        id : {type : GraphQLID},
        name : {type : GraphQLString},
        genre : {type : GraphQLString},
        author : {
            type : AuthorTypes,
            resolve(parent, args){
            //  return   _.find(authors, {id : parent.author})
            return Author.findById(parent.author)
            }
        }
    })

})
const AuthorTypes = new GraphQLObjectType({

  

    name : 'Authors',
    fields : () => ({
        id : {type : GraphQLID},
        name : {type : GraphQLString},
        age : {type : GraphQLInt},
        book : {
            type : new GraphQLList(BookTypes),
            resolve(parent){
            //    return  _.filter(books, {author : parent.id})
                return Book.find({author : parent.id})
            }
        }
        
    })

})


const RootQuery = new GraphQLObjectType({
    name : 'RootQuery',
    fields : {
        book : {
            type : BookTypes,
            args : {id : {type : GraphQLID}},
            resolve(parent, args){
                // return _.find(books,{id : args.id})
                return Book.findById(args.id)
            }
        },
        author : {
            type : AuthorTypes,
            args  : {id : {type : GraphQLID}},
            resolve(parent, args){
                // return _.find(authors, {id : args.id})
                return Author.findById(args.id)
            }
        },
        books : {
            type : new GraphQLList(BookTypes),
            resolve(parent){
                // return books
                return Book.find({})
            }
        },
        authors : {
            type : new GraphQLList(AuthorTypes),
            resolve(parent){
                // return books
                return Author.find({})
            }
        }
        
    }
})

const RootMutation = new GraphQLObjectType({
    name : 'RootMutation',
    fields:{

        addAuthor : {
            type :  AuthorTypes,
            args : {
                name : {type : new GraphQLNonNull(GraphQLString)},
                age : { type : GraphQLInt}
                
            },
            resolve(parent, args){
                
                const author = new Author({name : args.name, age: args.age})
                return author.save()
    
            }
        },
        // addBook : {
        //     type :  BookTypes,
        //     args : {
        //         name : {type : GraphQLString},
        //         genre : { type : GraphQLString},
        //         author : {type : GraphQLID}
                
        //     },
        //     resolve(parent, args){
                
        //         const book = new Book({name : args.name, genre: args.genre, author : args.author})
        //         return book.save()
    
        //     }
        // },
        addBook : {
            type : BookTypes,
            args : {
                input : {
                    type : new GraphQLInputObjectType({
                        name : 'createUserInput',
                        fields : () => ({
                            name : {type : GraphQLString},
                            genre : {type : GraphQLString},
                            author : {type : GraphQLID},
                        })
                    })
                }
            },
            resolve(parent, {input}){
                const book = new Book({name : input.name, genre: input.genre, author : input.author})
                        return book.save()
            }
        },
        deleteBook : {
            type : new GraphQLObjectType({
                name : 'deleteBook',
                fields : () => ({
                    deletedCount : {type : GraphQLInt}
                })
            }),
            args : {
                id : {type : GraphQLID}
            },
            resolve(parent, args){
               return Book.deleteOne({_id : args.id})
            }
        }

    }
})



module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation : RootMutation,
    
    
})