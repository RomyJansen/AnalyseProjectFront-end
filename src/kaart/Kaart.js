import {useState} from "react";

export function Kaart(){

    const [tempCoordinates, setTempCoordinates] = useState();
    const [lines, setlines] = useState([]);

    function checkDraw(event){
        drawLine(event);
    }

    function drawLine(event){
        const {clientX, clientY} = event;
        const newLine = {
            x1: 50,
            y1: 50,
            x2: clientX,
            y2: clientY
        };
        setlines([...lines, newLine])
    }

    return (
        <div>
            <svg id={"items"} width={window.screen.availWidth} height={window.screen.availHeight} onClick={checkDraw}>
                {lines && lines.map((line, index) => (
                    <line
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}/>
                ))}

                <line x1={0} x2={100} y1={300} y2={500} style={{stroke: "blue", strokeWidth: 2}} />
                {/*<circle cx="50" cy="50" r="40" stroke="green" strokeWidth="4" fill="yellow" />*/}
                <line x1={0} x2={100} y1={0} y2={500} style={{stroke: "green", strokeWidth: 2}} />
            </svg>
        </div>
    )
}
