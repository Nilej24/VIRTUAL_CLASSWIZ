const screenCalc = document.querySelector(".calculation");
const screenAns = document.querySelector(".answer");

const inputButtons = document.querySelectorAll(".number, .operator");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const delButton = document.querySelector(".delete");

let calcText = "";
let calcValues = [];
let ansValue;

let justEvaluated = false;

// converting strings to numbers is SOOO ANNOYING
function isNum(str) {

	if(Number.isNaN(+str)) return false;
	if(str === "") return false;

	return true;

}

// for when you press a number or operator button
function addToCalc(input) {

	// for checking if inputs are possible
	const finalValue = calcValues[calcValues.length - 1];

	// number
	if(isNum(input)) {

		if(isNum(finalValue))
			calcText += input;
		else if(finalValue != "Ans")
			calcText += "  " + input;
		else
			return;

	// Ans
	} else if(input == "Ans") {
	
		if(!isNum(finalValue) && finalValue != "Ans")
			calcText += "  " + input;
		else
			return;

	// operators
	} else {
	
		if(isNum(finalValue) || finalValue == "Ans")
			calcText += "  " + input;
		else
			return;
	
	}

	screenCalc.textContent = calcText;

	// sync the array with the text
	calcValues = calcText.slice(2).split("  ");

}
// add function to input buttons
inputButtons.forEach(function (button) {

	button.onclick = () => addToCalc(button.textContent);

});

// clears calculation (but keeps answer value stored)
function clear() {

	calcText = "";
	calcValues = [];
	screenCalc.textContent = "";
	screenAns.textContent = "";

}
clearButton.onclick = clear;

// deletes the last part of the calculation
function del() {

	calcValues.pop();
	if(calcText !== "")
		calcText = "  " + calcValues.join("  ");
	screenCalc.textContent = calcText;

}
delButton.onclick = del;

// does the calculation on the screen
function evaluate() {

	// checks if calculation is possible
	if(calcValues.length != 3)
		return;

	// read values from the screen (should be the same as stuff in array)
	const a = calcValues[0] == "Ans" ? ansValue : +calcValues[0];
	const b = calcValues[2] == "Ans" ? ansValue : +calcValues[2];
	const op = calcValues[1];
	
	// does the right operation
	switch(op) {
	
		case "*":
			ansValue = a * b;
			break;
		case "/":
			if(b == 0) {
				alert("ew");
				return;
			}
			ansValue = a / b;
			break;
		case "+":
			ansValue = a + b;
			break;
		case "-":
			ansValue = a - b;
			break;
	
	}

	screenAns.textContent = ansValue;

	justEvaluated = true;

}
equalsButton.onclick = evaluate;