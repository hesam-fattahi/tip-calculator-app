"use strict";

const inputBill = document.querySelector("#bill");

const inputTipRadio = [...document.querySelectorAll(".input--radio")];
const labelTipRadio = [...document.querySelectorAll(".tip-label")];

const inputTipCustom = document.querySelector("#tip--custom");
const labelTipCustom = document.querySelector("#label-custom");

const sectionPeopleCount = document.querySelector(".section--people-count");
const inputPeopleCount = document.querySelector("#people-count");

const labelTipAmount = document.querySelector("#tip-amount");
const labelTotalAmount = document.querySelector("#total-amount");
const btnReset = document.querySelector(".btn-reset");

let bill, tipPercentage, peopleCount;
let share, tipAmount, totalBill;

const init = () => {
  inputBill.value = "";
  inputPeopleCount.value = "";
  inputTipCustom.value = "";
  inputTipRadio.forEach((radio) => (radio.checked = false));

  let bill,
    tipPercentage,
    peopleCount,
    share,
    tipAmount,
    totalBill = undefined;

  labelTotalAmount.textContent = "00.0";
  labelTipAmount.textContent = "00.0";
};

labelTipCustom.addEventListener("click", () => {
  inputTipCustom.classList.remove("hidden");
  labelTipCustom.classList.add("hidden");
  inputTipRadio.forEach((radio) => (radio.checked = false));
});

const setTip = () => {
  inputTipRadio.forEach((radio, i) => {
    if (radio.checked) tipPercentage = parseInt(labelTipRadio[i].textContent);
  });

  if (!tipPercentage) tipPercentage = Number(inputTipCustom.value);
};

const setInputs = () => {
  bill = parseFloat(inputBill.value);

  peopleCount = Number(inputPeopleCount.value);

  setTip();
};

const renderResult = () => {
  setInputs();
  if (bill && tipPercentage && peopleCount) {
    share = bill / peopleCount;
    tipAmount = (share * tipPercentage) / 100;
    totalBill = tipAmount + share;

    labelTipAmount.textContent = tipAmount.toFixed(2);
    labelTotalAmount.textContent = totalBill.toFixed(2);
    btnReset.classList.remove("deactive");
  }
};

inputBill.addEventListener("input", renderResult);
inputPeopleCount.addEventListener("input", () => {
  if (inputPeopleCount.value && Number(inputPeopleCount.value) === 0)
    sectionPeopleCount.classList.add("error");
  else {
    sectionPeopleCount.classList.remove("error");
    renderResult();
  }
});
inputTipCustom.addEventListener("input", () => {
  inputTipRadio.forEach((radio) => (radio.checked = false));
  tipPercentage = inputTipCustom.value;
  renderResult();
});
inputTipRadio.forEach((radio) => {
  radio.addEventListener("click", renderResult);
});

btnReset.addEventListener("click", init);

init();
