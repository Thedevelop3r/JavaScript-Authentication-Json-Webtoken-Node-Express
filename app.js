// dotenv package for auto loading .env file for envoirement variables
require('dotenv').config();
// express-async-errors for catching async errors
require('express-async-errors');
// import and init the express application
const express = require('express');
const app = express();
// not found and error handler middlewares
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
// importing custom routes
const router = require('./routes/main');
// middleware and static assets serve
app.use(express.static('./public'));
// express json to parse the request-body
app.use(express.json());
// api's and versioning them
app.use('/api/v1', router);
// assigning handlers
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
// setting up port through .env if not then set 3000 port
const port = process.env.PORT || 3000;
// starting the server 
try{
    app.listen(port, ()=>{
        console.log(`server started and listening on: http://localhost:${port}`);
    });
}catch(error){
    console.log('server failed to start: ', error);
}
