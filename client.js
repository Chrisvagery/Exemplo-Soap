const soap = require("soap");

const url = "http://localhost:3000/mdc?wsdl";

// Função para calcular o Aspect Ratio
function calcularAspectRatio(x, y, mdc) {
  const aspectRatioX = x / mdc;
  const aspectRatioY = y / mdc;
  return { AspectRatioX: aspectRatioX, AspectRatioY: aspectRatioY };
}

// Chamada ao servidor SOAP
soap.createClient(url, function (err, client) {
  if (err) {
    console.error(err);
  } else {
    const x = 1920; // Largura da imagem
    const y = 1080; // Altura da imagem

    // Chamada ao método do servidor para calcular o MDC
    client.CalculateMDC(
      { x: x, y: y },
      function (err, result) {
        if (err) {
          console.error(err);
        } else {
          const mdc = result.MDC;
          console.log("MDC:", mdc);

          // Calculando o Aspect Ratio
          const aspectRatio = calcularAspectRatio(x, y, mdc);
          console.log(
            "Aspect Ratio:",
            aspectRatio.AspectRatioX + ":" + aspectRatio.AspectRatioY
          );
        }
      }
    );
  }
});
