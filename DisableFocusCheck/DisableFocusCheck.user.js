/* ==UserScript==
@name         DisableFocusChecking
@author       Delta
@description  Webpages should always think they are in focus when using this.
@version      0.1
@namespace    https://github.com/XDelta/UserScripts/
@supportURL   https://github.com/XDelta/UserScripts/issues
@updateURL    https://github.com/XDelta/UserScripts/DisableFocusCheck/DisableFocusCheck.meta.js
@downloadURL  https://github.com/XDelta/UserScripts/DisableFocusCheck/DisableFocusCheck.user.js
@grant        none
@include      *
@run-at document-start
==/UserScript== */

document.hasFocus = function () {return true;};

Object.defineProperty(document, "hidden", { value : false});

document.addEventListener("DOMContentLoaded", function () {
	window.onblur = undefined;
	window.blurred = false;
});
