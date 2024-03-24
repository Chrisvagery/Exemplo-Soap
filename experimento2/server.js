const soap = require("soap");

// Função para calcular o MDC
function calcularMDC(x, y) {
  while (y !== 0) {
    const temp = x % y;
    x = y;
    y = temp;
  }
  return x;
}

// Objeto que contém as funções disponíveis no servidor SOAP
const service = {
  MDCService: {
    MDCPort: {
      CalculateMDC: function (args) {
        const x = parseInt(args.x);
        const y = parseInt(args.y);
        const mdc = calcularMDC(x, y);
        return { MDC: mdc };
        
      },
    },
  },
};

// Criando o servidor SOAP
const xml = require("fs").readFileSync("./calculomdc.wsdl", "utf8");

// Iniciando o servidor
const app = require("http").createServer(function (req, res) {
  res.end("404: Not Found: " + req.url);
});

const soapServer = soap.listen(app, "/mdc", service, xml);
app.listen(3000, function () {
  console.log(
    "Servidor SOAP iniciado em http://localhost:3000/calculomdc?wsdl"
  );
});
