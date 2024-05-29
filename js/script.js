const todos = []
const RENDER_EVENT = 'render-todo'

document.addEventListener('DOMContentLoaded', function () {
    const submitform = document.querySelector('#form')
    submitform.addEventListener ('submit',function(event) {
        event.preventDefault()
        addTodo()
    })
})

document.addEventListener(RENDER_EVENT, function() {
    const uncompletedTodoList = document.querySelector('#todos')
    uncompletedTodoList.innerHTML = ''

    const completedTodoList = document.querySelector('#completed-todos')
    completedTodoList.innerHTML = ''

    for(const todo of todos) {
        const todoElement = makeTodo(todo)

        if(!todo.isCompleted) {
            uncompletedTodoList.appendChild(todoElement)
        } else {
            completedTodoList.appendChild(todoElement)
        }
        
    }
})

const addTodo = () => {
    const textTodo = document.querySelector('#title').value
    const timestamp = document.querySelector('#date').value
    const generateID = generateId()
    const todoObject = generateTodoObject(generateID, textTodo,timestamp,false)
    todos.push(todoObject)
    document.dispatchEvent(new Event(RENDER_EVENT))
}

const makeTodo = (todoObject) => {
    const textTitle = document.createElement ('h2')
    textTitle.innerText = todoObject.task

    const timestamp = document.createElement('p')
    timestamp.innerText = todoObject.date

    const textContainer = document.createElement('div')
    textContainer.classList.add('inner')
    textContainer.append(textTitle, timestamp)

    const container = document.createElement('div')
    container.classList.add('item', 'shadow')
    container.append(textContainer)
    container.setAttribute('id', `todo-${todoObject.id}`)
      
    if(todoObject.isCompleted){
        const undoButton = document.createElement("button")
        undoButton.classList.add("undo-button")
        undoButton.addEventListener("click",function(){
         undoTaskFromComplete(todoObject.id)
        }) 

        const trashButton = document.createElement("button")
        trashButton.classList.add("trash-button")
        trashButton.addEventListener("click",function(){
            removeTaskFromCompleted(todoObject.id)
        })
        container.append(undoButton,trashButton)
    } else{
        const checkButton = document.createElement("button")
        checkButton.classList.add("check-button")
        checkButton.addEventListener("click",function(){
           addTaskToComplet(todoObject.id)
        })
        container.append(checkButton)
    }

    return container
}



const generateId = () => {
    return +new Date()
}

const generateTodoObject = (id,task,date,isCompleted) => {
    return {id,task,date,isCompleted}
}

function addTaskToComplet(todoId){
    const todoTarget = finfTodo(todoId)
    if(todoTarget == null)return
    todoTarget.isCompleted = true
    document.dispatchEvent(new Event(RENDER_EVENT))
}

function finfTodo(todoId){
    for(const todoItem of todos){
        if(todoItem.id == todoId){
            return todoItem
        }
    }
    return null
}

function removeTaskFromCompleted(todoId){
    const todoTarget = findTodoIndex(todoId)
    if(todoTarget === -1)return
    todos.splice(todoTarget,1)
    document.dispatchEvent(new Event(RENDER_EVENT))
}

function undoTaskFromComplete(todoId){
    const todoTarget = finfTodo(todoId)
    if(todoTarget === null)return
    todoTarget.isCompleted = false
    document.dispatchEvent(new Event(RENDER_EVENT))
}

function findTodoIndex(todoId){
    for(const index in todos){
        if(todos[index].id === todoId){
            return index
        }
    }

    retrum-1
}