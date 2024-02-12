"use client";
import {useEffect, useState} from "react";
import {Button} from "@mui/material";

export default function NotFoundPage() {
    const HOLE_COUNT = 6;
    let holes: NodeListOf<Element>;
    let lastHole;
    let timeUp = false;
    const [score, setScore] = useState<number>(0);

    useEffect(() => {
        holes = document.querySelectorAll('.hole');
    }, []);
    function randomTime(min: number, max: number) {
        return Math.round(Math.random() * (max - min) + min);
    }

    function randomHole(holes: NodeListOf<Element>) {
        const idx = Math.floor(Math.random() * holes.length);
        const hole = holes[idx];
        if (hole === lastHole) {
            console.log('Ah nah thats the same one bud');
            return randomHole(holes);
        }
        lastHole = hole;
        return hole;
    }

    function peep(): void {
        const time = randomTime(200, 1000);
        const hole = randomHole(holes);
        hole.classList.add('up');
        setTimeout(() => {
            hole.classList.remove('up');
            if (!timeUp) peep();
        }, time);
    }

    function startGame(): void {
        console.log('start');
        timeUp = false;
        setScore(0);
        peep();
        setTimeout(() => timeUp = true, 10000)
    }

    function bonk(e): void {
        if(!e.isTrusted) return; // cheater!
        setScore(score + 1);
        e.target.parentNode.classList.remove('up');
    }

    return (
        <main>
        <h1>Whack-a-mole! <span className="score">{score}</span></h1>
    <Button onClick={startGame}>Start!</Button>

    <div className="game">
        {
            Array.from({length: HOLE_COUNT}).map((_, index) => (
                <div key={index} className={`hole hole${index}`}>
                    <div className="mole" onClick={bonk}></div>
                </div>
            ))
        }
    </div>
        </main>
)
    ;
}