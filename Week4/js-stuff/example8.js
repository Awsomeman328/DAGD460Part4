

var div = document.getElementById("content");
div.innerHTML = "does this work?";

var bttn = document.createElement("button");
bttn.innerHTML="click me";


bttn.addEventListener("click", ()=>{
    alert("that tickled");
});



document.body.append(bttn);


