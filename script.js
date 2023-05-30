const datos = document.getElementById("data");
const foo = document.getElementById("ff");

datos.addEventListener("change", (e) => {
  console.log(e.target.value);
})

var colore = "#d53839";


var imgcon = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
<path fill="${encodeURIComponent(colore)}" d="M0 96l576 0c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96zm0 32V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128H0zM64 405.3c0-29.5 23.9-53.3 53.3-53.3H234.7c29.5 0 53.3 23.9 53.3 53.3c0 5.9-4.8 10.7-10.7 10.7H74.7c-5.9 0-10.7-4.8-10.7-10.7zM176 192a64 64 0 1 1 0 128 64 64 0 1 1 0-128zm176 16c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16z"/></svg>`;

function mostrarQR() {
  let comprobarQr = false;
  if (comprobarQr) {
    QR.innerHTML = '';
  }
  comprobarQr = true,
    nombre = "alberto",
    apellido = "mandoca",
    correo = "albert.gomes34@gmail.com",
    telefono = 4878776,
    web = "google.com",

    vcard =
    `BEGIN:VCARD
VERSION:3.0
N:${apellido};${nombre}
FN:${nombre} ${apellido}
TEL;CELL:${telefono}
EMAIL:${correo}
URL:${web}
END:VCARD`;

  const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    type: "svg",
    data: vcard,
    margin: 0,
    qrOptions: {
      typeNumber: 0,
      mode: "Byte",
      errorCorrectionLevel: "Q"
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.6,
      margin: 4
    },
    dotsOptions: {
      type: "extra-rounded",
      color: "#182c2b"
    },
    backgroundOptions: {
      color: "#ffffff"
    },
    image: imgcon,
    dotsOptionsHelper: {
      colorType: {
        single: true,
        gradient: false
      },
      gradient: {
        linear: true,
        radial: false,
        color1: "#6a1a4c",
        color2: "#6a1a4c",
        rotation: 0
      }
    },
    cornersSquareOptions: { type: "extra-rounded", color: "#182c2b" },
    cornersSquareOptionsHelper: {
      colorType: { single: true, gradient: false },
      gradient: { linear: true, radial: false, color1: "#000000", color2: "#000000", rotation: 0 }
    },
    cornersDotOptions: { type: "", color: "#d53839" },
    cornersDotOptionsHelper: {
      colorType: { single: true, gradient: false },
      gradient: { linear: true, "radial": false, color1: "#000000", color2: "#000000", rotation: 0 }
    },
    backgroundOptionsHelper: {
      colorType: { single: true, gradient: false },
      gradient: { linear: true, radial: false, color1: "#ffffff", color2: "#ffffff", rotation: 0 }
    }
  }
  );

  qrCode.append(document.getElementById("qr"));
}

document.getElementById("generarQr").addEventListener("click", () => {
  mostrarQR();
})