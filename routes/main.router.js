/*
Imports
*/
    // Nodejs
    const { Router } = require('express');

    // Inner
    const FrontRouterClass = require('./front/front.routes');
    const D3RouterClass = require('./d3/d3.routes');
//

/* 
Definition des router
*/  
    // Parent
    const mainRouter = Router();
    const apiRouter = Router();

    // Child
    const frontRouter = new FrontRouterClass();
    const d3Router = new D3RouterClass();
//

/* 
Définition des routes
*/
    mainRouter.use( '/api', apiRouter );
    apiRouter.use( '/d3', d3Router.init() );
    mainRouter.use( '/', frontRouter.init() );
//

/* 
Export
*/
    module.exports = mainRouter;
//