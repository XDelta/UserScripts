// ==UserScript==
// @name         MergeWithPreferredEmail
// @author       XDelta
// @description  Attempt to swap a merge to your preferred email to avoid accidently merging with another email address on your account.
// @version      0.1.0
// @namespace    https://github.com/XDelta/UserScripts/
// @supportURL   https://github.com/XDelta/UserScripts/issues
// @updateURL    https://github.com/XDelta/UserScripts/raw/main/MergeWithPreferredEmail/MergeWithPreferredEmail.meta.js
// @downloadURL  https://github.com/XDelta/UserScripts/raw/main/MergeWithPreferredEmail/MergeWithPreferredEmail.user.js
// @match        https://github.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// @connect      github.com
// @connect      githubusercontent.com
// @require     https://greasyfork.org/scripts/28721-mutations/code/mutations.js?version=1108163
// ==/UserScript==

const preferredCommitEmail = 'you@example.com'; //Change to your preferred email

(function() {
    'use strict';

    function onAuthorEmailChange() {
        console.log("Merge Email Changed");
        const authorEmailDropdown = document.querySelector('#commit-author-email');
        if (!authorEmailDropdown) {
            console.error("Unable to find #commit-author-email");
            return;
        }
        if (authorEmailDropdown.value !== preferredCommitEmail) {
            console.log("Setting Merge Email");
            try {
                authorEmailDropdown.value = preferredCommitEmail;
            } catch {
                console.log("preferredCommitEmail is not a valid value of authorEmailDropdown");
            }
        }
    }

    // Wait until the merge commit container is added to the DOM
    const observer = new MutationObserver(function(mutations) {
        for (const mutation of mutations) {
            for (const addedNode of mutation.addedNodes) {
                if (addedNode.classList && addedNode.classList.contains('js-pull-merging')) {//js-merge-commit-button
                    console.log("observed adding js-pull-merging");
                    onAuthorEmailChange();
                    const authorEmailDropdown = document.querySelector('#commit-author-email');
                    if (authorEmailDropdown) {
                        authorEmailDropdown.addEventListener('change', onAuthorEmailChange);
                    } else {
                        console.error("Unable to find #commit-author-email");
                    }
                    observer.disconnect();
                    return;
                }
            }
        }
    });

    observer.observe(document, { childList: true, subtree: true });
})();