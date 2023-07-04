export function VariabelenVenster(){

    class Variabele{
        id;
        name;
        value;

        constructor(id, name, value) {
            this.id = id;
            this.name = name;
            this.value = value;
        }
    }

    const mockVars = [];
    for (let i = 0; i < 10; i++) {
        mockVars.push(new Variabele(i, "name" + i, i*i))
    }

    return (
        <div id={"variabelen-venster"}>
            <p>*variabelen*</p>
            {mockVars && mockVars.map((vars,index) => (
                <p>{vars.name} - {vars.value}</p>
            ))}
        </div>
    )
}
