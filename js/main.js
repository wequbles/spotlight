"use strict";

const varInput = document.getElementById('varInput');
const varRange = document.getElementById('varRange');
const paintedEl = document.getElementById('rainbow');
const colors = ['#ff0000', '#ffdd00', '#00ff00', '#0000ff', '#8a2be2', '#ff00a6'];

document.addEventListener('DOMContentLoaded', function() {
	updateLabel();
});

varInput.addEventListener('change', function() {
	varRange.value = this.value;
});

varRange.addEventListener('input', function() {
	updateLabel();
});

function updateLabel() {
	varInput.value = varRange.value;
}

function getDelay() {
	return Math.round(1000 / (varRange.value / 60));
}

function delay(ms) {
	return new Promise((res) => setTimeout(res, ms));
}

async function PromiseTimeOut() {
	for(let i = 0; i < colors.length; i++) {
		let currentDelay = getDelay();
		paintedEl.style.backgroundColor = colors[i];
		paintedEl.style.transition = `background-color ${currentDelay}ms linear`;
		await delay(currentDelay);
	}
	PromiseTimeOut();
}

PromiseTimeOut();