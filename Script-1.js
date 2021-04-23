//selector
const TodoInput = document.querySelector('.to-do-input');
const TodoButton = document.querySelector('.to-do-button');
const TodoList = document.querySelector('.to-do-list');
const filterOption = document.querySelector(".filter-to-do");
//localStorage.clear();
class Todo{
    constructor(tarefa, fase){
        this.tarefa=tarefa;
        this.fase=fase;
    }
}


//listeners
document.addEventListener('DOMContentLoaded', appearLocalTodos);
TodoButton.addEventListener('click', addTodo);
TodoList.addEventListener('click', deleteComplete);
filterOption.addEventListener('click', filterTodo);
//functions

function appearTodo(todo){
    //To do DIV
    const todoDiv= document.createElement("div");
    todoDiv.classList.add("todo");
    //item
    const newTodo= document.createElement("li");
    newTodo.innerText= todo.tarefa;
    newTodo.classList.add('to-do-item');
    todoDiv.appendChild(newTodo);
    //botão 'completo'
    const completoButton=document.createElement('button');
    completoButton.innerHTML = '<i class="fas fa-check-circle"></i>'
    completoButton.classList.add("complete-btn");
    todoDiv.appendChild(completoButton);
    //botão 'apagar'
    const deleteButton=document.createElement('button');
    deleteButton.innerHTML = '<i class="far fa-trash-alt"></i>'
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);
    if(todo.fase === 'completed'){
        todoDiv.classList.toggle('completed');
        //todoDiv.classList.toggle('completed');
    }
    //adcionar div ao to-do-list
    TodoList.appendChild(todoDiv);
}

function addTodo(event){
    //previne atualizações
    event.preventDefault();
    if(TodoInput.value!=''){
        const novo=new Todo(TodoInput.value,"uncompleted");
        appearTodo(novo);
        saveLocalTodos(novo);
        TodoInput.value='';
    }
}

function deleteComplete(event){
    const item= event.target;
    //delete
    if(item.classList[0] === 'delete-btn'){
        const todo= item.parentElement;
        todo.classList.add("deleteAnimation");
        console.log(todo);
        let todos=checarLocalStorage();
        removeLocalTodos(todos.find(p=> p.tarefa===todo.children[0].innerText));
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }
    //completed
    if(item.classList[0] === 'complete-btn'){
        
        const todo= item.parentElement;
        todo.classList.toggle('completed');
        atualizaFaseLocal(todo);
    }
}

function filterTodo(event){
    const todos=TodoList.childNodes;
    todos.forEach(function(todo){
        switch(event.target.value){
            case "all":
                todo.style.display= "flex";
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display= "flex";
                }else{
                    todo.style.display= "none";
                }
                break;
            case "uncompleted":
                if(todo.classList.contains('completed')){
                    todo.style.display= "none";
                }else{
                    todo.style.display= "flex";
                }
                break;
        }
    });
}

//checa se há algo na local storage e caso não cria uma uma array e 
//retorna essa array
function checarLocalStorage(){
    let todos;
    if(localStorage.getItem("todos")!=null){
        todos=JSON.parse(localStorage.getItem("todos"));
    }else{
        todos=[];
    }
    return todos;
}

//cria a array de to dos caso não exista, se existe adciona o todo
function saveLocalTodos(todo){
    let todos=checarLocalStorage();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

//Mostra os To-dos Salvos quando a tela inicia
function appearLocalTodos(){
    let todos=checarLocalStorage();
    if(Array.isArray(todos)){
        todos.forEach(function(todo){
            if(todo!=undefined){
                appearTodo(todo);
            }
        });
    }
    
}

function atualizaFaseLocal(todo){
    let todos=checarLocalStorage();
    let temp= new Todo;
    temp=todos.find(p=> p.tarefa===todo.children[0].innerText);
    removeLocalTodos(temp);
    if(temp.fase==='completed'){
        temp.fase='uncompleted';
    }else{
        temp.fase='completed';
    }
    saveLocalTodos(temp);
}
function removeLocalTodos(todo){
    let todos=checarLocalStorage();
    if(todo!=undefined){
        console.log(todos.indexOf(todos.find(p=> p.tarefa===todo.tarefa)));
        todos.splice(todos.indexOf(todos.find(p=> p.tarefa===todo.tarefa)), 1);
        localStorage.setItem("todos", JSON.stringify(todos));
}}
