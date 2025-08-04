import React from "react"
export default function Timer({ setCurrentWord, currentWord }) {
    const [timer, setTimer] = React.useState(currentWord.length<=6 ? 120000 : 300000);
    let min = Math.floor(timer / (60 * 1000));
    let sec = (timer / 1000) % 60;
    if (timer <= 0) {
        setCurrentWord('fail');
    }
    min = String(min).padStart(2, '0');
    sec = String(sec).padStart(2, '0');
    function update() {

        setTimer(prev => prev - 1000);
    }
    React.useEffect(() => {
        setInterval(update, 1000);
        return clearInterval(timer)
    }, []);
    return (
        <div 
        className="timer"
        style={{backgroundColor: timer<=5000 ? '#BA2A2A' : null}}
        >
            <h1>{min} : {sec}</h1>
        </div>
    )
}