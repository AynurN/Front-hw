let no= document.querySelector("#No");
let fullName= document.querySelector("#name");
let pos=document.querySelector("#pos");
let inputBtn=document.querySelector("#inputBtn");
let items=document.querySelector("#items");

inputBtn.addEventListener("click", function(){
    if(no.value=="" || fullName.value=="" || pos.value==""){
        alert("It should not be empty!")
    }
    else{
        let tr=document.createElement("tr");
        let td1=document.createElement("td");
        let td2=document.createElement("td");
        let td3=document.createElement("td");
        td1.innerText=no.value;
        td2.innerText=fullName.value;
        td3.innerText=pos.value;
        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
        items.append(tr);
    }
    no.value=="" ;
    fullName.value=="" ;
     pos.value=="";
}
)