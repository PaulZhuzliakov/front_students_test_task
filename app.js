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

const app = new StudentsJournal()
app.init()