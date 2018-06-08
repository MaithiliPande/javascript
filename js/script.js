var taskList = {
    tasks : [],
    addTasks :function(taskDetails){
    this.tasks.push({taskDetails : taskDetails});
    },
    deleteTasks : function(position){
        this.tasks.splice(position,1);
    },
    deleteAllTasks : function(){
        this.tasks = [];
    },
    changeStatus : function(position){
        this.tasks[position].taskDetails.status = !this.tasks[position].taskDetails.status;
    }
};

var handlers = {
    displayTask : function (){
        view.displayTasks();    
    },
    addTask : function(){
      var titleInput = document.getElementById("titleInput");
      var dueDateInput = document.getElementById("dueDateInput");
      var taskDetails = {
          title:titleInput.value,
          dueDate:dueDateInput.value,
          status:false};
      taskList.addTasks(taskDetails);
        titleInput.value = "";
        dueDateInput = "";
      view.displayTasks();
    },
    deleteTask : function(position){
        var checkboxes = document.getElementsByName("checkbox");
        for (i = checkboxes.length-1 ; i>=0 ; i --){
            if(checkboxes[i].checked){
                taskList.deleteTasks(i);
            }
        }
        view.displayTasks();
    },
    deleteAllTask : function(){
        taskList.deleteAllTasks();
        view.displayTasks();
    },
    changeStatus : function (){
         var checkboxes = document.getElementsByName("checkbox");
        for (i = checkboxes.length-1 ; i>=0 ; i--){
         if(checkboxes[i].checked){
           
            taskList.changeStatus(i);
         }
        }
        view.displayTasks();
    },
    filterTasks : function(){
        console.log(taskList.tasks);
        console.log("inside filter method")
        var filterInput = document.getElementById("filterInput");
        console.log(filterInput.value);
        if(filterInput.value === "In Progress"){
           var filteredTasksInProgress = taskList.tasks.filter(filterTasksInProgress);
            console.log(filteredTasksInProgress,"-----------in progress");
            view.displayFilteredTasks(filteredTasksInProgress);
        }
        if(filterInput.value === "Completed"){
           var filteredTasksComplete = taskList.tasks.filter(filterTasksCompleted);
            console.log(filteredTasksComplete,"----------completed");
            view.displayFilteredTasks(filteredTasksComplete);
        }
        if(filterInput.value === "All"){
            view.displayFilteredTasks(taskList.tasks);
        }
        function filterTasksInProgress(task) {
            console.log("filterTAsksInProgress status----",task.taskDetails.status)
            return task.taskDetails.status==false ;
        }
        function filterTasksCompleted(task) {
            return task.taskDetails.status==true ;
        }
    },
    selectAll : function(){
        var checkboxes = document.getElementsByName("checkbox");
        var selectAllCheckBox = document.getElementById("selectAll");
        if(selectAllCheckBox.checked){
            for(i=0;i<=checkboxes.length-1;i++){
                checkboxes[i].checked = true;
            }
        }else{
            for(i=0;i<=checkboxes.length-1;i++){
                checkboxes[i].checked = false;
            }
        }
    }
};

var view = {
    displayTasks : function(){
        var taskTable = document.querySelector("table");
        taskTable.innerHTML = "";
        var selectAll = this.createCheckBox();
        selectAll.setAttribute("id","selectAll");
        selectAll.setAttribute("onclick","handlers.selectAll()");
        var tableTr = document.createElement("tr");
        
        var titleHead = document.createElement("th");
        titleHead.textContent = "Title";
        
        var dueDateHead = document.createElement("th");
        dueDateHead.textContent = "Due Date";
        
        var statusHead = document.createElement("th");
        statusHead.textContent = "Status";
        
        tableTr.appendChild(selectAll);
        tableTr.appendChild(titleHead);
        tableTr.appendChild(dueDateHead);
        tableTr.appendChild(statusHead);
       
        taskTable.appendChild(tableTr);
        for(let i=0;i<taskList.tasks.length;i++){
            var checkBox = this.createCheckBox();
            checkBox.setAttribute("id",i);
            checkBox.setAttribute("name","checkbox");
            
            var task = taskList.tasks[i].taskDetails;
            var taskTr = document.createElement("tr");
            taskTr.id = i;
            
            var titleTd = document.createElement("td");
            titleTd.textContent = task.title;
            
            var dueDateTd = document.createElement("td");
            dueDateTd.textContent = this.findDateDiff(task.dueDate);
            
            var taskStatusTd = document.createElement("td");
            
            if(task.status){
                taskStatusTd.textContent = "Completed";
            }else{
                taskStatusTd.textContent = "In Progress";
            }
            
            taskTr.append(checkBox);
            taskTr.append(titleTd);
            taskTr.append(dueDateTd);
            taskTr.append(taskStatusTd);
            taskTable.appendChild(taskTr);
        }
    },
    createCheckBox : function(){
        var checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        return checkBox;
    },
    findDateDiff : function(inputDate){
        var givenDate = new Date(inputDate);
        var currentDate = new Date();
        var statusMessage = "";
        if(givenDate.getDate() === currentDate.getDate()){
            statusMessage = "Due Today";
        }else if(givenDate.getTime() > currentDate.getTime()){
            var daysLeft = givenDate.getDate() - currentDate.getDate();
            statusMessage = daysLeft+" days left";
        }else {
            statusMessage = "Overdue";
        }
        return statusMessage;
    },
      displayFilteredTasks : function(tasks){
        var taskTable = document.querySelector("table");
        taskTable.innerHTML = "";
        var selectAll = this.createCheckBox();
        selectAll.setAttribute("id","selectAll");
        selectAll.setAttribute("onclick","handlers.selectAll()");
        var tableTr = document.createElement("tr");
        
        var titleHead = document.createElement("th");
        titleHead.textContent = "Title";
        
        var dueDateHead = document.createElement("th");
        dueDateHead.textContent = "Due Date";
        
        var statusHead = document.createElement("th");
        statusHead.textContent = "Status";
        
        tableTr.appendChild(selectAll);
        tableTr.appendChild(titleHead);
        tableTr.appendChild(dueDateHead);
        tableTr.appendChild(statusHead);
       
        taskTable.appendChild(tableTr);
        for(let i=0;i<tasks.length;i++){
            var checkBox = this.createCheckBox();
            checkBox.setAttribute("id",i);
            checkBox.setAttribute("name","checkbox");
         
            var taskTr = document.createElement("tr");
            taskTr.id = i;
            
            var titleTd = document.createElement("td");
            titleTd.textContent = tasks[i].taskDetails.title;
            
            var dueDateTd = document.createElement("td");
            dueDateTd.textContent = this.findDateDiff(tasks[i].taskDetails.dueDate);
            
            var taskStatusTd = document.createElement("td");
            
            if(tasks[i].taskDetails.status){
                taskStatusTd.textContent = "Completed";
            }else{
                taskStatusTd.textContent = "In Progress";
            }
            
            taskTr.append(checkBox);
            taskTr.append(titleTd);
            taskTr.append(dueDateTd);
            taskTr.append(taskStatusTd);
            taskTable.appendChild(taskTr);
        }
    }
};
