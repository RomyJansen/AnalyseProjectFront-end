import {Stage, Layer, Rect, Circle, Line, Group} from 'react-konva';
import {useRef, useState} from "react";

export function Kaart(){
    const firstMousePoint = useRef();
    const [lines, setLines] = useState([]);
    const isDrawing = useRef(false);

    function checkDraw(event){
        if(!isDrawing) return;
        const {clientX, clientY} = event;
        if(!firstMousePoint.current){
            firstMousePoint.current = {
                x: clientX,
                y: clientY};
        } else {
            drawLine(clientX, clientY);
            firstMousePoint.current = null;
        }
    }

    function drawLine(clientX, clientY){
        const newLine = {
            x1: firstMousePoint.current.x,
            y1: firstMousePoint.current.y,
            x2: clientX -firstMousePoint.current.x,
            y2: clientY - firstMousePoint.current.y,
            grid: []
        }
        newLine.grid = drawGrid(firstMousePoint.current.x, firstMousePoint.current.y, clientX, clientY, determineLength(firstMousePoint.current.x, firstMousePoint.current.y, clientX, clientY));
        setLines([...lines, newLine]);
    }

    function drawGrid(x1, y1, x2, y2, lineLength){
        const newGrid = [];
        // grid layer 1: underneath line
        for (let i = 0; i < lineLength; i++) {
            for (let j = 0; j < 90; j++) {
                newGrid.push(createGridCell(x1, y1, x2, y2, i ,j));
                j += 30;
            }
            i += 30;
        }
        // grid layer 2: above line
        // for (let i = 0; i < lineLength; i++) {
        //     for (let j = 90; j > 0; j--) {
        //         newGrid.push(createGridCell(x1, y1, x2, y2, i ,j));
        //         j -= 30;
        //     }
        //     i += 30;
        // }
        for (const cell in newGrid) {
            console.log("cell(x: " + cell.x + ", y: " + cell.y + ", width: " + cell.width + ", height: " + cell.height + ")");
        }
        return newGrid;
    }

    function createGridCell(x1, y1, x2, y2, i, j){
        return {
            x: i,
            y: j,
            width: 30,
            height: 30,
            rotation: calculateAngle(x1, y1, x2, y2),
            selected: false
        }
    }

    function determineLength(x1, y1, x2, y2){
        // Pythagoras formula: a^2 + b^2 = c^2
        const a = x2 > x1 ? x2-x1 : x1-x2;
        const b = y2 > y1 ? y2-y1 : y1-y2;
        const c = Math.sqrt((a * a) + (b * b));
        console.log(c);
        return c;
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

    function toggleSelected(lineIndex, cellIndex){
        // if(cell.selected) cell.selected = false;
        // else cell.selected = true;
        const tempLines = lines;
        tempLines[lineIndex].grid[cellIndex].selected = !tempLines[lineIndex].grid[cellIndex].selected;
        setLines(tempLines);
    }

    function toggleDrawingMode(){
        isDrawing.current = !isDrawing.current;
    }


    return(
        <div id={"kaart"} className={"kaart"}>
            <button onClick={() => setLines([])}>Clear</button>
            <p>DrawingMode:</p>
            <label className="switch">
                <input type="checkbox" onClick={toggleDrawingMode}/>

                    <span className="slider round"></span>
            </label>
            {/* eslint-disable-next-line no-restricted-globals */}
            <Stage width={window.innerWidth} height={window.innerHeight} onClick={() => {if(isDrawing.current)checkDraw(event)}} className={"stage"} >
                <Layer>
                    {lines && lines.map((line, lineIndex) => (
                        <Group draggable={true}>
                            <Line
                                x={line.x1}
                                y={line.y1}
                                points={[0, 0, line.x2, line.y2]}
                                stroke={"black"}
                                strokeWidth={25}
                                draggable={false}
                                shadowBlur={5}
                            />
                            <Group rotation={line.grid[0].rotation} x={line.x1} y={line.y1}>
                                {line.grid && line.grid.map((cell, cellIndex) => (
                                    <Rect
                                        x={cell.x}
                                        y={cell.y + 15}
                                        width={cell.width}
                                        height={cell.height}
                                        fill={cell.selected ? "pink" : "green"}
                                        onClick={() => toggleSelected(lineIndex, cellIndex)}
                                    />
                                ))}
                            </Group>
                        </Group>
                    ))}
                    <Rect width={50} height={50} fill="red" />
                    <Circle x={200} y={200} stroke="black" radius={50} draggable={true} onClick={() => console.log("clicked!")} />
                </Layer>
            </Stage>
        </div>
    )
}
