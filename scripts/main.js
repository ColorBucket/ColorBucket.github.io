
'use strict';

localStorage.colors = localStorage.colors || ""

function renderColors(){
	var colors = localStorage.colors.split(";");

	document.getElementById('colors').innerHTML = "";
	for(let i=0;i<colors.length;i++){
		let hexColor = colors[i];
		let color = document.createElement('div');
		color.setAttribute('id',hexColor);
		color.setAttribute('class',"color");
		color.setAttribute('style',"background-color:#"+hexColor);

		color.innerHTML = "<small>#"+hexColor+"</small>"
		color.innerHTML += '<span class="remove" onclick="removeColor('+"'"+hexColor+"'"+')">x</span>';

		if(hexColor != "")
			document.getElementById('colors').appendChild(color);
		else
			emptyColorsMessage();
	}
}
renderColors();

function saveColor(){
	let color = document.getElementById("inputColor").value;
	color = color.replace('#','');

	if(/^[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test(color)){
		if(localStorage.colors !== "") localStorage.colors = localStorage.colors + ";";
		localStorage.colors += color;
		document.getElementById("inputColor").value = "";
		renderColors();
	}

	return false;
}

function removeColor(color){
	localStorage.colors = localStorage.colors.replace(new RegExp(';'+color, 'g'), '');
	localStorage.colors = localStorage.colors.replace(new RegExp(color+';', 'g'), '');
	localStorage.colors = localStorage.colors.replace(new RegExp(color, 'g'), '');
	renderColors();
}

function checkColorLength(){
		if(document.getElementById('inputColor').value.replace('#','').length > 6)
			document.getElementById('inputColor').value = document.getElementById('inputColor').value.replace('#','').substr(0,6);
}

function emptyColorsMessage(){
	emptyMessage = document.createElement('h1');

	emptyMessage.innerHTML = "save the colors that you ♥ so you'll never lose that nice color again"

	document.getElementById('colors').appendChild(emptyMessage);
}

if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceworker.js', {
    scope: '/'
  });
}