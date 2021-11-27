"use strict";

const coverPageButton = document.querySelector(".cover-page-button");
const submitFemale = document.querySelector(".submit-female");
const submitMale = document.querySelector(".submit-male");
const submitHeight = document.querySelector(".height-button");
const submitWeight = document.querySelector(".weight-button");
const ActualWeightImg = document.querySelector(".actual-weight-img");
const resetButton = document.querySelector(".reset-button");

let originalHeight, originalWeight, BMI, female, weightType, ideal;
const reset = function () {
  originalHeight = 0;
  originalWeight = 0;
  BMI = 0;
  female = true;
  weightType = [];
  ideal = true;
  document.querySelector(".weight-input").value = "";
  document.querySelector(".height-input").value = "";
  document.querySelector(".cover-page").classList.remove("hidden");
  document.querySelector(".BMI-page").classList.add("hidden");
};

reset();

const imgType = function () {
  weightType = document.querySelector(".weight-type").textContent;
  if (female) {
    ActualWeightImg.src = `${weightType}woman.jpeg`;
  } else {
    ActualWeightImg.src = `${weightType}man.jpeg`;
  }
};

const analysis = function () {
  if (!ideal) {
    document.querySelector(".analysis").textContent =
      "Understandable, the majority of Americans' weight today is not ideal.";
  } else if (ideal) {
    document.querySelector(".analysis").textContent =
      "Amazing, you are of the minority of Americans today.";
  }
};

const idealWeightCalc = function (number) {
  const idealBMInum = number;
  const newWeight = Math.trunc(
    (idealBMInum * (originalHeight * originalHeight)) / 703
  );
  document.querySelector(".ideal-weight-num").textContent = newWeight;
  document.querySelector(".idealBMInum").textContent = number;
};

coverPageButton.addEventListener("click", function () {
  document.querySelector(".cover-page").classList.add("hidden");
  document.querySelector(".gender-page").classList.remove("hidden");
});
submitFemale.addEventListener("click", function () {
  document.querySelector(".gender-page").classList.add("hidden");
  document.querySelector(".height-page").classList.remove("hidden");
  document.querySelector(".height-woman").classList.remove("hidden");
});
submitMale.addEventListener("click", function () {
  document.querySelector(".gender-page").classList.add("hidden");
  document.querySelector(".height-page").classList.remove("hidden");
  document.querySelector(".height-man").classList.remove("hidden");
  female = false;
});
submitHeight.addEventListener("click", function () {
  document.querySelector(".height-man").classList.add("hidden");
  document.querySelector(".height-woman").classList.add("hidden");
  document.querySelector(".height-page").classList.add("hidden");
  document.querySelector(".weight-page").classList.remove("hidden");
});

submitHeight.addEventListener("click", function () {
  const height = Number(document.querySelector(".height-input").value);
  originalHeight = +height;
});

submitWeight.addEventListener("click", function () {
  const weight = Number(document.querySelector(".weight-input").value);
  originalWeight += weight;
  BMI = (originalWeight * 703) / originalHeight ** 2;
  document.querySelector(".weight-page").classList.add("hidden");
  document.querySelector(".BMI-page").classList.remove("hidden");
  document.querySelector(".BMI-num").textContent = BMI;
  if (BMI < 18.5) {
    ideal = false;
    document.querySelector(".weight-type").textContent = "underweight";
    weightType = document.querySelector(".weight-type").textContent;
    document.querySelector(".weight-type").style.backgroundColor = "yellow";
    document.querySelector(".ideal-weight-charts").classList.add("hidden");
    imgType();
    analysis();
    idealWeightCalc(18.5);
  } else if (BMI > 18.5 && BMI < 24.9) {
    ideal = true;
    document.querySelector(".weight-type").textContent = "normal";
    document.querySelector(".weight-type").style.backgroundColor = "green";
    weightType = document.querySelector(".weight-type").textContent;
    document.querySelector(".ideal-weight-paragraph").classList.add("hidden");
    if (female) {
      ActualWeightImg.src = `${weightType}woman.jpeg`;
    } else {
      ActualWeightImg.src = `${weightType}man.jpg`;
    }
    analysis();
  } else if (BMI > 25 && BMI < 29.9) {
    ideal = false;
    document.querySelector(".weight-type").textContent = "overweight";
    document.querySelector(".weight-type").style.backgroundColor = "yellow";
    weightType = document.querySelector(".weight-type").textContent;
    imgType();
    analysis();
    idealWeightCalc(24);
  } else if (BMI > 30) {
    ideal = false;
    document.querySelector(".weight-type").style.backgroundColor = "red";
    document.querySelector(".weight-type").textContent = "obese";
    weightType = document.querySelector(".weight-type").textContent;
    imgType();
    analysis();
    idealWeightCalc(24);
  }
});
resetButton.addEventListener("click", reset);
