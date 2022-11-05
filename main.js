// Textarea
const textarea = document.querySelector('textarea')
textarea.addEventListener('keyup', function (event) {
    textarea.style.height = "50px";
    textarea.style.height = `${event.target.scrollHeight - 30}px`;
})



// todo-list
const add_remove = document.getElementById("add");

// Adding Removing todo list
add_remove.addEventListener("click", function (event) {
    var t_tasks = document.getElementById("todo-tasks")
    var c_tasks = document.getElementById("completed-tasks")
    var p_tasks = document.getElementById("pending-tasks")
    t_tasks.classList.remove("show")
    c_tasks.classList.remove("show")
    p_tasks.classList.remove("show")
    t_tasks.classList.add("show")
    let ele1 = document.getElementById("title");
    let ele2 = document.getElementById("discription");
    if (ele1.value === '' && ele2.value === '') {
        alert("Title and Description section is empty");
    }
    else if (ele1.value === '') {
        alert("Title section is empty");
        return;
    }
    else if (ele2.value === '') {
        alert("Description section is empty");
        document.getElementById("discription").select();
        return;
    }
    else {
        add_todo();
        addpendings();
        todo_List();
        completed_tasks();
        pending_tasks();
    }
});
var ids = []
function add_todo(event) {
    let ele1 = document.getElementById("title");
    let ele2 = document.getElementById("discription");
    let title_val = ele1.value;
    let discription_val = ele2.value;
    discription_val = discription_val.replaceAll("\n", "<br>")
    ele1.value = '';
    ele2.value = '';
    let item = document.createElement("div"); // creating div item
    item.setAttribute("class", "item");
    let timeId = '' + new Date().getTime()  // item.classList.add("anime")
    ids.push(timeId)
    item.setAttribute("id", timeId)
    let untog = document.createElement("div");    // create elements
    untog.setAttribute("class", "un-tog")
    let sno = document.createElement("h3");
    sno.setAttribute("class", "sno")
    let title = document.createElement("h3");
    title.setAttribute("class", "title-text")
    let discription = document.createElement("p");
    discription.setAttribute("class", "discription-text")
    let status = document.createElement("button");
    status.setAttribute("class", "status");
    status.setAttribute("id", timeId);
    let toggle = document.createElement("div");
    toggle.setAttribute("class", "toggle");
    let edit = document.createElement("button");
    edit.setAttribute("class", "edit");
    edit.setAttribute("id", timeId);
    let remove = document.createElement("button");
    remove.setAttribute("class", "remove");
    remove.setAttribute("id", timeId);
    sno.innerHTML = ids.length;
    title.innerHTML = title_val;
    discription.innerHTML = discription_val;
    status.innerHTML = "Pending";
    edit.innerHTML = '<i class="fa-solid fa-pen-to-square fa-2x"></i>';
    remove.innerHTML = '<i class="fa-solid fa-delete-left fa-2x"></i>';
    textarea.style.height = "50px";
    // adding elements to div item
    untog.appendChild(sno);
    untog.appendChild(title);
    untog.appendChild(discription);
    item.appendChild(untog);
    toggle.appendChild(status);
    toggle.appendChild(edit);
    toggle.appendChild(remove);
    item.appendChild(toggle);
    let todoList = document.getElementById("todo-tasks");
    todoList.appendChild(item);
    todoList.scrollTop = todoList.scrollHeight;
    var x = window.matchMedia("(max-width: 1024px)")
    if (x.matches) {
        window.scrollTo({ left: 0, top: (document.body.scrollHeight + 20), behavior: "smooth" });
    }
    // removing div item
    remove.addEventListener("click", function () {
        var items = document.getElementsByClassName("item");
        var elements = Array.from(items)
        ind = 0;
        elements.forEach(element => {
            if (element.id === remove.id) {
                element.remove();
            } else {
                ind++;
            }
            element.getElementsByClassName("sno")[0].innerHTML = ind;
        });
        var keif = ids.indexOf(remove.id);
        ids.splice(keif, 1);
        addpendings();
        addcompleted();
    });
    // adding event listener to status
    status.addEventListener("click", function () {
        if (status.innerHTML === "Pending") {
            status.innerHTML = "Completed"
            status.style.backgroundColor = "rgb(16, 163, 58)";
            status.style.color = "#fff";
            edit.innerHTML = '<i class="fa-regular fa-square-check fa-2x"></i>';
            addpendings();
            addcompleted();
        }
        else {
            status.innerHTML = "Pending"
            status.style.backgroundColor = "#ACFFAD";
            status.style.color = "black";
            edit.innerHTML = '<i class="fa-solid fa-pen-to-square fa-2x"></i>';
            addpendings();
            addcompleted();
        }
    })
    // adding event listener to status
    edit.addEventListener("click", function () {
        if (status.innerHTML === "Pending") {
            let el1 = document.getElementById("title");
            let el2 = document.getElementById("discription");
            el1.value = title.innerHTML
            var discription_edit = discription.innerHTML.replaceAll( "<br>","\n")
            el2.value = discription_edit
            var add = document.getElementById("add");
            add.classList.add("hide")
            var modify = document.getElementById("modify");
            modify.classList.remove("hide");
            if (x.matches) {
                window.scrollTo(0, 0);
            }
            modify.onclick = function () {
                title.innerHTML = el1.value
                el1.value = ""
                var discription_modify = el2.value.replaceAll( "\n","<br>")
                discription.innerHTML = discription_modify
                el2.value = ""
                modify.classList.add("hide")
                add.classList.remove("hide");
                addpendings();
                addcompleted();
                item.scrollIntoView()
            }
        }
        else {
            alert("Completed Tasks canot be modified")
        }
    })
}

