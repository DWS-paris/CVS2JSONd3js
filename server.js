/* 
Imports
*/
    //=> NodeJS
    require('dotenv').config();
    const express = require('express');
    const path = require('path');
    const ejs = require('ejs');
    const bodyParser = require('body-parser');

    //=> Inner
    const mainRouter = require('./routes/main.router');
    const mongoDB = require('./services/db.connect');
//

/* 
Configuration
*/
    const server = express();
    const port = process.env.PORT;

    class ServerClass {
        init(){
            //=> View engine
            server.engine( 'html', ejs.renderFile );
            server.set( 'view engine', 'html' );
            
            //=> Client folder
            server.set( 'views', __dirname + '/www' );
            server.use( express.static(path.join(__dirname, 'www')) );

            //=> Set Body-parser
            server.use(bodyParser.json({limit: '10mb'}));
            server.use(bodyParser.urlencoded({ extended: true }));

            //=> Router
            server.use('/', mainRouter)

            //=> Start server
            this.startServer();
        }

        startServer(){
            //=> Connect MongoDB
            mongoDB.initClient()
            .then( mongooseResponse => {
                //=> Launch server
                server.listen(port, () => {
                    console.log({ database: mongooseResponse, server: `http://localhost:${port}`})
                })
            })
            .catch( mongooseError => console.log(mongooseError));
        }
    }
//

/* 
Launch server
*/
    new ServerClass().init();
//