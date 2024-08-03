"use strict";

const varInput = document.getElementById('varInput');
const varRange = document.getElementById('varRange');
const paintedEl = document.getElementById('rainbow');
const contColors = document.getElementById('contColors');
const arrColors = ['#ff0000', '#ffdd00', '#00ff00', '#0000ff', '#8a2be2', '#ff00a6'];
const addColorBtn = document.getElementById('addColor');

function createColors(color, index, array) {
	let colorBlock = document.createElement('div');
	colorBlock.className = "color_block";

	let newColor = document.createElement('input');
	newColor.type = "color";
	newColor.className = "color_input";
	newColor.dataset.colorId = index;
	newColor.dataset.delete = "false";
	newColor.value = color;
	colorBlock.append(newColor);

	createDeletEl(colorBlock, index, array);

	contColors.append(colorBlock);

	array[index] = newColor.value;
	newColor.addEventListener('input', () => {
		array[index] = newColor.value; // update color
	});

	newColor.addEventListener('focus', () => {
		newColor.dataset.delete = "true";
	});

	newColor.addEventListener('blur', () => {
		newColor.dataset.delete = "false";
	});
}

function createDeletEl(colorEl, colorId, arr) {
	let deleteColorEl = document.createElement('button');
	deleteColorEl.className = "color_delete";
	deleteColorEl.dataset.colorId = colorId;
	deleteColorEl.textContent = "Удалить";
	colorEl.append(deleteColorEl);

	deleteColorEl.addEventListener('click', () => {
		arr.splice(colorId); // delete color
		colorEl.remove();
	});
}

addColorBtn.addEventListener('click', () => {
	createColors('#000000', arrColors.length, arrColors);
});

document.addEventListener('DOMContentLoaded', () => {
	arrColors.forEach(createColors);
	updateLabel();
});

varInput.addEventListener('change', () => {
	varRange.value = this.value;
	updateLabel();
});

varRange.addEventListener('input', () => {
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

async function PromiseTimeOut(arr) {
	for(let i = 0; i < arr.length; i++) {
		let currentDelay = getDelay();
		paintedEl.style.backgroundColor = arr[i];
		paintedEl.style.transition = `background-color ${currentDelay}ms linear`;
		await delay(currentDelay);
	}
	PromiseTimeOut(arrColors);
}

PromiseTimeOut(arrColors);