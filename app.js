const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const expressPlayground = require('graphql-playground-middleware-express')
  .default
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');

const app = express();

app.use(bodyParser.json());

app.use(isAuth);
app.get('/playground', expressPlayground({ endpoint: '/graphql' }))
app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

mongoose.connect('mongodb+srv://shashank1998:root@cluster0-wbrol.mongodb.net/event-management',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify:false
}).then(()=>{
    console.log('conneceted');
}).catch((error)=>{
    console.log(error);
})

app.listen(3000);