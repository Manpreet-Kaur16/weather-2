console.log("file added in html");
let addtaskButton = document.getElementById("addtask");
let inputFieldElement = document.getElementById("inputField");
let listElement = document.getElementById("list");
let toDoContainerElement = document.getElementById("toDoContainer");
addtaskButton.addEventListener("click", () => {

    console.log(inputFieldElement.value);
    CreateToDo(inputFieldElement.value);
})

async function CreateToDo(title) {
    try {

        let payLoad = {
            title: title,
        }
        let apiResponse = await fetch("https://api.freeapi.app/api/v1/todos/", {
            method: "POST",
            headers: { accept: 'application/json', 'content-type': 'application/json' },
            body: JSON.stringify(payLoad)

        })
        inputFieldElement.value = "";
        // when we create new todo
        getToDos();


    }
    catch (error) {
        console.log(error);
    }
    finally {
        console.log("done");
    }
}

async function getToDos() {
    try {
        let apiResponse = await fetch("https://api.freeapi.app/api/v1/todos")

        let jsonData = await apiResponse.json();
        console.log(jsonData);
        displayToDos(jsonData.data);

        // If no todos
        if (jsonData.data.length === 0) {
            toDoContainerElement.innerHTML = '<div class="text-center py-4 text-gray-500">No tasks yet. Add one above!</div>';
        }

    }
    catch (error) {
        console.log(error);
    }

}
//  to call all todos on intial page loading
getToDos();

function displayToDos(toDosdata) {
    console.log(toDosdata);
    let toDoshtml = "";
    toDosdata.forEach(toDo => {
        toDoshtml += ` <div class="px-4 py-2 flex justify-between" id="list">
        <div class="flex gap-4">
        <input type="checkbox" onchange="toggleToDo(event)" data-id="${toDo._id}" ${toDo.isComplete ? "checked" : ""}/>   
                        <span class="${toDo.isComplete ? "line-through text-gray-500" : ""}">${toDo.title}</span>
                        </div>
                          <div>
                    <button class="bg-blue-700 rounded-lg border-gray-300 px-4 py-1 text-white" onclick ="editToDo(event)" data-id="${toDo._id}" >Edit</button>
                    <button class="bg-red-700 rounded-lg border-gray px-4 py-1 text-white" onclick="deleteToDo(event)" data-id="${toDo._id}">Delete</button>
                </div>
                    </div>`
    });

    toDoContainerElement.innerHTML = toDoshtml;
}

function toggleToDo(event) {
    console.log("function is called", event.target.getAttribute("data-id"));

    toggleToDoApi(event.target.getAttribute("data-id"));
}
async function toggleToDoApi(toDoId) {
    try {
        let apiResponse = await fetch(`https://api.freeapi.app/api/v1/todos/toggle/status/${toDoId}`, {
            method: "PATCH",
            headers: { accept: 'application/json', 'content-type': 'application/json' },
        });
        getToDos();

    }
    catch (error) {
        console.log(error);
    }
}
// deleteing todo by clicking delete button //

function deleteToDo(event) {
    console.log("hello", event.target.getAttribute("data-id"));

    let userConsent = confirm("Do you want to delete to do");

    if (userConsent) {

        deleteToDoApi(event.target.getAttribute("data-id"));
    }
}
async function deleteToDoApi(toDoId) {


    try {
        let apiResponse = await fetch(`https://api.freeapi.app/api/v1/todos/${toDoId}`,
            {
                method: "DELETE",
            }
        )
        getToDos();
    }
    catch (error) {
        console.log(error);
    }
}

//edit button click editing todos here//

async function editToDo(event) {

    const id = (event.target.getAttribute("data-id"))

    let title = await getToDoByIdApi(id);
    
    const newTitle = prompt("Edit ToDo", title);

    if (newTitle !== "") {

        editToDoApi(id, newTitle);
    }


    else {
        prompt("please enter any value.")
    }

}

async function editToDoApi(toDoId, title) {
    try {

        let apiResponse = await fetch(`https://api.freeapi.app/api/v1/todos/${toDoId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title })
            });

        getToDos();
    }

    catch (error) {
        console.log(error);
    }
}

// get toDo with Id //

async function getToDoByIdApi(toDoId) {
    try {
        let apiresponse = await fetch(`https://api.freeapi.app/api/v1/todos/${toDoId}`);
        console.log(apiresponse);
        let jsonData = await apiresponse.json();
        console.log("json data received here", jsonData);

        return jsonData.data.title;
    }
    catch (error) {
        console.log(error);
    }

}