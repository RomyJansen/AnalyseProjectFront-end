export function REST(json){
    fetch("http://localhost:8000/update-cell", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: json
    });

}
