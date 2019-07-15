$(document).ready(function(){


$('#add-task-form').on('submit', function(e){
		addTask(e);
});


$('#buildyourform').on('click','#makechng',function() {
	var checkedIds = $(".chk:checked").map(function() {
    makechngtodone(this.id);
    console.log(this.id);
	});
  /*}).toArray();
  alert(checkedIds.join(", "));*/
	
});


//remove a task
$('#table25').on('click','#remove-task', function(){
	id = $(this).data('id');
	removeTask(id);
});




displayallTasks();

displaytasktable();

displaytodaytasktable();

displaytomorrowtable();

displayremaintable();

function displaytasktable(){
	var taskList1 = JSON.parse(localStorage.getItem('tasks_list'));
	console.log("Hello1");
	if(localStorage.getItem('tasks_list')!=null){
		console.log("Hello2");
		$.each(taskList1,function(key,value){
			
			$('#table25').append('<tr id="' + value.id + '">'+
								'<td><a href="#" id="remove-task" data-id="'+value.id+'">' + value.task_name + '</td>' +
								'<td>' + value.task_priority + '</td>' +
								'<td>' + value.task_date + '</td>' +
								
								'</tr>'
								);
			
		})
}
}

function displayremaintable() {
	var taskList1 = JSON.parse(localStorage.getItem('tasks_list'));
	console.log("Hello1");
	if(localStorage.getItem('tasks_list')!=null){
		console.log("Hello2");
		$.each(taskList1,function(key,value){
			if(value.task_done==0){
			$('#table14').append('<tr id="' + value.id + '">'+
								'<td>' + value.task_name + '</td>' +
								'<td>' + value.task_date + '</td>' +
								'</tr>'
								);
			}
		})
	}
}

function displaytomorrowtable() {
	var taskList1 = JSON.parse(localStorage.getItem('tasks_list'));
	console.log("Hello1");
	if(localStorage.getItem('tasks_list')!=null){
		console.log("Hello2");
		$.each(taskList1,function(key,value){
			if(to_dategre(value.task_date)){
			$('#table12').append('<tr id="' + value.id + '">'+
								'<td>' + value.task_name + '</td>' +
								'<td>' + value.task_priority + '</td>' +
								'<td>' + value.task_date + '</td>' +
								'</tr>'
								);
			}
		})
	}
}

function displaytodaytasktable(){
	var taskList1 = JSON.parse(localStorage.getItem('tasks_list'));
	console.log("Hello1");
	if(localStorage.getItem('tasks_list')!=null){
		console.log("Hello2");
		$.each(taskList1,function(key,value){
			if(to_date(value.task_date)){
			$('#table13').append('<tr id="' + value.id + '">'+
								'<td>' + value.task_name + '</td>' +
								'<td>' + value.task_priority + '</td>' +
								'</tr>'
								);
			}
		})
	}
}

function displayallTasks() {
	var taskList1 = JSON.parse(localStorage.getItem('tasks_list'));
	console.log("Hello1");
	if(localStorage.getItem('tasks_list')!=null){
		console.log("Hello2");
		$.each(taskList1,function(key,value){
			if(to_date(value.task_date)){
				if(value.task_done==0){
			$('#tablesh').append('<tr id="' + value.id + '">'+
								'<td>' + value.task_name + '</td>' +
								'<td>' + value.task_priority + '</td>' +
								'<td><input type="checkbox" class="chk" name="isdone" id="'+value.id+'">'+
								'</tr>'
								);
			}
			else{
				$('#tablesh').append('<tr id="' + value.id + '">'+
								'<td>' + value.task_name + '</td>' +
								'<td>' + value.task_priority + '</td>' +
								'<td><input type="checkbox" class="chk" name="isdone" id="'+value.id+'" checked>'+
								'</tr>'
								);	
			}
			}
		})
	}
}
	
	//remove task funtion
	function removeTask(id){
		if(confirm('Are you sure you want to delete this task?')){
			var taskList = JSON.parse(localStorage.getItem('tasks_list'));

			for(var i=0; i < taskList.length; i++){
			if(taskList[i].id == id){
				taskList.splice(i,1)
			}
			localStorage.setItem('tasks_list', JSON.stringify(taskList));
		}

		location.reload();

		}
	}


 	function addTask(e){

 		var newDate = new Date();
 		id = newDate.getTime();
 		var task_done = 0;
 		var task_name = $("#task").val();
 		var task_date = $("#dateselecttx").val();
 		var task_priority = $("#selectid").val();

 		console.log("Hello");
 		if(task_name==''){
 			alert('Task is required');
 			e.preventDefault();
 		}
 		else if(task_date ==''){
 			alert("Date is required");
 			e.preventDefault();
 		}
 		else if(task_priority == ''){
 			alert("Priority is required");
 			e.preventDefault();
 		}
 		else
 		{
 			tasksl = JSON.parse(localStorage.getItem('tasks_list'));

 			if(tasksl == null){
 				tasksl = [];
 			}
 		
 			var taskList1 = JSON.parse(localStorage.getItem('tasksl'));

 			//new task object
 			var new_task = {
 				"id": id,
 				"task_name": task_name,
 				"task_date": task_date,
 				"task_done" : task_done,
 				"task_priority":task_priority
 			}

 			tasksl.push(new_task);
 			localStorage.setItem('tasks_list',JSON.stringify(tasksl));

 			console.log("Task added");
 		}
 	}	

});

function to_date(dat){

var q = new Date();
var m = q.getMonth()+1;
var d = q.getDate();
var y = q.getFullYear();

console.log(m+" "+d+" "+y);
console.log(q);

var input = dat;
var output = input.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$2-$1");

console.log(output);
var t = new Date(output);

console.log(t);
var m1 = t.getMonth()+1;
var d1 = t.getDate();
var y1 = t.getFullYear();
console.log(m1+" "+d1+" "+y1);

if(m1==m && d1==d && y1==y){
	return true;
}
else{
	return false;
}
}

 
function to_dategre(dat) {
	var input = dat;
	var output = input.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$2-$1");

	var CurrentDate = new Date();
	var GivenDate = new Date(output);

	if(GivenDate > CurrentDate){
    return true;
	}
	else{
    return false;
	}

}


function makechngtodone(datid) {
	
	var taskList = JSON.parse(localStorage.getItem('tasks_list'));
	console.log("Infun"+datid);
	for(var i=0; i < taskList.length; i++){
			if(taskList[i].id == datid){
				taskList[i].task_done = 1;
				//datid=0;
			}		
		console.log("changed"+datid);
	localStorage.setItem('tasks_list', JSON.stringify(taskList));
	}
	
	location.reload();

		
}
