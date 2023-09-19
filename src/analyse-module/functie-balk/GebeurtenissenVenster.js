import {useEffect, useState} from "react";
import {getAllAfstanden, getAllGebeurtenissen, getAllObjectGebeurtenissen} from "../../data/REST";

export function GebeurtenissenVenster(){

    const [gebeurtenissen, setGebeurtenissen] = useState("loading...");
    const [objectGebeurtenissen, setObjectGebeurtenissen] = useState("loading...");

    useEffect(() => {
        getGebeurtenissen()
        getObjectGebeurtenissen()
    }, [])

    async function getGebeurtenissen(){
        setGebeurtenissen(await getAllGebeurtenissen())
    }

    async function getObjectGebeurtenissen(){
        setObjectGebeurtenissen(await getAllObjectGebeurtenissen())
    }

    return(
        <div id={"gebeurtenissen-venster"}>
            <table border="1" width="100%">
                <tbody>
                <p style={{fontWeight: "bold"}}>Algemeen</p>
                {(gebeurtenissen !== "loading...") && gebeurtenissen.map((vars, index) => (
                    <tr>
                        <p>Titel: {vars.naam}<br/>
                            <p>Betreffend variabele met id {vars.id}</p>
                            <p style={{fontStyle: "italic"}}>Nieuwe waarde={vars.waarde}</p>
                            <p style={{fontStyle: "italic"}}>Vindt plaats in jaar {vars.jaar} </p>
                        </p>
                    </tr>
                ))}
                {(gebeurtenissen == "loading...") && gebeurtenissen}
                </tbody>
            </table>
            <table border="1" width="100%">
                <tbody>
                <p style={{fontWeight: "bold"}}>Afstand</p>
                {(objectGebeurtenissen !== "loading...") && objectGebeurtenissen.map((vars, index) => (
                    <tr>
                        <p>Titel: {vars.naam}<br/>
                            <p>Betreffend object met id {vars.id}</p>
                            <p style={{fontStyle: "italic"}}>Verplaatst naar nieuwe coördinaten x={vars.locatieX} en y={vars.locatieY}</p>
                            <p style={{fontStyle: "italic"}}>Vindt plaats in jaar {vars.jaar} </p>
                        </p>
                    </tr>
                ))}
                {(objectGebeurtenissen == "loading...") && objectGebeurtenissen}
                </tbody>
            </table>

            {/*<p>{JSON.stringify(gebeurtenissen)}</p>*/}
            {/*<p>{JSON.stringify(objectGebeurtenissen)}</p>*/}
        </div>
    )
}
