/* 
Import & config
*/
    const express = require('express');
    const d3Router = express.Router();
    const { csvToJson, sortingData, filteringData, nestingData } = require('../../services/d3.service');
//

/* 
Definition
*/
    class D3RouterClass {
        constructor(){}

        routes(){
            // Homepage
            d3Router.get( '/', (req, res) => {
                res.json({ msg: 'hello D3 route' });
            })

            d3Router.post( '/csv-to-json', (req, res) => {
                //=> Convert CSV
                csvToJson(req.body)
                .then( json => res.json({ output: json }) )
                .catch( err => res.json({ output: err }) )
            })

            d3Router.post( '/save-data', (req, res) => {
                console.log(req.body.input)
                res.jsonp({msg: "ok"})
            })

            d3Router.post( '/sort-data', (req, res) => {
                //=> Sorting data
                sortingData(req.body)
                .then( json => res.json({ output: json }) )
                .catch( err => res.json({ output: err }) )
            })

            d3Router.post( '/filtering-data', (req, res) => {
                //=> Filtering data
                filteringData(req.body)
                .then( json => res.json({ output: json }) )
                .catch( err => res.json({ output: err }) )
            })

            d3Router.post( '/nesting-data', (req, res) => {
                //=> Nesting data
                nestingData(req.body)
                .then( json => res.json({ output: json }) )
                .catch( err => res.json({ output: err }) )
            })
        }

        init(){
            this.routes();
            return d3Router;
        }
    }
//

/* 
Export
*/
    module.exports = D3RouterClass;
//