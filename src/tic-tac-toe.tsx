import React, {useState} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";

// @ts-ignore
function Square({value, onSquareClick}) {

    return (<button onClick={onSquareClick} className='border rounded-0 d-flex btn btn-danger'
                    style={{height: 200, width: 500, maxWidth: 690, textShadow: '0 0 7px white'}}>
        <h1 className='display-2 fw-semibold' style={{marginLeft: 200}}>{value}</h1></button>);
}


function Board() {
    const [xisNext, setXIsNext] = useState(true);
    const [square, setSquare] = useState(Array(9).fill(null));
    // @ts-ignore
    function setWinner(square) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            // eslint-disable-next-line eqeqeq
            if (square[a] && square[a] == square[b] && square[a] == square[c]) {
                return square[a];
            }
        }
        return null;
    }

    function handleClick(i: number) {
        if (square[i] || setWinner(square)) {
            return;
        }
        const nextSquares = square.slice();
        if (xisNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        setSquare(nextSquares);
        setXIsNext(!xisNext);
    }

    const winner = setWinner(square);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        status = "Next player: " + (xisNext ? "X" : "O");
    }

    return (
        <div className='container-fluid'>
            <div className='p-5'>
                <div className='row'>
                    <div className='col-4' style={{height: 200}}>
                        <Square value={square[0]} onSquareClick={() => handleClick(0)}/>
                        <Square value={square[1]} onSquareClick={() => handleClick(1)}/>
                        <Square value={square[2]} onSquareClick={() => handleClick(2)}/>
                    </div>
                    <div className='col-4' style={{height: 200}}>
                        <Square value={square[3]} onSquareClick={() => handleClick(3)}/>
                        <Square value={square[4]} onSquareClick={() => handleClick(4)}/>
                        <Square value={square[5]} onSquareClick={() => handleClick(5)}/>

                    </div>
                    <div className='col-4' style={{height: 200}}>
                        <Square value={square[6]} onSquareClick={() => handleClick(6)}/>
                        <Square value={square[7]} onSquareClick={() => handleClick(7)}/>
                        <Square value={square[8]} onSquareClick={() => handleClick(8)}/>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Game() {


    return (
        <div className={'text-center mt-4 bg-dark shadow-lg'}>
            <h1 className={'display-6 fs-2 fst-italic'} style={
                {
                    color: 'white',
                    textShadow: '0 0 4px white, 0 0 15px red'
                }
            }><strong>T</strong>ic-<strong>T</strong>ac-<strong>T</strong>oe</h1>
            <hr style={{color: 'white'}}/>
            <div className={'text-center me-5 shadow-lg'}>
                <Board/>
            </div>
        </div>

    );
}