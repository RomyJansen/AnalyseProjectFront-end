export function REST(json){
    fetch("http://localhost:8000/update-cell", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: json
    });
    var id = 1;
    fetch("http://localhost:8000/db", {
        method: "POST",
        headers:{ "Content-Type": "application/json" },
        body: JSON.stringify({
            id1: 1
        })
    }).then(response =>{
        if(response.ok) {return response.json().toString();}
        else return "ooops";
    });

}
