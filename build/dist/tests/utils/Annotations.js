var fs = require('fs');
export async function toPlaywrightReport(message) {


    // read the existing JSON data from the file
    const jsonData = fs.readFileSync('logs.json', 'utf-8');

    // parse the JSON data into a JavaScript object
    const data = JSON.parse(jsonData);

    // append a value to the array associated with a particular key
    data['consoleLogs'].push(message);

    // write the updated JSON data back to the file
    fs.writeFileSync('logs.json', JSON.stringify(data));

}