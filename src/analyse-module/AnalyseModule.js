import {VariabelenVenster} from "./functie-balk/VariabelenVenster";
import {RegelsVenster} from "./functie-balk/RegelsVenster";
import {GebeurtenissenVenster} from "./functie-balk/GebeurtenissenVenster";
import {ResultatenVenster} from "./functie-balk/ResultatenVenster";
import {useState} from "react";
import "./analyse-styles.css";
import {getAllData, REST} from "../data/REST";

export function AnalyseModule() {
    const [variabelenVisible, setVariabelenVisible] = useState(false);
    const [regelsVisible, setRegelsVisible] = useState(false);
    const [gebeurtenissenVisible, setGebeurtenissenVisible] = useState(false);
    const [resultatenVisible, setResultatenVisible] = useState(false);
    const [berekendeVar, setBerekendeVar] = useState(0);


    function toggleVensterVisible(vensterName) {
        switch (vensterName) {
            case "variabelen":
                setRegelsVisible(false);
                setGebeurtenissenVisible(false);
                setResultatenVisible(false);
                if (variabelenVisible) setVariabelenVisible(false);
                else setVariabelenVisible(true);
                break;
            case "regels":
                setVariabelenVisible(false);
                setGebeurtenissenVisible(false);
                setResultatenVisible(false);
                if (regelsVisible) setRegelsVisible(false);
                else setRegelsVisible(true);
                break;
            case "gebeurtenissen":
                setVariabelenVisible(false);
                setRegelsVisible(false);
                setResultatenVisible(false);
                if (gebeurtenissenVisible) setGebeurtenissenVisible(false);
                else setGebeurtenissenVisible(true);
                break;
            case "resultaten":
                setVariabelenVisible(false);
                setRegelsVisible(false);
                setGebeurtenissenVisible(false);
                if (resultatenVisible) setResultatenVisible(false);
                else setResultatenVisible(true);
                break;
            default:
                setVariabelenVisible(false);
                setRegelsVisible(false);
                setGebeurtenissenVisible(false);
                setResultatenVisible(false);
        }
    }

    function checkIfActive(type){

        return "active";
    }

    return (
        <div id={"analyse-module"}>
            <div className={"vensterNav"}>
                <ul className={"navBar"}>
                    <li className={"active"}  onClick={() => toggleVensterVisible("variabelen")} style={{backgroundColor: variabelenVisible ? "darkblue" : "dimgrey"}} >
                        {/*style={{backgroundColor: variabelenVisible ? "chartreuse" : "darkmagenta"}}*/}
                        <div className={"navItem"} >Variabelen</div>
                    </li>
                    <li onClick={() => toggleVensterVisible("regels")}>
                        <div className={"navItem"}>Regels</div>
                    </li>
                    <li onClick={() => toggleVensterVisible("gebeurtenissen")}>
                        <div className={"navItem"}>Gebeurtenissen</div>
                    </li>
                    <li onClick={() => toggleVensterVisible("resultaten")}>
                        <div className={"navItem"}>Resultaten</div>
                    </li>
                </ul>
            </div>
            <div id={"venster"} className={"venster"}>
                {variabelenVisible && (
                    <VariabelenVenster/>
                )}
                {regelsVisible && (
                    <RegelsVenster/>
                )}
                {gebeurtenissenVisible && (
                    <GebeurtenissenVenster/>
                )}
                {resultatenVisible && (
                    <ResultatenVenster/>
                )}
            </div>
            <form >
                <label htmlFor="cars">Kies een bv</label>
                <select name="bv" id="bv" onChange={(event) => setBerekendeVar(getAllData(event.target.value))}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </form>
            <p>{JSON.stringify(berekendeVar)}</p>
        </div>
    )
}
