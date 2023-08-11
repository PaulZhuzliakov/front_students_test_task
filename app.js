// function validateForm(){
//     var last_name = document.getElementById("last_name").value
//     if (last_name == ""){
//         alert("Необходимо ввести фамилию");
//         return false;
//     }
//     return true;
// }

function FullStackBookToDo() {
    const td = {}
    td.API_URL = "http://localhost:8080/students";

    this.init = async function () {
        document.addEventListener("DOMContentLoaded", async function () {
            await td.fetchStudents()
        });
    }

    td.fetchStudents = async function () {
        const todos = await fetch("http://localhost:8080/students").then((res) => res.json());
        td.todos = todos
        showData(todos)
    }

    function showData(studentList){
        var html= ""
        studentList.forEach(function (value){
            html+="<tr>"
            html+="<td>" + value.last_name + "</td>";
            html+="<td>" + value.first_name + "</td>";
            html+="<td>" + value.middle_name + "</td>";
            html+="<td>" + value.birth_date + "</td>";
            html+="<td>" + value.group + "</td>";
            html+="</tr>"
        });
        document.querySelector("#crudTable tbody").innerHTML = html
    }

}

const app = new FullStackBookToDo()
app.init()