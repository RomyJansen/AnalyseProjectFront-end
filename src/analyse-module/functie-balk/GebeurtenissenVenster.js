import {useEffect, useState} from "react";
import {addObjectGebeurtenis, getAllAfstanden, getAllGebeurtenissen, getAllObjectGebeurtenissen} from "../../data/REST";
import {getJaar} from "../state";

export function GebeurtenissenVenster(){

    const [gebeurtenissen, setGebeurtenissen] = useState("loading...");
    const [objectGebeurtenissen, setObjectGebeurtenissen] = useState("loading...");
    const [formVisible, setFormVisible] = useState(false);
    const [objectFormVisible, setObjectFormVisible] = useState(false)

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

    const handleFormSubmit = (event) => {
        event.preventDefault(); // Prevents the default form submission behavior

        // Access the form elements by their IDs and get their values
        const id = document.getElementById('object-id').value;
        const naam = document.getElementById('naam').value;
        const jaar = getJaar();
        const locatieX = document.getElementById('locatieX').value;
        const locatieY = document.getElementById('locatieY').value;

        // Create an object with the form data
        const formData = {
            id,
            naam,
            jaar,
            locatieX,
            locatieY,
        };

        // Call your function with the form data
        sendObjectGebeurtenis(formData);
    };

    function sendObjectGebeurtenis(objectGebeurtenis){
        console.log(JSON.stringify(objectGebeurtenis))
        addObjectGebeurtenis(objectGebeurtenis)
        setObjectFormVisible(false)
        setFormVisible(false)
    }

    return(
        <div id={"gebeurtenissen-venster"}>
            {!formVisible && (
                <div>
                <button onClick={() => {setFormVisible(true); setObjectFormVisible(false)}}>Gebeurtenis toevoegen</button>
                <button onClick={() => {setFormVisible(true); setObjectFormVisible(true)}}>Object gebeurtenis toevoegen</button>

                </div>)}
            {formVisible && objectFormVisible && (
                <form onSubmit={handleFormSubmit}>
                    <label htmlFor="object-id">object id:</label><br />
                    <input type="text" id="object-id" name="object-id" /><br />

                    <label htmlFor="naam">gebeurtenis naam:</label><br />
                    <input type="text" id="naam" name="naam" /><br />

                    <label htmlFor="locatieX">nieuwe locatie x:</label><br />
                    <input type="text" id="locatieX" name="locatieX" /><br />

                    <label htmlFor="locatieY">nieuwe locatie y:</label><br />
                    <input type="text" id="locatieY" name="locatieY" /><br />

                    <input type="submit" value="Submit" />
                </form>
            )}

            <table border="1" width="100%">
                <tbody>
                <p style={{fontWeight: "bold"}}>Variabele gebeurtenissen</p>
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
                <p style={{fontWeight: "bold"}}>Object gebeurtenissen</p>
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
