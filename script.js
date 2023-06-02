const $data = document.querySelectorAll(".data__input"),
  $options = document.querySelectorAll("select, input[type='color']"),
  $buttons = document.querySelector(".button"),
  $buttonGenerateQr = document.getElementById("generateQr"),
  $buttonClear = document.getElementById("clear"),
  $buttonDownload = document.getElementById("download"),
  $qrContainer = document.getElementById("qr"),
  $message = document.querySelector(".info__message"),

  regexNames = /^[A-Za-zñÑáéíóúÁÉÍÓÚ]{1,15}$/i,
  regexPhone = /^\+?\d{1,15}$/,
  regexMail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
  inputError = {
    input_name: null,
    input_lastName: null,
    input_phone: null,
    input_email: null
  }
let qrCode = "";

const getIndex = (vector, condition) => Array.from(vector).findIndex((e) => e.getAttribute("name") === condition)
const enableItem = (item) => item.disabled = false;
const disableItem = (item) => item.disabled = true;
const enableOptions = () => $options.forEach((e) => enableItem(e))
const disableOptions = () => $options.forEach((e) => disableItem(e))

const messageError = (condition) => {
  if (condition) {
    $message.classList.add("info__message--error")
    $message.innerHTML = "Enter a valid value"
  } else {
    $message.classList.remove("info__message--error")
    $message.innerHTML = "Enter the data to generate the code"
  }
}
const checkElement = (regExp, element) => {
  if (regExp.test(element.value)) {
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
    messageError(true)
    return false;
  }
}
const checkError = () => {
  if (!Object.values(inputError).includes(false))
    messageError(false)
}
const checkData = (element) => {
  if (element.getAttribute("name") === "Name")
    inputError.input_name = checkElement(regexNames, element)
  if (element.getAttribute("name") === "LastName")
    inputError.input_lastName = checkElement(regexNames, element)
  if (element.getAttribute("name") === "Phone")
    inputError.input_phone = checkElement(regexPhone, element)
  if (element.getAttribute("name") === "Email")
    inputError.input_email = checkElement(regexMail, element)
  checkError();
  if (!Object.values(inputError).includes(false) && Array.from($data)[getIndex($data, "Name")].value && Array.from($data)[getIndex($data, "Phone")].value)
    enableItem($buttonGenerateQr)
  else
    disableItem($buttonGenerateQr)
  if (Object.values(inputError).includes(true) || Object.values(inputError).includes(false))
    enableItem($buttonClear)
  else
    disableItem($buttonClear)
}
const clear = () => {
  $qrContainer.innerHTML = "";
  $data.forEach((e) => e.value = "")
  $data.forEach((e) => {
    e.classList.remove("data__input--error")
    e.classList.remove("data__input--succes")
  })
  Array.from($options)[getIndex($options, "dotStyle")].value = "square"
  Array.from($options)[getIndex($options, "dotColor")].value = "#182c2b"
  Array.from($options)[getIndex($options, "cornerStyle")].value = ""
  Array.from($options)[getIndex($options, "cornerColor")].value = "#182c2b"
  Array.from($options)[getIndex($options, "cornerDotStyle")].value = ""
  Array.from($options)[getIndex($options, "cornerDotColor")].value = "#d53839"
  Array.from($options)[getIndex($options, "imageColor")].value = "#d53839"
  Array.from($options)[getIndex($options, "backgroundColor")].value = "#fffffd"
  Array.from($options)[getIndex($options, "extension")].value = "png"
  disableOptions();
  disableItem($buttonClear)
  disableItem($buttonGenerateQr)
  disableItem($buttonDownload)
  messageError(false);
}
const vcardTemplate = () => {
  return `BEGIN:VCARD
VERSION:3.0
N:${Array.from($data)[getIndex($data, "LastName")].value};${Array.from($data)[getIndex($data, "Name")].value}
FN:${Array.from($data)[getIndex($data, "Name")].value} ${Array.from($data)[getIndex($data, "LastName")].value}
TEL;CELL:${Array.from($data)[getIndex($data, "Phone")].value}
EMAIL:${Array.from($data)[getIndex($data, "Email")].value}
END:VCARD`
}
const imgTemplate = () => {
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
<path fill="${encodeURIComponent(Array.from($options)[getIndex($options, "imageColor")].value)}" d="M0 96l576 0c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96zm0 32V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128H0zM64 405.3c0-29.5 23.9-53.3 53.3-53.3H234.7c29.5 0 53.3 23.9 53.3 53.3c0 5.9-4.8 10.7-10.7 10.7H74.7c-5.9 0-10.7-4.8-10.7-10.7zM176 192a64 64 0 1 1 0 128 64 64 0 1 1 0-128zm176 16c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16z"/></svg>`
}
const getValues = () => {
  return {
    type: "svg",
    data: vcardTemplate(),
    image: imgTemplate(),
    imageOptions: {
      imageSize: 0.3,
      margin: 3
    },
    dotsOptions: {
      type: Array.from($options)[getIndex($options, "dotStyle")].value,
      color: Array.from($options)[getIndex($options, "dotColor")].value
    },
    backgroundOptions: {
      color: Array.from($options)[getIndex($options, "backgroundColor")].value
    },
    cornersSquareOptions: {
      type: Array.from($options)[getIndex($options, "cornerStyle")].value,
      color: Array.from($options)[getIndex($options, "cornerColor")].value
    },
    cornersDotOptions: {
      type: Array.from($options)[getIndex($options, "cornerDotStyle")].value,
      color: Array.from($options)[getIndex($options, "cornerDotColor")].value
    }
  }
}
const generateQR = () => {
  qrCode = new QRCodeStyling(getValues());
  qrCode.append($qrContainer)
}
const updateQR = () => qrCode.update(getValues())

const downloadQR = () => {
  qrCode.download({
    name: "vCard",
    extension: Array.from($options)[getIndex($options, "extension")].value
  })
}

document.addEventListener("change", (e) => {
  if (e.target.classList.contains("data__input"))
    checkData(e.target);
  else if (e.target.getAttribute("name") != "extension")
    updateQR()
})
$buttons.addEventListener("click", (e) => {
  if (e.target.getAttribute("id") === "generateQr") {
    enableOptions();
    enableItem($buttonDownload)
    if (!$qrContainer.innerHTML)
      generateQR();
    else
      updateQR();
  }
  if (e.target.getAttribute("id") === "clear")
    clear();
  if (e.target.getAttribute("id") === "download")
    downloadQR();
})