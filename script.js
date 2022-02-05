const screenCalc = document.querySelector(".calculation");
const screenAns = document.querySelector(".answer");

const inputButtons = document.querySelectorAll(".number, .operator");
const equalsButton = document.querySelector(".equals");

let calcText = "";
let calcValues = [];
let ansValue;

// converting strings to numbers is SOOO ANNOYING
function strIsNum(str) {

	if(Number.isNaN(+str)) return false;
	if(str == "") return false;

	return true;

}

// for when you press a number or operator button
function addToCalc(input) {

	const finalValue = calcValues[calcValues.length - 1];

	// number
	if(strIsNum(input)) {
	
		if(strIsNum(finalValue))
			calcText += input;
		else if(finalValue != "Ans")
			calcText += "  " + input;

	// Ans
	} else if(input == "Ans") {
	
		if(!strIsNum(finalValue) && finalValue != "Ans")
			calcText += "  " + input;

	// operators
	} else {
	
		if(strIsNum(finalValue) || finalValue == "Ans")
			calcText += "  " + input;
	
	}

	screenCalc.textContent = calcText;

	// sync the array with the text
	calcValues = calcText.slice(2).split("  ");

}

// add function to input buttons
inputButtons.forEach(function (button) {

	button.onclick = () => addToCalc(button.textContent);

});

// does the calculation on the screen
function evaluate() {

	// checks if calculation is possible
	if(calcValues.length != 3)
		return;

	// read values from the screen (should be the same as stuff in array)
	const a = calcValues[0];
	const b = calcValues[2];
	const op = calcValues[1];
	
	switch(op) {
	
		case "*":
			ansValue = a * b;
			break;
		case "/":
			ansValue = a / b;
			break;
		case "+":
			ansValue = a + b;
			break;
		case "-":
			ansValue = a - b;
			break
	
	}

}