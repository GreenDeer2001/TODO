const list = document.querySelector(".tasks-list")
const addListBtn = document.querySelector(".btn-add-task")
const addtaskBtn = document.querySelector(".add-task")
const userInput = document.querySelector(".add-task-input")
const userTaskInput = document.querySelector(".add-task-detail")
const title = document.getElementById("task-title")
const tasks = document.querySelector(".tasks-center")
const deleteListBtn =  document.querySelector(".delete-list")
const deleteCompletedBtn = document.querySelector(".delete-completed")
const tasksCenter = document.querySelector(".task-details")

let listOfTask = []

let targetList;
let currentList;









function listTaskHandler (){
   
   listOfTask.forEach(list =>{
    if(list.id === targetList.dataset.id){
        currentList = list;
   }})
    title.textContent = currentList.title;
 

    loadTask();
}


function loadTask(){
   
  
    tasks.innerHTML = "";
    currentList.task.forEach(task => {
        let singleTask = document.createElement("div")
        singleTask.classList.add("single-task-detail")
        const tempID = Math.random();
        singleTask.innerHTML = `
        <input type="checkbox" id="${tempID}">
                <label for="${tempID}">
                   <span class='custom-checkbox'></span>
                    ${task}
              </label>
        `
        tasks.appendChild(singleTask)
    })
}








deleteListBtn.addEventListener("click", ()=>{
    console.log(currentList)
     let tempList = listOfTask.filter(list => list.id !== targetList.dataset.id)
     listOfTask = tempList;
     list.innerHTML =   ``
     listOfTask.forEach(e =>{
        let listElement;
        listElement = document.createElement("li");
        listElement.classList.add("single-task")
        listElement.dataset.id = e.id;
        listElement.textContent= e.title;
        list.appendChild(listElement)
     })
     tasksCenter.style.display = "none"


})



list.addEventListener("click", e =>{
   
    if(targetList !== undefined) targetList.classList.remove("active")
    if(e.target.tagName === "LI"){      
        targetList = e.target;
    }
    targetList.classList.add("active")
    tasksCenter.style.display = "initial"
    listTaskHandler();
   
})




addtaskBtn.addEventListener("click", (e)=>{
    e.preventDefault();

    if(userTaskInput.value === null || userTaskInput.value === "" || userTaskInput.value === undefined){
        return;
    }else{
     listOfTask.map( e =>{
        if(e.id === currentList.id){
          e.task.push(userTaskInput.value)
         userTaskInput.value = ""
        listTaskHandler();
        }
     })  
    }
})



deleteCompletedBtn.addEventListener("click", ()=>{


    listOfTask.forEach(list =>{
        if(list.id === targetList.dataset.id){

            let tempArray = [];
            let i = 0;
            const tempListOfTasks = tasks.querySelectorAll("div")
            list.task.forEach( () => {
                if(tempListOfTasks[i].classList.contains("checked")){
                    i++;
                   return 
                }else{
                    tempArray.push(list.task[i++])
                }
            })
            list.task = tempArray;
      
    }
})
    loadTask();

})


addListBtn.addEventListener("click", e=>{
    e.preventDefault();
    if(userInput.value === null || userInput.value === "" || userInput.value === undefined){
        return;
    }else{
        let listElement;
        listElement = document.createElement("li");
        listElement.classList.add("single-task")
        listElement.textContent= userInput.value;
        let id =  Date.now()
        listElement.dataset.id = id ;
        userInput.value= "";
        list.appendChild(listElement)


        listOfTask.push({id: id.toString(), title:listElement.textContent, task:[]})
       


        if(targetList !== undefined) targetList.classList.remove("active")
        targetList = list.lastElementChild;
        targetList.classList.add("active")
         tasksCenter.style.display = "initial"
         listTaskHandler();
       
      
    }
    
})






tasks.addEventListener("click", tsk =>{

    if(tsk.target.tagName === "INPUT"){
        tsk.target.closest("div").classList.toggle("checked")
    }
 })

 

