import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";


const GOOD_DONGERS = [
    '( ● ‿ ● )',
    '⊂(▀¯▀⊂)',
    'ᕕ( ՞ ᗜ ՞ )ᕗ',
    'ᕦ( ̿ ﹏ ̿ )ᕤ',
    's( ^ ‿ ^)-b',
    '(◉◞౪◟◉)',
    '(ง ͠° ل͜ °)ง',
    '(° ͜ʖ°)',
    '(▀̿̿Ĺ̯̿̿▀̿ ̿)',
    '♫ ┌༼ຈل͜ຈ༽┘ ♪',
    '( ‾ʖ̫‾)',
    '( ͡° ͜ʖ ͡°)',
    '( ＾◡＾)',
    'ԅ(ˆ⌣ˆԅ)',
    '(ᵔᴥᵔ)',
    'ಠ‿ಠ',
    '( ◕ ◡ ◕ )',
    '~(╯▽╰)~',
    '~( ＾◡＾)~',
    '┌( ͝° ͜ʖ͡°)ᕤ',
    'ヽ༼ – ل͜ – ༽ﾉ',
    '( ͡ᵔ ͜ʖ ͡ᵔ )',
    '(͡◔ ͜ʖ ͡◔)',
    '(=^-ω-^=)',
    '~(˘◡˘~)',
    '༼ᕗຈل͜ຈ༽ᕗ',
    '(º◡º)っ',
    '╰( ͡’◟◯ ͡’)╯',
    'ヽ(”`▽´)ﾉ',
    '(งಠل͜ಠ)ง',
    '(っಠ‿ಠ)っ',
    'ᕙ(▀̿̿Ĺ̯̿̿▀̿ ̿) ᕗ',
    '(ง ͡ʘ ͜ʖ ͡ʘ)ง'

]

const BAD_DONGERS = [

    '( ͡↑ ͜ʖ ͡↑)',
    '╰[ ⁰﹏⁰ ]╯',
    'ლ(ಥ Д ಥ )ლ',
    's( ^ ‸ ^)-p',
    'ᕙ(◉෴◉)ᕗ',
    '༼ ºل͟º༽',
    'ʕ ͝°ل͟ ͝°ʔ',
    '(⊙＿⊙’)',
    '(╥﹏╥)',
    '乁( •_• )ㄏ',
    '(∩╹□╹∩)',
    '(•_•)',
    '(‘ºل͟º)',
    '(つ 益 )つ',
    '╭∩╮( ° ͜ʖ͡°)╭∩╮',
    'ಠل͟ಠ',
    '(╯_ʖ╰)',
    '◕_◕',
    '( ͝°_ʖ͡°)',
    'ヽ(`Д´)ﾉ',
    '(۞_۞)',
    '(̿ಠ ̿Ĺ̯̿̿ಠ ̿)̄',
    '(ᓄಠ_ಠ)ᓄ',
    '(ºل͟º)',
    'ノ(;Ĺ̯̿̿ ;ノ)'
]

const MAX_HEARTS = 6

const random = (dongers) => {
    return dongers[Math.floor(Math.random() * dongers.length)]
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function permute(seed1, seed2) {
    let permutations = []
    for(let i = 0; i < seed1.length; i++) {
        for(let j = 0; j < seed2.length; j++) {
            permutations.push({
                a: `${seed1[i]}`,
                b: `${seed2[j]}`,
                op: '✖',
                ans: `${seed1[i] * seed2[j]}`
            })
        }
    }

    return shuffle(permutations);
}


export function App() {

    const { numbers, count } = useParams()

    const as = numbers.split(",").map(n => parseInt(n, 10))

    const [first, ...rest] = permute(as, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(0, parseInt(count, 10) || Infinity)
    const [sum, setSum] = useState(first)
    const [questions, setQuestions] = useState(rest)
    const [reaction, setReaction] = useState("( O‿O )")
    const [lives, setLives] = useState(MAX_HEARTS)
    const [value, setValue] = useState('')
    const [dead, setDead] = useState(false);
    const [win, setWin] = useState(false);
    const [timer, setTimer] = useState(0);

    const total = rest.length + 1;

    useEffect(() => {
        const id = setInterval(() => {
            if(!dead && !win) {
                setTimer(timer + 1);
            }
        }, 1000)
        return () => clearInterval(id)
    })

    const attempt = (value) => {
        setValue('')

        const correct = value === sum.ans
        if(correct) {
            setReaction(random(GOOD_DONGERS))
        } else {
            const newLives = lives - 1

            if(newLives <= 0) {
                setReaction('( ✖ _ ✖ )')
                setDead(true);
            } else {
                setReaction(random(BAD_DONGERS))
            }

            setLives(newLives)

        }

        const [next, ...rest] = questions;

        if(next === undefined) {
            setWin(true)

            setReaction(correct ? "WIN WIN WIN" : 'U SURV1V3D')
        } else {
            setSum(next);
            setQuestions(rest);
        }
    }

    return <div className="container">

        <div className="stats">
            <span className="counter">{total- questions.length}/{total}</span>
            <span className="timer">{ new Date(timer * 1000).toISOString().substr(11, 8) }</span>
        </div>

        <div className="cool-guy-calc">
            <div className="screen">
                <div className="reaction">
                    {reaction}
                </div>
                <div className="lives">
                    {
                        Array(MAX_HEARTS)
                            .fill(0)
                            .map((_, i) => i < lives ? (<span key={i}>♥</span>) : <span key={i} className="depleted">♥</span>)
                    }
                </div>
            </div>
        </div>
        {
            !dead && !win && (
                <div className="question-container">
                    <div className="question">&gt; {sum.a} {sum.op} {sum.b}</div>
                    <div className="answer">&gt;&nbsp;
                        <input value={value}
                               onChange={(e) => setValue(e.target.value)}
                               onKeyPress={(e) =>  e.key === 'Enter' && attempt(e.target.value)}
                               autoFocus={true}/></div>
                </div>
            )
        }
        {
            (dead || win) && (<>
                    <div className="restart"><Link to="/">ᐊ</Link></div>
                <div className="restart" onClick={() => {
                    const [first, ...rest] = permute(as, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
                    setSum(first)
                    setQuestions(rest)
                    setWin(false)
                    setDead(false)
                    setLives(MAX_HEARTS)
                    setReaction("( O‿O )")
                    setTimer(0);
                }}>⟳</div>
                </>
            )
        }
        {
            win && (
                <div className="restart-message">C:&gt; WIN.BAT</div>
            )
        }
        {
            dead && (
                <div className="restart-message">sudo rm -rf /</div>
            )
        }

    </div>
}
