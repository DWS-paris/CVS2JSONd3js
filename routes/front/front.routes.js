/* 
Import & config
*/
    const express = require('express');
    const frontRouter = express.Router();
//

/* 
Definition
*/
    class FrontRouterClass {
        constructor(){}

        routes(){
            // Homepage
            frontRouter.get( '/', (req, res) => {
                res.render('index');
            })
        }

        init(){
            this.routes();
            return frontRouter;
        }
    }
//

/* 
Export
*/
    module.exports = FrontRouterClass;
//