function todo_List() {
    var tasks = document.querySelectorAll(".todo-List")
    tasks.forEach(task => {
        task.addEventListener("click", function () {
            var t_tasks = document.getElementById("todo-tasks")
            var c_tasks = document.getElementById("completed-tasks")
            var p_tasks = document.getElementById("pending-tasks")
            t_tasks.classList.remove("show")
            c_tasks.classList.remove("show")
            p_tasks.classList.remove("show")
            t_tasks.classList.add("show")
        })
    })
}

function completed_tasks() {
    var tasks = document.querySelectorAll(".completed")
    tasks.forEach(task => {
        task.addEventListener("click", function () {
            var t_tasks = document.getElementById("todo-tasks")
            var c_tasks = document.getElementById("completed-tasks")
            var p_tasks = document.getElementById("pending-tasks")
            t_tasks.classList.remove("show")
            c_tasks.classList.remove("show")
            p_tasks.classList.remove("show")
            c_tasks.classList.add("show")
        })
    })

}

function pending_tasks() {
    var tasks = document.querySelectorAll(".pending")
    tasks.forEach(task => {
        task.addEventListener("click", function () {
            var t_tasks = document.getElementById("todo-tasks")
            var c_tasks = document.getElementById("completed-tasks")
            var p_tasks = document.getElementById("pending-tasks")
            t_tasks.classList.remove("show")
            c_tasks.classList.remove("show")
            p_tasks.classList.remove("show")
            p_tasks.classList.add("show")
        })
    })
}
function addpendings() {
    var items = document.getElementsByClassName("item");
    var elements = Array.from(items);
    let pendinglist = document.getElementById("pending-tasks");
    while (pendinglist.hasChildNodes()) {
        pendinglist.removeChild(pendinglist.firstChild);
    }
    ind = 0
    ind_p = 0
    elements.forEach(ele => {
        var status = ele.querySelector(".status")
        if (status.innerHTML === "Pending") {
            var clone = ele.cloneNode(true);
            clone.className = 'item_pending';
            ind++
            var sno = clone.querySelector('.sno');
            sno.innerHTML = ind;
            var remove = clone.querySelector(".remove")
            remove.addEventListener("click", function () {
                if (remove.id === ele.id) {
                    ele.querySelector(".remove").click();
                    clone.remove();
                }
            })
            var edit = clone.querySelector(".edit")
            edit.addEventListener("click", function () {
                if (edit.id === ele.id) {
                    ele.querySelector(".edit").click();
                }
            })
            var status_c = clone.querySelector(".status")
            status_c.addEventListener("click", function () {
                if (status_c.id === ele.id) {
                    ele.querySelector(".status").click();
                }
            })
            pendinglist.appendChild(clone);
            pendinglist.scrollTop = pendinglist.scrollHeight;
        }
    });
}

function addcompleted() {
    var items = document.getElementsByClassName("item");
    var elements = Array.from(items);
    let completedlist = document.getElementById("completed-tasks");
    while (completedlist.hasChildNodes()) {
        completedlist.removeChild(completedlist.firstChild);
    }
    ind = 0
    elements.forEach(ele => {
        var status = ele.querySelector(".status")
        if (status.innerHTML === "Completed") {
            var clone = ele.cloneNode(true);
            clone.className = 'item_completed';
            ind++
            var sno = clone.querySelector('.sno');
            sno.innerHTML = ind;
            var remove = clone.querySelector(".remove")
            remove.addEventListener("click", function () {
                if (remove.id === ele.id) {
                    ele.querySelector(".remove").click();
                    clone.remove();
                }
            })
            var edit = clone.querySelector(".edit")
            edit.addEventListener("click", function () {
                if (edit.id === ele.id) {
                    ele.querySelector(".edit").click();
                }
            })
            var status_c = clone.querySelector(".status")
            status_c.addEventListener("click", function () {
                if (status_c.id === ele.id) {
                    ele.querySelector(".status").click();
                }
            })
            completedlist.appendChild(clone);
            completedlist.scrollTop = completedlist.scrollHeight;
        }
    });
}

// trigering enter
let input1 = document.getElementById("title");
input1.addEventListener("keypress", function (event) {
    if (event.key === 'Enter') {
        document.getElementById("discription").select();
    }
});

let input2 = document.getElementById("discription");
input2.addEventListener("keypress", function (event) {
    if (event.key === 'Enter') {
        if (event.shiftKey) {
            event.preventDefault();
            input2.value += '\n';
        }
        else {
            let ram=document.getElementById("add").classList
            console.log(ram)
            if(document.getElementById("add").classList.contains("hide")){
                document.getElementById("modify").click();
            }
            else{
                document.getElementById("add").click();
            }
            document.getElementById("title").select();
        }
    }

});