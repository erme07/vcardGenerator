import utilities from './functions.js'

const $buttons = document.querySelector(".button");

document.addEventListener("change", (e) => {
  if (e.target.classList.contains("data__input"))
    utilities.checkData(e.target);
  else if (e.target.getAttribute("name") != "extension")
    utilities.updateQR()
})
$buttons.addEventListener("click", (e) => {
  if (e.target.getAttribute("id") === "generateQr") {
    utilities.enableOptions();
    utilities.enableItem(utilities.$buttonDownload)
    if (!utilities.$qrContainer.innerHTML)
      utilities.generateQR();
    else
      utilities.updateQR();
  }
  if (e.target.getAttribute("id") === "clear")
    utilities.clear();
  if (e.target.getAttribute("id") === "download")
    utilities.downloadQR();
})