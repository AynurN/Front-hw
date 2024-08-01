let draggableDiv=document.getElementsByClassName("draggableDiv")
let dropZoneFruit=document.getElementById("dropZoneFruit")
let dropZoneVeg=document.getElementById("dropZoneVeg")

draggableDiv.forEach(element => {
    element.addEventListener("dragstart", function(e){
        e.dataTransfer.setData("text", e.target.id);
    })
});
dropZoneFruit.addEventListener("dragover", function(e){
    var data = ev.dataTransfer.getData("text");
    e.target.appendChild(document.getElementById(data));

})
dropZoneFruit.addEventListener("drop", function(e){
    e.preventDefault;
    
})
dropZoneVeg.addEventListener("dragover", function(e){
    e.preventDefault();
})
dropZoneVeg.addEventListener("drop", function(e){
    e.preventDefault;
    
})