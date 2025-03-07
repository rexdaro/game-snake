// Crear la cuadrícula
const board = document.getElementById('board');
const size = 20; // Tamaño del tablero (20x20)

for (let row = 1; row <= size; row++) {
    for (let col = 1; col <= size; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-x', col); // Coordenada x
        cell.setAttribute('data-y', row); // Coordenada y
        board.appendChild(cell);
    }
}

// Posición inicial de la serpiente
let snake = [{ x: 10, y: 10 }];

// Posición inicial de la comida
let food = { x: 5, y: 5 };

// Función para dibujar la serpiente y la comida
function draw() {
    // Limpiar el tablero
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.classList.remove('snake', 'food');
    });

    // Dibujar la serpiente
    snake.forEach(segment => {
        const cell = document.querySelector(`.cell[data-x="${segment.x}"][data-y="${segment.y}"]`);
        if (cell) {
            cell.classList.add('snake');
        }
    });

    // Dibujar la comida
    const foodCell = document.querySelector(`.cell[data-x="${food.x}"][data-y="${food.y}"]`);
    if (foodCell) {
        foodCell.classList.add('food');
    }
}

// Dibujar el tablero por primera vez
draw();