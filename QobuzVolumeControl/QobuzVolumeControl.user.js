// ==UserScript==
// @name         Qobuz Volume Control
// @author       XDelta
// @version      0.1.0
// @description  Adds a volume control to the Qobuz audio player
// @namespace    https://github.com/XDelta/UserScripts/
// @supportURL   https://github.com/XDelta/UserScripts/issues
// @updateURL    https://github.com/XDelta/UserScripts/raw/main/QobuzVolumeControl/QobuzVolumeControl.meta.js
// @downloadURL  https://github.com/XDelta/UserScripts/raw/main/QobuzVolumeControl/QobuzVolumeControl.user.js
// @match        https://www.qobuz.com/*
// @grant        none
// ==/UserScript==


(function() {
	'use strict';

	var audioPlayer = document.querySelector('.player audio');

	var volumeControl = document.createElement('input');
	volumeControl.type = 'range';
	volumeControl.min = 0;
	volumeControl.max = 1;
	volumeControl.step = 0.01;

	volumeControl.value = localStorage.getItem('qobuz_volume') || 0.5;
	audioPlayer.volume = parseFloat(volumeControl.value);

	// Update the volume of the audio player and store it in local storage
	volumeControl.addEventListener('input', function() {
		audioPlayer.volume = parseFloat(this.value);
		localStorage.setItem('qobuz_volume', this.value);
	});

	var playerHeader = document.querySelector('.player__header');
	playerHeader.appendChild(volumeControl);
})();