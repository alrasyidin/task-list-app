// Define variable
let form = document.getElementById('task-form'),
	inputTask = document.getElementById('task'),
	addBtn = document.getElementById('add-task'),
	filter = document.getElementById('filter'),
	taskList = document.querySelector('ul.collection'),
	clearTasks = document.querySelector('a.clear-tasks');


// load all event listener with immediately execute function
(function() {
	// DOM Content loaded event
	document.addEventListener('DOMContentLoaded', getTask);

	form.addEventListener('submit', addTask);

	taskList.addEventListener('click', removeTask);

	clearTasks.addEventListener('click', clearTheTasks);

	filter.addEventListener('keyup', filterTask);
})();

function addTask(e){
	e.preventDefault();
	
	input = inputTask.value.trim();
	// validation if task === ''
	if (input === '') {
		alert("Add a task!");
		return;
	}

	// create li element
	const li = document.createElement('li');
	li.className = 'collection-item';
	li.textContent = input;

	// create a delete element
	const link = document.createElement('a');
	link.className = 'delete-item secondary-content center-align';
	link.innerHTML = '<i class="fa fa-trash"></i>'

	// store to localStorage
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.push(input);
	localStorage.setItem('tasks', JSON.stringify(tasks));

	// append link to li
	li.appendChild(link);

	taskList.appendChild(li);

	// clear input
	inputTask.value = '';
	// console.log(li);
}

function getTask(){
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach( function(task) {
		// create li element
		const li = document.createElement('li');
		li.className = 'collection-item';
		li.appendChild(document.createTextNode(task))

		// create a delete element
		const link = document.createElement('a');
		link.className = 'delete-item secondary-content center-align';
		link.innerHTML = '<i class="fa fa-trash"></i>'
		// append link to li
		li.appendChild(link);

		taskList.appendChild(li);
	});
}

function removeTask(e) {
	let target = e.target;

	if (target.parentElement.classList.contains('delete-item')) {
		if (confirm("Are You Sure Delete This Item?")) { 
			target.parentElement.parentElement.remove();

			// remove from local storage
			let tasks = JSON.parse(localStorage.getItem('tasks'));
			
			tasks.forEach(function (task, index) {
				if (target.parentElement.parentElement.textContent == task) {
					tasks.splice(index, 1);
				}
			})

			localStorage.setItem('tasks', JSON.stringify(tasks));
		}
	}
}

function clearTheTasks(e){
	if(confirm("Are You Sure Want to Clear All Item")) {
		// can use innerHTML
		// taskList.innerHTML = '';

		// removeChild() method using while more faster
		while(taskList.firstChild){
			taskList.removeChild(taskList.firstChild);
		}
	}
}

function filterTask(e){
	let filter = e.target.value.trim().toLowerCase();
	let tasks = taskList.querySelectorAll('li.collection-item');
	if (tasks !== null) {
		tasks.forEach( function(task) {
			if (task.textContent.indexOf(filter) !== -1) {
				task.style.display = 'block';
			} else {
				task.style.display = 'none';
			}
		});
	}
}