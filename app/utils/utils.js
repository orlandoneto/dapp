export const formatTimeFromSeconds = (timestamp) => {
  var data = new Date(timestamp * 1000);

  var horas = ("0" + data.getHours()).slice(-2);
  var minutos = ("0" + data.getMinutes()).slice(-2);
  var segundos = ("0" + data.getSeconds()).slice(-2);

  var horaFormatada = horas + ":" + minutos + ":" + segundos;
  return horaFormatada;
};

export const converterBigNumberParaHora = (bigNumber) => {
  var decimal = BigInt(bigNumber);

  var horas = (decimal / 3600n) % 24n;
  var minutos = (decimal / 60n) % 60n;
  var segundos = decimal % 60n;

  var horaFormatada =
    padZeros(horas.toString()) +
    ":" +
    padZeros(minutos.toString()) +
    ":" +
    padZeros(segundos.toString());

  return horaFormatada;
};

const padZeros = (valor) => {
  return valor.padStart(2, "0");
};
