let input=document.querySelector("#input");
let inputBtn=document.querySelector("#inputBtn");
let items=document.querySelector("#items");

inputBtn.addEventListener("click", function(){
    if(input.value==""){
        alert("It should not be empty!")
    }
    else{
        let conDiv=document.createElement("div");
        let delBtn=document.createElement("button");
        delBtn.innerText="Remove";
        delBtn.style.backgroundColor="red";
        delBtn.addEventListener("click", function(){
            delBtn.parentElement.remove();
        }
        )


        let li=document.createElement("li");
        li.innerText=input.value; 
        li.style.marginRight="5px";    
        conDiv.append(li);
        conDiv.append(delBtn);
        conDiv.style.display="flex";
        conDiv.style.marginBottom="5px";
        items.append(conDiv);
    }
    input.value="";
}


)