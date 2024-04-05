//? Global Variables

//? selecting section
const openModalBtn = document.querySelector("#open-modal");
const closeModalBtns = document.querySelectorAll(".close-modal");
const backdrop = document.querySelector(".backdrop");
const modal = document.querySelector(".modal");

//? codes section
closeModalBtns.forEach((btn) => btn.addEventListener("click", closeModal));
backdrop.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => e.stopPropagation());
//? functions
function openModal(e) {
  backdrop.classList.remove("hidden");
}

function closeModal(e) {
  backdrop.classList.add("hidden");
}

/* ####      #####  ------------------------------------------- */
/* ## ##     ## ##              *    *  By: Moji                */
/* ##  ##   ##  ##  ######  ###### ##  S.Mojtaba Sadatpour      */
/* ##   ## ##   ##  ##  ##    ##   ##  sadatpour.web@gmail.com  */
/* ##    ###    ##  ##  ##    ##   ##  Git:Sadatpour            */
/* ##    ###    ##  ######  ####   ##  www.sadatpour.com        */
/* ------------------------------------------------------------ */
