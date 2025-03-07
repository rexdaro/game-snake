// Variables del juego
const board = document.getElementById('board');
const scoreDisplay = document.getElementById('score');
const size = 20; // Tamaño del tablero (20x20)
let snake = [{ x: 10, y: 10 }]; // Posición inicial de la serpiente
let food = { x: 5, y: 5 }; // Posición inicial de la comida
let direction = 'right'; // Dirección inicial
let gameInterval;
let score = 0;

// Variables para el control táctil
let touchStartX = 0;
let touchStartY = 0;

// Crear la cuadrícula
for (let row = 1; row <= size; row++) {
    for (let col = 1; col <= size; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-x', col);
        cell.setAttribute('data-y', row);
        board.appendChild(cell);
    }
}

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

// Función para mover la serpiente
function move() {
    const head = { ...snake[0] }; // Crea una copia de la cabeza

    // Actualiza la posición de la cabeza según la dirección
    if (direction === 'right') head.x++;
    if (direction === 'left') head.x--;
    if (direction === 'up') head.y--;
    if (direction === 'down') head.y++;

    // Verificar colisiones
    if (
        head.x < 1 || head.x > size || // Choca con las paredes
        head.y < 1 || head.y > size || // Choca con las paredes
        snake.some(segment => segment.x === head.x && segment.y === head.y) // Choca consigo misma
    ) {
        clearInterval(gameInterval); // Detener el juego
        alert(`Game over. Your Score: ${score}`);
        resetGame(); // Reiniciar el juego
        return;
    }

    // Agrega la nueva cabeza al inicio del array
    snake.unshift(head);

    // Verifica si la serpiente comió la comida
    if (head.x === food.x && head.y === food.y) {
        score += 10; // Aumentar la puntuación
        scoreDisplay.textContent = `Puntuación: ${score}`;
        food = {
            x: Math.floor(Math.random() * size) + 1,
            y: Math.floor(Math.random() * size) + 1,
        }; // Nueva comida
    } else {
        snake.pop(); // Elimina la cola si no comió
    }

    // Dibuja el tablero con la nueva posición de la serpiente y la comida
    draw();
}

// Función para reiniciar el juego
function resetGame() {
    snake = [{ x: 10, y: 10 }];
    food = { x: 5, y: 5 };
    direction = 'right';
    score = 0;
    scoreDisplay.textContent = `Puntuación: ${score}`;
    draw();
    gameInterval = setInterval(move, 200);
}

// Capturar las teclas presionadas (para desktop)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && direction !== 'down') direction = 'up';
    if (e.key === 'ArrowDown' && direction !== 'up') direction = 'down';
    if (e.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
    if (e.key === 'ArrowRight' && direction !== 'left') direction = 'right';
});

// Capturar el inicio del toque (para móviles)
document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

// Capturar el movimiento del dedo (para móviles)
document.addEventListener('touchmove', (e) => {
    e.preventDefault(); // Evitar el desplazamiento de la pantalla
    const touchEndX = e.touches[0].clientX;
    const touchEndY = e.touches[0].clientY;

    // Calcular la diferencia entre las coordenadas iniciales y finales
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    // Determinar la dirección basada en el movimiento
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Movimiento horizontal
        if (deltaX > 0 && direction !== 'left') direction = 'right'; // Deslizamiento a la derecha
        else if (deltaX < 0 && direction !== 'right') direction = 'left'; // Deslizamiento a la izquierda
    } else {
        // Movimiento vertical
        if (deltaY > 0 && direction !== 'up') direction = 'down'; // Deslizamiento hacia abajo
        else if (deltaY < 0 && direction !== 'down') direction = 'up'; // Deslizamiento hacia arriba
    }
}, { passive: false }); // Asegurar que preventDefault() funcione


// Iniciar el juego
resetGame();