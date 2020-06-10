//Core
const scriptURL =
	'https://script.google.com/macros/s/AKfycbzgSFga9TjlhJd1ix2kfF8jgOLxELp9dT-oEB9u_JPGiL-e5ms/exec';
const form = document.forms['form'];

//Buttons & fields & current tab url
const buttonOne = document.getElementById('firstresult');
const buttonTwo = document.getElementById('secondresult');
const fieldOne = document.getElementById('Result1');
const fieldTwo = document.getElementById('Result2');
let currentTabUrl = '';

//Getting url from current tab and storing into currentTabUrl variable
setCurrentTabUrl = () => {
	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
		// since only one tab should be active and in the current window at once
		// the return variable should only have one entry
		var activeTab = tabs[0];
		currentTabUrl = activeTab.url;
	});
};

//Handling buttons press
handleButtonOnePress = (e) => {
	e.preventDefault();

	setCurrentTabUrl();

	//! chrome.tabs.query
	//! костыль с таймаутом для проверочки
	setTimeout(() => {
		fieldOne.value = currentTabUrl;
		fieldTwo.value = '-';

		fetch(scriptURL, { method: 'POST', body: new FormData(form) })
			.then((response) => {
				blink('#000000');
				console.log('Success!', response);
			})

			.catch((error) => {
				blink('#000000');
				console.error('Error!', error.message);
			});
	}, 50);
};

handleButtonTwoPress = (e) => {
	e.preventDefault();

	setCurrentTabUrl();

	//! chrome.tabs.query 
	//! костыль с таймаутом для проверочки
	setTimeout(() => {
		fieldOne.value = '-';
		fieldTwo.value = currentTabUrl;

		fetch(scriptURL, { method: 'POST', body: new FormData(form) })
			.then((response) => {
				blink('#000000');
				console.log('Success!', response);
			})

			.catch((error) => {
				blink('#000000');
				console.error('Error!', error.message);
			});
	}, 50);
};

//Adding event listeners
buttonOne.addEventListener('click', handleButtonOnePress);
buttonTwo.addEventListener('click', handleButtonTwoPress);

// blinking bg as a result
function blink(color) {
	document.body.style.background = color;
	setTimeout(() => {
		document.body.style.background = '#000000';
	}, 500);
}
