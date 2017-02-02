
define(function (require) {
    'use strict';

    const _colorService = require('services/color.service');
    const _colorModel = require('models/color.model');

	localStorage.colors = localStorage.colors || ""

	function renderColors(){
		let doRender = function(colors) {
			document.getElementById('colors').innerHTML = "";

			if(!colors || colors.length == 0)
				return emptyColorsMessage();

			for(let i=0;i<colors.length;i++) {
				let hexColor = colors[i];
				let color = document.createElement('div');
				color.setAttribute('id',hexColor._id);
				color.setAttribute('class',"color");
				color.setAttribute('style',"background-color:#"+hexColor.color);

				color.innerHTML = "<small>#"+hexColor.color+"</small>"
				color.innerHTML += '<span class="remove" onclick="removeColor('+"'"+hexColor.color+"'"+')">x</span>';

				document.getElementById('colors').appendChild(color);
			}
		}

		var colors = _colorService.get()
							.then(function(colors){
								doRender(colors);
							});
	}

	function saveColor(){
		let color = document.getElementById("inputColor").value;
		color = color.replace('#','');

		if(/^[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test(color)){
			let vm = new _colorModel({_id: new Date().getTime(), color: color});

			_colorService.create(vm).then(function(){
				document.getElementById("inputColor").value = "";
				renderColors();
			});
		}

		return false;
	}

	function removeColor(color){
		_colorService.remove({color: color})
			.then(function(){
				renderColors();	
			});
	}

	function checkColorLength(){
			if(document.getElementById('inputColor').value.replace('#','').length > 6)
				document.getElementById('inputColor').value = document.getElementById('inputColor').value.replace('#','').substr(0,6);
	}

	function emptyColorsMessage(){
		let emptyMessage = document.createElement('h1');

		emptyMessage.innerHTML = "save the colors that you ♥ so you'll never lose that nice color again"

		document.getElementById('colors').appendChild(emptyMessage);
	}

	if('serviceWorker' in navigator) {
	  navigator.serviceWorker.register('/serviceworker.js', {
	    scope: '/'
	  });
	}

	//Exporting functions to client
	window.saveColor = saveColor;
	window.removeColor = removeColor;
	window.checkColorLength = checkColorLength;

	//Starting app
	renderColors();
});