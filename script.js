const screenCalc = document.querySelector(".calculation");
const screenAns = document.querySelector(".answer");

const inputButtons = document.querySelectorAll(".number, .operator, .point");
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
	let finalValue = calcValues[calcValues.length - 1] || "";

	// number
	if(isNum(input)) {

		if(justEvaluated)
			calcText = "";

		if(calcText == "")
			calcText = input;
		else if(isNum(finalValue) || finalValue == ".")
			calcText += input;
		else if(finalValue != "Ans")
			calcText += "  " + input;
		else
			return;

	// Ans
	} else if(input == "Ans") {
	
		if(justEvaluated)
			calcText = "";

		if(calcText == "")
			calcText = input;
		else if(!isNum(finalValue) && finalValue != "Ans")
			calcText += "  " + input;
		else
			return;

	// point
	} else if(input == ".") {

		if(finalValue.includes(".") && !justEvaluated)
			return;

		if(justEvaluated)
			calcText = "";

		if(calcText == "")
			calcText = input;
		else if(isNum(finalValue))
			calcText += input;
		else if(finalValue != "Ans")
			calcText += "  " + input;
		else
			return;

	// operators
	} else {
	
		if(justEvaluated)
			calcText = "Ans";
		else if(calcValues.length == 3) {
		
			evaluate();
			calcText = "Ans";
		
		}

		if(isNum(finalValue) || finalValue == "Ans")
			calcText += "  " + input;
		else
			return;
	
	}

	screenCalc.textContent = calcText;

	// sync the array with the text
	calcValues = calcText.split("  ");

	justEvaluated = false;

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

	justEvaluated = false;

}
clearButton.onclick = clear;

// deletes the last part of the calculation
function del() {

	calcValues.pop();
	calcText = calcValues.join("  ");
	screenCalc.textContent = calcText;

	justEvaluated = false;

}
delButton.onclick = del;

// does the calculation on the screen
function evaluate() {

	// checks if calculation is possible
	if(calcValues.length != 3 && calcValues.length != 1)
		return;

	// for sorting out some annoying stuff
	justEvaluated = true;

	// for the case where it's literally just a value
	if(calcValues.length == 1) {
	
		ansValue = calcValues[0] == "Ans" ? ansValue : +calcValues[0];
		screenAns.textContent = ansValue;
		return;
	
	}

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

}
equalsButton.onclick = evaluate;