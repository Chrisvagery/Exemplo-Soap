const soap = require('soap');
const url = "http://www.dneonline.com/calculator.asmx?WSDL";
const  args= {intA: 8, intB: 5}

soap.createClient(url, {}, (err, client) => {
  client.Add(args, (err, result) => {
    if(err) console.log(err)
    console.log(result);
  })
});