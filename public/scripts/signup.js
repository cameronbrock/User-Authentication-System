
var password_input1 = document.getElementById("signup-password1");
var password_input2 = document.getElementById("signup-password2");
var password_status = document.getElementById("password-status");

var email_input = document.getElementById("signup-email");
const email_regex = "([A-Za-z0-9]+)((\\.)[A-Za-z0-9]+)*\\@([A-Za-z0-9]+)((\\.)([A-Za-z0-9]+))+";
var email_status = document.getElementById("email-status");

var valid_email_input = false;
var valid_password_input = false;

var submit_btn = document.getElementById("signup-submit-btn");

var submit_button_status = document.getElementById("submit-status");
submit_btn.disabled = true;

const checkSubmitBtnStatus = function() {
	//alert('checkSubmitBtnStatus called');
	if (valid_email_input && valid_password_input) {
		submit_button_status.innerHTML = "<span style='color: green'>Submit valid</span>";
		submit_btn.disabled = false;
	}
	else {
		submit_button_status.innerHTML = "<span style='color: red'>Submit invalid</span>";
		submit_btn.disabled = true;
	}
}


const checkPasswordMatchingStatus = function(event) {

	if (password_input1.value == password_input2.value) {
		password_status.innerHTML = "<span style='color: green'>Passwords match</span>";
		//submit_btn.disabled = false;
		valid_password_input = true;
	}
	else {
		password_status.innerHTML = "<span style='color: red'>Passwords do not match</span>";
		//submit_btn.disabled = true;
		valid_password_input = false;
	}
	
	checkSubmitBtnStatus();
	
}

const checkValidEmailStatus = function(event) {
	const givenEmailValue = email_input.value;
	if (givenEmailValue.match(email_regex)) {
		email_status.innerHTML = "<span style='color: green'>Email valid</span>";
		valid_email_input = true;
		email_input.setCustomValidity("");
	}
	else {
		email_status.innerHTML = "<span style='color: red'>Email invalid</span>";
		valid_email_input = false;
		email_input.setCustomValidity("You must provide a valid email address.");
	}
	
	checkSubmitBtnStatus();
}

password_input1.addEventListener("input", checkPasswordMatchingStatus);
password_input2.addEventListener("input", checkPasswordMatchingStatus);

email_input.addEventListener("input", checkValidEmailStatus);

/**********************

Implementaton for switching the colors of the buttons

**********************/

var signup_button = document.getElementById("signup-button");
var login_button = document.getElementById("login-button");

var signup_form = {
	button: document.getElementById("signup-button"),
	form: document.getElementById("signup-form")
};

var login_form = {
	button: document.getElementById("login-button"),
	form: document.getElementById("login-form")
};

const switch_buttons = function(form1, form2) {
	const nonSelectedBtn = "non-selected-btn";
	const selectedBtn = "selected-btn";
	const invisibleElement = "invisible-element";
	
	form2.button.classList.remove(nonSelectedBtn);
	form2.button.classList.add(selectedBtn);
	form2.form.classList.remove(invisibleElement);
	form1.button.classList.remove(selectedBtn);
	form1.button.classList.add(nonSelectedBtn);
	form1.form.classList.add(invisibleElement);
}

signup_form.button.addEventListener("click", (event) => switch_buttons(login_form, signup_form));
login_form.button.addEventListener("click", (event) => switch_buttons(signup_form, login_form));

