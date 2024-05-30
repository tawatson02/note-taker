const fs =require('fs');
const util = require('util');

//creates a promisfied version of the fs.readFile function
const readFromFile = util.promisify(fs.readFile);

//writeToFile takes the file path(destination) and data(content) and writes it as a string
const writeToFile = (destination, content) => 
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.log(err) : console.info(`/nData written to ${destination}`)
);

// this reads and appends the new content
const readAndAppend = (content, file)=> {
    fs.readFile (file, 'utf-8', (err, data) => {
        if (err){
            console.log(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

module.exports = { readFromFile, writeToFile, readAndAppend};