"use strict"

class Cpu {
    totalMoves;
    userMoves;
    cpuMoves;
    symbol = 'circle';

    constructor() {
        this.totalMoves = 0;
        this.userMoves = [];
        this.cpuMoves = [];
    }

    chooseMove() {
        const moves = this.userMoves.concat(this.cpuMoves);

        isNotValidMove: while (true) {
            let move = Math.floor(Math.random() * 10) + 1;

            if (move === 10 || moves.includes(move.toString())) 
                continue isNotValidMove;

            this.cpuMoves.push(move);

            const $cell = document.getElementById(move);
            makeAMove($cell, this.symbol);
            break isNotValidMove;
        }
    }
}

const $grid = document.getElementById('grid');
const $reset = document.getElementById('reset');
const cpu = new Cpu();

$reset.addEventListener('click', reset);

/**
 * Resets the game grid and the move history from the CPU.
 */
function reset() {
    for (let i = 1; i <= 9; i++) {
        let $span = document.getElementById(i).children[0];
        $span.innerHTML = '';
    }

    cpu.totalMoves = 0;
    cpu.userMoves = [];
    cpu.cpuMoves = [];
}

/**
 * Marks either X or O in the cell grid span.
 * @param {Event} event 
 * @param {string} symbol - A string for rendering the proper Google material icon.
 * @returns 
 */
function makeAMove(cell, symbol) {
    const $cell = cell;
    const $span = $cell.children[0];

    if ($span.innerHTML) return;
    $span.innerHTML = symbol;
    cpu.userMoves.push($cell.id);
    cpu.totalMoves++;
    console.log(cpu.totalMoves)

    if (symbol === "close") {   
        if (cpu.totalMoves < 9) {
            cpu.chooseMove();
        }
    }
}