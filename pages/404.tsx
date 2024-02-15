"use client";
import {useEffect, useState} from "react";
import {Button} from "@mui/material";

export default function NotFoundPage() {
    const HOLE_COUNT = 6;
    const TOTAL_TIME = 10000;
    let lastHole: Element;
    let timeUp = false;
    const [score, setScore] = useState<number>(0);
    const [holes, setHoles] = useState<NodeListOf<Element>>(null);
    const [remainingTime, setRemainingTime] = useState(TOTAL_TIME);

    useEffect(() => {
        setHoles(document.querySelectorAll('.hole'));
    }, []);

    function randomTime(min: number, max: number) {
        return Math.round(Math.random() * (max - min) + min);
    }

    function randomHole(holes: NodeListOf<Element>) {
        const idx = Math.floor(Math.random() * holes.length);
        const hole = holes[idx];
        if (hole === lastHole) {
            console.log('Ah nah that\'s the same one bud');
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

    function keepTime(): void {
        const interval = setInterval(() => {
            setRemainingTime((time) => {
                if (time <= 0) {
                    clearInterval(interval);
                    return 0;
                }
                return time - 1000;
            });
        }, 1000);
    }

    function startGame(): void {
        timeUp = false;
        setRemainingTime(TOTAL_TIME);
        setScore(0);
        peep();
        keepTime();
        setTimeout(() => timeUp = true, TOTAL_TIME)
    }

    function bonk(e): void {
        if (!e.isTrusted) return; // cheater!
        setScore(score + 1);
        e.target.parentNode.classList.remove('up');
    }

    return (
        <div>
            <h1 className="text-center">Whack-a-mole! </h1>
            <span className="flex">
                <p className="bg-neutral-700 p-3 rounded-full block mx-auto mt-6 w-fit">Score: {score}</p>
            <p className="bg-neutral-700 p-3 rounded-full block mx-auto mt-6 w-fit">Time: {remainingTime/1000}</p>
                </span>

            <div className="game flex flex-wrap mx-auto w-screen h-72">
                {
                    Array.from({length: HOLE_COUNT}).map((_, index) => (
                        <div key={index} className={`hole overflow-hidden relative hole${index}`}>
                            <div className="mole" onClick={bonk}></div>
                        </div>
                    ))
                }
            </div>
            <Button onClick={startGame} variant="outlined" size="large" className="block mx-auto mt-8">Start!</Button>
        </div>
    )
        ;
}