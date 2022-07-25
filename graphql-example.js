const express = require('express')
const expressGraphQL = require('express-graphql')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql')
const app = express()

const EmployeeType = new GraphQLObjectType({
    name: 'Employee',
    description: 'This represents an employee',
    fields: () => ({
      id: { type: GraphQLNonNull(GraphQLInt) },
      name: { type: GraphQLNonNull(GraphQLString) },
      id: { type: GraphQLNonNull(GraphQLInt) }
    })
  })

  const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
      employees: {
        type: new GraphQLList(EmployeeType),
        description: 'List of All Employees',
        resolve: () => employees
      },
      employee: {
        type: EmployeeType,
        description: 'A Single Employee',
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (parent, args) => employees.find(employee => employee.id === args.id)
      }
    })
  })

  const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
      addEmployee: {
        type: EmployeeType,
        description: 'Add an employee',
        args: {
          name: { type: GraphQLNonNull(GraphQLString) }
        },
        resolve: (parent, args) => {
          const employee = { id: employees.length + 1, name: args.name }
          employees.push(employee)
          return employee
        }
      }
    })
  })

  const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
  })

  app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
  }))
  app.listen(5000, () => console.log('Server Running'))