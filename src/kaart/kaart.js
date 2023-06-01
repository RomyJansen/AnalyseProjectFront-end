import {useEffect, useState} from "react";
import {screen} from "@testing-library/react";
import "../styles.css";

export function Kaart(iterable){

    const divider = 10;
    const [mainGrid, setMainGrid] = useState(Array.from({length: (window.screen.availHeight-100)/divider}, () => Array.from({length: window.screen.availWidth/divider})));



    function saySomething(){
        console.log("Clicked!");
    }


    return (
        <div>

            <table>
                <tbody>
                {mainGrid.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, colIndex) => (
                            <td
                                key={colIndex}
                                onClick={() => saySomething()}

                            >o</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
