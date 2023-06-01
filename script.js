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
const buttonGenerateQr = document.getElementById("generateQr");
const buttonClear = document.getElementById("clear");
const qrContainer = document.getElementById("qr");
const message = document.querySelector(".info__message");

const regexNames = /^[A-Za-zñÑáéíóúÁÉÍÓÚ]{1,15}$/i;
const regexPhone = /^\+?\d{1,15}$/;
const regexMail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const inputError = {
  input_name: null,
  input_lastName: null,
  input_phone: null,
  input_email: null
}

let qrCode = "";


function vcardTemplate() {
  return `BEGIN:VCARD
VERSION:3.0
N:${$dataLastName.value};${$dataName.value}
FN:${$dataName.value} ${$dataLastName.value}
TEL;CELL:${$dataPhone.value}
EMAIL:${$dataEmail.value}
END:VCARD`
}

function imgTemplate() {
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
<path fill="${encodeURIComponent(optionImgColor.value)}" d="M0 96l576 0c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96zm0 32V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128H0zM64 405.3c0-29.5 23.9-53.3 53.3-53.3H234.7c29.5 0 53.3 23.9 53.3 53.3c0 5.9-4.8 10.7-10.7 10.7H74.7c-5.9 0-10.7-4.8-10.7-10.7zM176 192a64 64 0 1 1 0 128 64 64 0 1 1 0-128zm176 16c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16z"/></svg>`
}

buttons.addEventListener("click", (e) => {
  if (e.target.getAttribute("id") === "generateQr") {
    enableOptions();
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
  qrCode = new QRCodeStyling(getValues());
  qrCode.append(qrContainer)
}

function updateQR() {
  qrCode.update(getValues())
}

function getValues() {
  return {
    type: "svg",
    data: vcardTemplate(),
    image: imgTemplate(),
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
    }
  }
}

function enableOptions() {
  Array.from(options).forEach((e) => {
    enableItem(e)
  })
}
function disableOptions() {
  Array.from(options).forEach((e) => {
    disableItem(e)
  })
}

function disableItem(item) {
  item.disabled = true;
}

function enableItem(item) {
  item.disabled = false;
}

function clear() {
  qrContainer.innerHTML = "";
  Array.from($data).forEach((e) => {
    e.value = "";
  })
  Array.from($data).forEach((e) => {
    e.classList.remove("data__input--error")
    e.classList.remove("data__input--succes")
  })
  disableOptions();
  disableItem(buttonClear)
  disableItem(buttonGenerateQr)
  message.classList.remove("info__message--error")
  message.innerHTML = "Enter the data to generate the code"

}

function checkData(element) {
  const objectElement = {
    regExpresion: "",
    checkElement() {
      if (this.regExpresion.test(element.value)) {
        element.classList.add("data__input--succes")
        element.classList.remove("data__input--error")
        return true;
      } else if (element.value === "") {
        element.classList.remove("data__input--error")
        element.classList.remove("data__input--succes")
        return null
      } else {
        element.classList.add("data__input--error")
        element.classList.remove("data__input--succes")
        message.classList.add("info__message--error")
        message.innerHTML = "Enter a valid value"
        return false;
      }
    },
    checkError() {
      if (!Object.values(inputError).includes(false)) {
        message.classList.remove("info__message--error")
        message.innerHTML = "Enter the data to generate the code"
      }
    }
  }
  if (element.getAttribute("name") === "Name") {
    objectElement.regExpresion = regexNames;
    inputError.input_name = objectElement.checkElement()
    objectElement.checkError();
  }
  if (element.getAttribute("name") === "LastName") {
    objectElement.regExpresion = regexNames;
    inputError.input_lastName = objectElement.checkElement()
    objectElement.checkError();
  }
  if (element.getAttribute("name") === "Phone") {
    objectElement.regExpresion = regexPhone;
    inputError.input_phone = objectElement.checkElement()
    objectElement.checkError();
  }
  if (element.getAttribute("name") === "Email") {
    objectElement.regExpresion = regexMail;
    inputError.input_email = objectElement.checkElement()
    objectElement.checkError();
  }
  if (!Object.values(inputError).includes(false) && $dataName.value && $dataPhone.value)
    enableItem(buttonGenerateQr)
  else
    disableItem(buttonGenerateQr)
  if (Object.values(inputError).includes(true) || Object.values(inputError).includes(false))
    enableItem(buttonClear)
  else
    disableItem(buttonClear)
}

document.addEventListener("change", (e) => {
  if (e.target.classList.contains("data__input")) {
    checkData(e.target);
  } else {
    updateQR()
  }
})