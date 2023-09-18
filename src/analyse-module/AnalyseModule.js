import {setVars, VariabelenVenster} from "./functie-balk/VariabelenVenster";
import {RegelsVenster} from "./functie-balk/RegelsVenster";
import {GebeurtenissenVenster} from "./functie-balk/GebeurtenissenVenster";
import {ResultatenVenster} from "./functie-balk/ResultatenVenster";
import {useEffect, useMemo, useRef, useState} from "react";
import "./analyse-styles.css";
import {getAllData, getBerekendeVar, REST} from "../data/REST";
import {decreaseJaar, getJaar, incrementJaar} from "./state";


export function AnalyseModule() {
    const [variabelenVisible, setVariabelenVisible] = useState(false);
    const [regelsVisible, setRegelsVisible] = useState(false);
    const [gebeurtenissenVisible, setGebeurtenissenVisible] = useState(false);
    const [resultatenVisible, setResultatenVisible] = useState(false);
    const [berekendeVar, setBerekendeVar] = useState(0);
    const [scenario, setScenario] = useState(0);
    const [jaar, setJaar] = useState(getJaar());


    function increaseJaar(){
        incrementJaar()
        setJaar(getJaar())
    }

    function decreaseJaarhier(){
        decreaseJaar()
        setJaar(getJaar())
    }

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

    function getGebeurtenissen(){
        return scenario
    }

    function checkIfActive(type){

        return "active";
    }

    async function getData() {
        setScenario(await getAllData())
    }

    return (
        <div id={"analyse-module"} className={"analysemodule"}>
            <div className={"vensterNav"}>
                <ul className={"navBar"}>
                    <li className={"active"}  onClick={() => toggleVensterVisible("variabelen")} style={{backgroundColor: variabelenVisible ? "darkblue" : ""}} >
                        {/*style={{backgroundColor: variabelenVisible ? "chartreuse" : "darkmagenta"}}*/}
                        <div className={"navItem"} >Variabelen</div>
                    </li>
                    <li onClick={() => toggleVensterVisible("regels")} style={{backgroundColor: regelsVisible ? "darkblue" : ""}}>
                        <div className={"navItem"}>Regels</div>
                    </li>
                    <li onClick={() => toggleVensterVisible("gebeurtenissen")} style={{backgroundColor: gebeurtenissenVisible ? "darkblue" : ""}}>
                        <div className={"navItem"}>Gebeurtenissen</div>
                    </li>
                    <li onClick={() => toggleVensterVisible("resultaten")} style={{backgroundColor: resultatenVisible ? "darkblue" : ""}}>
                        <div className={"navItem"}>Resultaten</div>
                    </li>
                    <li style={{width: "12%"}}>
                        <div className={"navItem-jaar"}><button onClick={decreaseJaarhier}>-</button>{jaar}<button onClick={increaseJaar}>+</button></div>
                    </li>
                </ul>
            </div>
            <div style={{display: "flex", flexDirection: "row", overflow: "auto"}}>
                {(variabelenVisible || regelsVisible || gebeurtenissenVisible || resultatenVisible) && (
                    <div id={"venster"} className={"venster"} >
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
                ) }

            {/*<div id={"lolz"} style={{display: "flex", overflow: "hidden"}}>*/}
            {/*<form >*/}
            {/*    <label htmlFor="cars">Kies een bv</label>*/}
            {/*    <select name="bv" id="bv" onChange={(event) => setBerekendeVar(getBerekendeVar(event.target.value))}>*/}
            {/*        <option value="1">1</option>*/}
            {/*        <option value="2">2</option>*/}
            {/*        <option value="3">3</option>*/}
            {/*        <option value="4">4</option>*/}
            {/*        <option value="5">5</option>*/}
            {/*    </select>*/}
            {/*</form>*/}
            {/*<p>{JSON.stringify(berekendeVar)}</p>*/}
            {/*<p>{JSON.stringify(scenario)}</p>*/}
            {/*<button onClick={() => getData()}>scenario</button>*/}
            {/*</div>*/}
            </div>
            {/*<button onClick={() => this.setState({ scenario: "test" })}>scenario</button>*/}

        </div>
    )
}

