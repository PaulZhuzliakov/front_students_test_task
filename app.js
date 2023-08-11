function validateForm(){
    const last_name = document.getElementById("last_name").value;
    const first_name = document.getElementById("first_name").value;
    const group = document.getElementById("group").value;

    if (last_name === ""){
        alert("Необходимо ввести фамилию");
        return false;
    }
    if (first_name === ""){
        alert("Необходимо ввести фамилию");
        return false;
    }
    if (group === ""){
        alert("Необходимо ввести группу");
        return false;
    }
    return true;
}

fetchStudents = async function () {
    const todos = await fetch("http://localhost:8080/students").then((res) => res.json());
    td.todos = todos
    showData(todos)
}

function StudentsJournal() {
    const td = {}
    td.API_URL = "http://localhost:8080/students";

    this.init = async function () {
        document.addEventListener("DOMContentLoaded", async function () {
            await td.fetchStudents()
        });
    }

    td.fetchStudents = async function () {
        const students = await fetch("http://localhost:8080/students").then((res) => res.json());
        showData(students)
    }

    function showData(studentList){
        var html= ""
        studentList.forEach(function (element, index){
            html+="<tr>"
            html+="<td>" + element.last_name + "</td>";
            html+="<td>" + element.first_name + "</td>";
            html+="<td>" + element.middle_name + "</td>";
            html+="<td>" + element.birth_date + "</td>";
            html+="<td>" + element.group + "</td>";
            html+='<td><button onclick="deleteData(' + index + ')" class="btn-danger">Удалить</button>'
            html+='<button onclick="updateData(' + index + ')" class="btn-warning">Изменить</button></td>'
            html+="</tr>"
        });
        document.querySelector("#crudTable tbody").innerHTML += html
    }

}

const app = new StudentsJournal()
app.init()