const $dataName = document.querySelector("[name='Name']");
const $dataLastName = document.querySelector("[name='LastName']");
const $dataEmail = document.querySelector("[name='Email']");
const $dataPhone = document.querySelector("[name='Phone']");
const $data = document.querySelectorAll(".data__input");

const optionDotStyle = document.querySelector("[name='dotStyle']");
const optionDotColor = document.querySelector("[name = 'dotColor']");
const optionSquareStyle = document.querySelector("[name = 'cornerStyle']");
const optionSquareColor = document.querySelector("[name = 'cornerColor']");
const optionSquareDotStyle = document.querySelector("[name = 'cornerDotStyle']");
const optionSquareDotColor = document.querySelector("[name = 'cornerDotColor']");
const optionBgColor = document.querySelector("[name = 'backgroundColor']");
const optionImgColor = document.querySelector("[name = 'imageColor']");
const options = document.querySelectorAll("select, input[type='color']");

const buttons = document.querySelector(".button")
const qrContainer = document.getElementById("qr");

const regexNames = /^[A-Za-zñÑáéíóúÁÉÍÓÚ]{1,15}$/i;
const regexPhone = /^\+?\d{1,15}$/;
const regexMail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

let settingQR = {};
let vcard = vcardTemplate();

function vcardTemplate() {
  return `BEGIN:VCARD
VERSION:3.0
N:${$dataLastName.value};${$dataName.value}
FN:${$dataName.value} ${$dataLastName.value}
TEL;CELL:${$dataPhone.value}
EMAIL:${$dataEmail.value}
END:VCARD`;
}

let imgcon = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
<path fill="${encodeURIComponent(optionImgColor.value)}" d="M0 96l576 0c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96zm0 32V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128H0zM64 405.3c0-29.5 23.9-53.3 53.3-53.3H234.7c29.5 0 53.3 23.9 53.3 53.3c0 5.9-4.8 10.7-10.7 10.7H74.7c-5.9 0-10.7-4.8-10.7-10.7zM176 192a64 64 0 1 1 0 128 64 64 0 1 1 0-128zm176 16c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16z"/></svg>`;






settingQR = {
  type: "svg",
  data: vcard,
  image: imgcon,
  imageOptions: {
    imageSize: 0.3,
    margin: 3
  },
  dotsOptions: {
    type: optionDotStyle.value,
    color: optionDotColor.value
  },
  backgroundOptions: {
    color: optionBgColor.value
  },
  cornersSquareOptions: {
    type: optionSquareStyle.value,
    color: optionSquareColor.value
  },
  cornersDotOptions: {
    type: optionSquareDotStyle.value,
    color: optionSquareDotColor.value
  },
}
let qrCode = new QRCodeStyling(settingQR);

buttons.addEventListener("click", (e) => {
  if (e.target.getAttribute("id") === "generateQr") {
    if (!qrContainer.innerHTML) {
      generateQR();
    } else {
      updateQR();
    }
  }
  if (e.target.getAttribute("id") === "clear") {
    clear();
  }
  if (e.target.getAttribute("id") === "download") {
    download();
  }
})


function generateQR() {
  if (validateData()) {
    qrCode.append(qrContainer);
    enableOptions();
  } else {
    dataError();
  }
}

function validateData() {
  return true;
}

function enableOptions() {
  Array.from(options).forEach((e) => {
    e.disabled = false;
  })
}
function disableOptions() {
  Array.from(options).forEach((e) => {
    e.disabled = true;
  })
}

function clear() {
  qrContainer.innerHTML = "";
  Array.from($data).forEach((e) => {
    e.value = "";
  })
  vcard = vcardTemplate();
  settingQR.data = vcard;
  qrCode = new QRCodeStyling(settingQR);
  disableOptions();
}

function checkData(element) {
  let regExpresion = "";
  if ((element.getAttribute("name") === "Name") || (element.getAttribute("name") === "LastName")) {
    regExpresion = regexNames;
  }
  if (element.getAttribute("name") === "Phone") {
    regExpresion = regexPhone;
  }
  if (element.getAttribute("name") === "Email") {
    regExpresion = regexMail;
  }
  if (regExpresion.test(element.value)) {
    element.classList.add("data__input--succes")
    element.classList.remove("data__input--error")
  } else {
    element.classList.add("data__input--error")
    element.classList.remove("data__input--succes")
  }

}

document.getElementById("data").addEventListener("change", (e) => {
  checkData(e.target);
})