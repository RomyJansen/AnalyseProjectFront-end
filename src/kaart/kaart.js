import {useEffect, useRef, useState} from "react";
import {screen} from "@testing-library/react";
import "../styles.css";


export function Kaart(iterable){

    const divider = 10;
    const [mainGrid, setMainGrid] = useState(Array.from({length: (window.screen.availHeight-100)/divider}, () => Array.from({length: window.screen.availWidth/divider})));
    const lineSetup = useRef([]);
    let mousePos = [];

    window.addEventListener('mousedown', (event) => {
        mousePos = [];
        mousePos.push(event.clientX);
        mousePos.push(event.clientY);
    })

    // const [mousePos, setMousePos] = useState([]);

    // useEffect(() => {
    //     if(lineSetup.current.length === 1){
    //         window.addEventListener('mousemove',(event) => {
    //             setMousePos([ event.clientX, event.clientY]);
    //             console.log(mousePos.toString());
    //         });
    //     }
    // }, [lineSetup]);

    // window.addEventListener('mousemove',( event) => {
    //     setMousePos([ event.clientX, event.clientY]);
    //     console.log(mousePos.toString());
    // });

    function saySomething(coordinates, event){
        console.log("Clicked! " + coordinates.toString());

        console.log(mousePos[0] + ' ' + mousePos[1]);
        let tempList = lineSetup.current;
        if(lineSetup.current.length === 0){
            tempList.push(mousePos);
            lineSetup.current = tempList;
        } else if(lineSetup.current.length === 1){
            tempList.push(mousePos);
            lineSetup.current = tempList;
            drawDefinitiveLine();
            lineSetup.current = [];
        }
    }

    // function drawTempLine(){
    //     let c = document.getElementById("drawCanvas");
    //     let ctx = c.getContext("2d");
    //     ctx.lineWidth = 10;
    //     ctx.beginPath();
    //     ctx.moveTo(lineSetup.current.at(0)[0] * divider,lineSetup.current.at(0)[1] * divider);
    //     ctx.lineTo(mousePos.x, mousePos.y);
    //     ctx.stroke();
    // }

    function drawDefinitiveLine(){
        let c = document.getElementById("drawCanvas");
        let ctx = c.getContext("2d");
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(lineSetup.current.at(0)[0],lineSetup.current.at(0)[1]);
        ctx.lineTo(lineSetup.current.at(1)[0],lineSetup.current.at(1)[1]);
        ctx.stroke();
    }


    return (
        <div>
            <div id={"container"}>
                <canvas id={"drawCanvas"} width={window.screen.availWidth} height={window.screen.availHeight-100}>
                </canvas>
            </div>

            <div id={"overlay"}>
                <table>
                    <tbody>
                    {mainGrid.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, colIndex) => (
                                <td
                                    key={colIndex}
                                    onClick={() => saySomething([colIndex, rowIndex])}

                                >o</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
