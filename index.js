// find elements

const container = document.querySelector(".container");
const form = document.querySelector(".todo-form");
const input = document.querySelector("#inputTodo");
const button = document.querySelector(".btn");
const lists = document.querySelector("#lists");
const message = document.querySelector("#message");

// add event listener

const createTodo = (todovalue,todoId)=>{
        const todoelement = document.createElement("li");
        todoelement.id=todoId;
        todoelement.innerHTML=`<span> ${todovalue}</span> <span> <button class="btn" id="deleteButton"><i class="fa fa-trash"></i></button></span>`;
        lists.appendChild(todoelement);
        todoelement.classList.add("li-style");

        // add local storage

        const todos = localStorage.getItem("mytodos")?JSON.parse(localStorage.getItem("mytodos")):[];
        todos.push({todoId,todovalue});
        localStorage.setItem("mytodos",JSON.stringify(todos));
        input.value="";

        // delete todo

        const deleteTodo = todoelement.querySelector("#deleteButton");
        deleteTodo.addEventListener("click",(event)=>{
            showMessage("Todo is deleted","danger");
            const selectedTodo =  event.target.parentElement.parentElement.parentElement;
            lists.removeChild(selectedTodo);
            todos= todos.filter((todo)=>todo.todoId!==selectedTodo.id)  
            localStorage.setItem("mytodos",JSON.stringify(todos));
        })
};

const showMessage = (text,status)=>{
    message.textContent = text;
    message.classList.add(`bg-${status}`);
    setTimeout(()=>{
        message.textContent="";
        message.classList.remove(`bg-${status}`)
    },1000)
};


    


/// load todo

const loadTodo= (todoId,todovalue)=>{
    const todoelement = document.createElement("li");
        todoelement.id=todoId;
        todoelement.innerHTML=`<span> ${todovalue}</span> <span> <button class="btn" id="deleteButton"><i class="fa fa-trash"></i></button></span>`;
        lists.appendChild(todoelement);
        todoelement.classList.add("li-style");
}


/// add todo

form.addEventListener("submit",(event)=>{
    event.preventDefault();
    let todovalue = input.value;
    const todoId = Date.now().toString();
    createTodo(todovalue,todoId);
    input.value="";
    showMessage("Todo is added","success");
});
window.addEventListener("DOMContentLoaded",loadTodo=>{
    const todos = localStorage.getItem("mytodos")?JSON.parse(localStorage.getItem("mytodos")):[];
    todos.map((todo)=>loadTodo(todo.todoId,todo.todovalue)) 
})