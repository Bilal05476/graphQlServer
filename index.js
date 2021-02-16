const { ApolloServer , gql} = require('apollo-server');

const typeDefs = gql `
    type Student {
        id: Int
        name: String
        email: String
        age: Int
    }

    type Query {
        students : [Student]
    }
    
    input StdInput {
        id: Int
        name: String
        email: String
        age: Int
    }
    type Mutation {
        addStudent(input: StdInput): Student
    }

`;

let students = [
    {
        "id": 01,
        "name": "Bilal",
        "email": "bilal@gmail.com",
        "age": 21
    },
    {            
        "id": 02,
        "name": "Ahmed",
        "email": "Ahmed@gmail.com",
        "age": 21
    }

]

const resolvers = {
    Query: {
        students: () => students,
    },
    Mutation: {
        addStudent: ( _ , {input}) => {
            students.push(
                {
                    id: input.id,
                    name: input.name,
                    email: input.email,
                    age: input.age
                }
            )
            return {
                    id: input.id,
                    name: input.name,
                    email: input.email,
                    age: input.age
                }
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers});

server.listen().then(({url}) => {
    console.log(`
    Server is running! at ${url}`)
});

