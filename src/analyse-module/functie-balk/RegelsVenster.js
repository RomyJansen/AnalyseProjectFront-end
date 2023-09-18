import {useEffect, useState} from "react";
import {getJaar} from "../state";
import {getAllAfstanden, getAllRegels} from "../../data/REST";

export function RegelsVenster(){
    const [regels, setRegels] = useState("loading...")

    useEffect(() => {
        getRegels();
    }, [getJaar()])

    async function getRegels(){
        setRegels(await getAllRegels())
        console.log()
    }

    return(
        <div id={"regels-venster"}>
            <table  width="100%" >
                <tbody>
                <p style={{fontWeight: "bold"}}>Regels</p>
                {(regels !== "loading...") && regels.map((vars, index) => (
                    <tr>
                        <p>{vars.id} - {vars.naam}<br/>
                            <p style={{fontStyle: "italic"}}>var met id {vars.varId} {vars.vergelijkingOperator} {vars.waarde}</p>
                            <p style={{fontWeight: "bold",fontStyle: "italic"}}>resultaat: <div style={{color: vars.results[0][0] ? "green" : "red"}}>{vars.results[0][0].toString()}</div></p>
                        </p>
                    </tr>
                ))}
                {(regels == "loading...") && regels}
                </tbody>
            </table>
        </div>
    )
}
