/*
Import
*/
    const d3 = require('d3');
//

/*
Config
*/
    const csvToJson = (rawData) => {
        return new Promise( (resolve, reject) => {
            //=> Convert CSV to JSONN
            jsonData = d3.csvParse(rawData.input);

            
            
            //=> Regex to check numeric value
            const regexNumeric = /(\d+(\.\d+)?)/;

            
            const regexDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
            
            //=> Loop on the data
            for( let item of jsonData ){
                for( let prop in item ){
                    //=> Check for numeric value
                    if(regexNumeric.test(item[prop]) && !regexDate.test(item[prop]) ){
                        //=> Convert numeric string in Integer or Float
                        item[prop] = +item[prop];
                    } 
                    //=> Check for date value (dd/mm/yyyy)
                    else if(regexDate.test(item[prop])){
                        item[prop] = new Date(item[prop]);
                    }
                };
            }
            
            //=> Send back converted data
            return resolve(jsonData)
        })
    }

    const sortingData = (rawData, property = "population") => {
        return new Promise( (resolve, reject) => {
            //=> Parse string to JSON
            let json = JSON.parse(rawData.input)
            
            //=> Use sort array function
            json.sort(function(a,b) {
                return b[property] - a[property]
            });

            //=> Send back sorted data
            return resolve(json)
        })
    }

    const filteringData = (rawData, property = "population", amount = 8400000) => {
        return new Promise( (resolve, reject) => {
            //=> Parse string to JSON
            let json = JSON.parse(rawData.input);

            let maxItem = json.filter( (item) => { 
                return item[property] > amount; 
            });
            
            //=> Send back flitrated data
            return resolve(maxItem);
        })
    }

    const nestingData = (rawData, property = "population") => {
        return new Promise( (resolve, reject) => {
            //=> Parse string to JSON
            let json = JSON.parse(rawData.input);

            let nestedData = d3.nest()
            .key(item => { return item[property]; })
            .entries(json)
            
            //=> Send back nested data
            return resolve(json);
        })
    }
//

/*
Export
*/
    module.exports = { 
        csvToJson,
        sortingData,
        filteringData,
        nestingData
    };
//