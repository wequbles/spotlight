document.addEventListener('DOMContentLoaded', () => {
    const colorArea = document.getElementById('colorArea');
    const tempoSlider = document.getElementById('tempoSlider');
    const smoothnessSlider = document.getElementById('smoothnessSlider');
    const tempoValue = document.getElementById('tempoValue');
    const colorPicker = document.getElementById('newColor');
    const addColorButton = document.getElementById('addColor');
    const colorList = document.getElementById('colorList');

    let colors = ['#ff0000', '#ffdd00', '#00ff00', '#0000ff', '#8a2be2', '#ff00a6'];
    let intervalId;
    let tempo = 60;

    function updateSmooth() {
        colorArea.style.transition = `background-color ${smoothnessSlider.value}s`;
    }
    smoothnessSlider.addEventListener('input', (event) => {
        updateSmooth();
    });

    function updateTempo() {
        tempo = parseInt(tempoSlider.value, 10);
        tempoValue.textContent = tempo;
        startColorChange();
    }

    function startColorChange() {
        if (intervalId) clearInterval(intervalId);
        const interval = 60000 / tempo;
        let index = 0;

        intervalId = setInterval(() => {
            colorArea.style.backgroundColor = colors[index % colors.length];
            index++;
        }, interval);
    }

    function addColor() {
        const newColor = colorPicker.value;
        colors.push(newColor);
        renderColorList();
    }

    function renderColorList() {
        colorList.innerHTML = '';
        colors.forEach((color, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<div style="background-color: ${color};"></div> ${color}
                <button class="removeColorButton" data-index="${index}">Удалить</button>`;
            colorList.appendChild(li);
        });

        // Добавляем обработчик событий для кнопок "Удалить"
        document.querySelectorAll('.removeColorButton').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = parseInt(event.target.getAttribute('data-index'), 10);
                removeColor(index);
            });
        });
    }

    function removeColor(index) {
        colors.splice(index, 1);
        renderColorList();
    }

    addColorButton.addEventListener('click', addColor);
    tempoSlider.addEventListener('input', updateTempo);

    renderColorList();
    startColorChange();
});
