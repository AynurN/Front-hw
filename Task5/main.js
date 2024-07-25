document.addEventListener("DOMContentLoaded", function() {
    let siteThemeChangeBtn = document.getElementById("ThemeChange");
    let currentTheme = localStorage.getItem("themeMode") || "light";
    document.body.classList.add(currentTheme + "-mode");

    function updateThemeButton() {
        if (currentTheme == "light") {
            siteThemeChangeBtn.style.backgroundColor = "black";
            siteThemeChangeBtn.innerText = "Dark";
            siteThemeChangeBtn.style.color = "white";
        } else {
            siteThemeChangeBtn.style.backgroundColor = "white";
            siteThemeChangeBtn.innerText = "Light";
            siteThemeChangeBtn.style.color = "black";
        }
    }

    updateThemeButton();

    siteThemeChangeBtn.addEventListener("click", function() {
        if (document.body.classList.contains("light-mode")) {
            document.body.classList.replace("light-mode", "dark-mode");
            currentTheme = "dark";
        } else {
            document.body.classList.replace("dark-mode", "light-mode");
            currentTheme = "light";
        }
        localStorage.setItem("themeMode", currentTheme);
        updateThemeButton();
    })

    let input = document.getElementById("input");
    let inputBtn = document.getElementById("inputBtn");
    let items = document.getElementById("items");
    let err = document.getElementById("errMessage");

    let toDoListArrStr=localStorage.getItem("toDoList");
    let toDoListArr = JSON.parse(toDoListArrStr) || [];
    toDoListArr.forEach(item => addItemToDOM(item));

    function addItemToDOM(item) {
        let itemDiv = document.createElement("div");
        itemDiv.style.display = "flex";
        itemDiv.style.alignItems = "center";
        itemDiv.style.margin = "5px";

        let li = document.createElement("li");
        li.style.marginRight = "5px";
        li.innerText = item;

        let rmvBtn = document.createElement("button");
        rmvBtn.classList.add("btn", "btn-danger");
        rmvBtn.innerText = "Remove";

        itemDiv.append(li);
        itemDiv.append(rmvBtn);
        items.append(itemDiv);

        rmvBtn.addEventListener("click", function() {
            rmvBtn.parentElement.remove();
            removeItemFromLocal(item);
        })
    }

    function addItemToLocal(item) {
        toDoListArr.push(item);
        localStorage.setItem("toDoList", JSON.stringify(toDoListArr));
    }

    function removeItemFromLocal(item) {
        toDoListArr = toDoListArr.filter(i => i != item);
        localStorage.setItem("toDoList", JSON.stringify(toDoListArr));
    }

    inputBtn.addEventListener("click", function() {
        if (input.value.trim() == "") {
            err.style.display = "block";
        } else {
            err.style.display = "none";
            addItemToDOM(input.value);
            addItemToLocal(input.value);
            input.value = "";
        }
    })
})
