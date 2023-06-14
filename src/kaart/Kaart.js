import {useRef, useState} from "react";

export function Kaart(){

    const [tempCoordinates, setTempCoordinates] = useState();
    const [lines, setlines] = useState([]);
    const [grid, setGrid] = useState([]);
    const [firstLineClick, setFirstLineClick] = useState([]);


    function checkDraw(event){
        if (firstLineClick.length < 1){
            const {clientX, clientY} = event;
            console.log(clientX + " -- " + clientY);
            setFirstLineClick([{clientX, clientY}]);
        } else {
            drawLine(event);
            setFirstLineClick([]);
        }
    }

    function drawLine(event){
        const {clientX, clientY} = event;
        const newLine = {
            x1: firstLineClick.at(0).clientX,
            y1: firstLineClick.at(0).clientY,
            x2: clientX,
            y2: clientY
        };
        console.log(firstLineClick.at(0).clientX + " - " + firstLineClick.at(0).clientY)
        drawGrid(firstLineClick.at(0).clientX, firstLineClick.at(0).clientY, clientX, clientY);
        setlines([...lines, newLine])
    }

    function drawGrid(x1, y1, x2, y2){
        // let x1 = 50;
        // let y1 = 50;
        // let x2 = 300;
        // let y2 = 200;
        const lineAngle = calculateAngle(x1, y1, x2, y2);
        const tempGrid = [...grid];
        const gridContour = {
            x: x1,
            y: y1,
            width: x2 - x1,
            height: y2 - y1,
            angle: lineAngle,
            selected: false
        };

        tempGrid.push(gridContour);

        for (let i = x1; i < x2; i++) {
            for (let j = y1; j < y2; j++) {
                const newCell = {
                    x: i,
                    y: j,
                    width: 30,
                    height: 30,
                    angle: lineAngle,
                    selected: false
                }
                console.log("cel values: x= " + newCell.x + " , y= " + newCell.y + " , Width= " + newCell.width + " , height= " + newCell.height);
                tempGrid.push(newCell);
                j+=30;
            }
            i+=30;
        }
        // for (const cell in tempGrid) {
        //     setGrid([...grid, cell])
        // }
        setGrid(tempGrid);
    }

    function calculateAngle(x1, y1, x2, y2) {
        const dx = x2 - x1; // change in x
        const dy = y2 - y1; // change in y

        // Calculate the angle using arctan and convert it to degrees
        const angleRadians = Math.atan2(dy, dx);
        const angleDegrees = angleRadians * (180 / Math.PI);

        // Ensure the angle is positive (between 0 and 360 degrees)
        // const positiveAngle = angleDegrees >= 0 ? angleDegrees : angleDegrees + 360;

        return angleDegrees;
    }

    return (
        <div>
            <svg id={"items"} width={window.screen.availWidth} height={window.screen.availHeight} onClick={checkDraw}>
                {grid && grid.map((cell, index) => (
                    <rect
                        key={index}
                        x={cell.x}
                        y={cell.y}
                        width={cell.width}
                        height={cell.height}
                        style={{fill: cell.selected ? "yellow" : "transparent", transform: "rotate("+ cell.angle + "deg)"}}
                        onClick={() => (cell.selected = true)}/>
                ))}

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
