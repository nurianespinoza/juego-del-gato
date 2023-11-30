"use client"
import React, { useEffect } from 'react';

const Juego: React.FC = () => {
    useEffect(() => {
        const tiles = Array.from(document.querySelectorAll('.tile')) as HTMLDivElement[];
        const playerDisplay = document.querySelector('.display-player') as HTMLSpanElement;
        const resetButton = document.querySelector('#reset') as HTMLButtonElement;
        const announcer = document.querySelector('.announcer') as HTMLDivElement;

        let board: string[] = ['', '', '', '', '', '', '', '', ''];
        let currentPlayer: 'X' | 'O' = 'X';
        let isGameActive = true;

        const PLAYERX_WON = 'PLAYERX_WON';
        const PLAYERO_WON = 'PLAYERO_WON';
        const TIE = 'TIE';

        const winningConditions: number[][] = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        function handleResultValidation(): void {
            let roundWon = false;
            for (let i = 0; i <= 7; i++) {
                const winCondition = winningConditions[i];
                const a = board[winCondition[0]];
                const b = board[winCondition[1]];
                const c = board[winCondition[2]];
                if (a === '' || b === '' || c === '') {
                    continue;
                }
                if (a === b && b === c) {
                    roundWon = true;
                    break;
                }
            }

            if (roundWon) {
                announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
                isGameActive = false;
                return;
            }

            if (!board.includes(''))
                announce(TIE);
        }

        const announce = (type: string): void => {
            switch (type) {
                case PLAYERO_WON:
                    announcer.innerHTML = 'Gano el jugador del tic-tac-toe <span class="playerO">O</span>';
                    break;
                case PLAYERX_WON:
                    announcer.innerHTML = 'Gano el jugador del tic-tac-toe <span class="playerX">X</span>';
                    break;
                case TIE:
                    announcer.innerText = 'lamentablemente nadie a ganado';
            }
            announcer.classList.remove('hide');
        };

        const isValidAction = (tile: HTMLDivElement): boolean => {
            if (tile.innerText === 'X' || tile.innerText === 'O') {
                return false;
            }
            return true;
        };

        const updateBoard = (index: number): void => {
            board[index] = currentPlayer;
        }

        const changePlayer = (): void => {
            playerDisplay.classList.remove(`player${currentPlayer}`);
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            playerDisplay.innerText = currentPlayer;
            playerDisplay.classList.add(`player${currentPlayer}`);
        }

        const userAction = (tile: HTMLDivElement, index: number): void => {
            if (isValidAction(tile) && isGameActive) {
                tile.innerText = currentPlayer;
                tile.classList.add(`player${currentPlayer}`);
                updateBoard(index);
                handleResultValidation();
                changePlayer();
            }
        }

        const resetBoard = (): void => {
            board = ['', '', '', '', '', '', '', '', ''];
            isGameActive = true;
            announcer.classList.add('hide');

            if (currentPlayer === 'O') {
                changePlayer();
            }

            tiles.forEach(tile => {
                tile.innerText = '';
                tile.classList.remove('playerX');
                tile.classList.remove('playerO');
            });
        }

        tiles.forEach((tile, index) => {
            tile.addEventListener('click', () => userAction(tile, index));
        });

        resetButton.addEventListener('click', resetBoard);
    }, []);

    return (
        <main className="background">
            <section className="title">
                <h1>Juego Del Gato</h1>
            </section>
            <section className="display">
                ronda para el jugador <span className="display-player playerX">X</span>
            </section>
            <section className="container">
                <div className="tile"></div>
                <div className="tile"></div>
                <div className="tile"></div>
                <div className="tile"></div>
                <div className="tile"></div>
                <div className="tile"></div>
                <div className="tile"></div>
                <div className="tile"></div>
                <div className="tile"></div>
            </section>
            <section className="display announcer hide"></section>
            <section className="controls">
                <button id="reset">Otra ves</button>
            </section>
        </main>
    );
}

export default Juego;
