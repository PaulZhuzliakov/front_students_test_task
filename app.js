const URL = "http://localhost:8080/students";

function validateForm() {
    const last_name = document.getElementById("last_name").value;
    const first_name = document.getElementById("first_name").value;
    const group = document.getElementById("group").value;
    if (last_name === "") {
        alert("Необходимо ввести фамилию");
        return false;
    }
    if (first_name === "") {
        alert("Необходимо ввести имя");
        return false;
    }
    if (group === "") {
        alert("Необходимо ввести группу");
        return false;
    }
    return true;
}

function formStudentEntityFromInputs() {
    let last_name = document.getElementById("last_name").value;
    let first_name = document.getElementById("first_name").value;
    let middle_name = document.getElementById("middle_name").value;
    let birth_date = document.getElementById("birth_date").value;
    let group = document.getElementById("group").value;

    return {
        last_name: last_name,
        first_name: first_name,
        middle_name: middle_name,
        birth_date: birth_date,
        group: group
    }
}

function clearInputs() {
    document.getElementById("last_name").value = null;
    document.getElementById("first_name").value = null;
    document.getElementById("middle_name").value = null;
    document.getElementById("birth_date").value = null;
    document.getElementById("group").value = null;
}

function AddData() {
    if (validateForm() === true) {
        let student = formStudentEntityFromInputs();

        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, body: JSON.stringify(student)
        })
            .then(response => {
                    alert(response.status)
                    if (response.status === 200) {
                        clearInputs();
                    }
                    if (response.status !== 200) {
                        console.log('Ошибка. Status Code: ' +
                            response.status);
                    }
                    console.log(response.headers.get("Content-Type"));
                    return response.json();
                }
            )
            .then(myJson => {
                console.log(JSON.stringify(myJson));
                alert(myJson);
            })
            .catch(err => {
                console.log('Fetch Error :-S', err);
            });
    }
}

function StudentsJournal() {
    const td = {};

    this.init = async function () {
        document.addEventListener("DOMContentLoaded", async function () {
            await td.fetchStudents();
        });
    }

    td.fetchStudents = async function () {
        const students = await fetch(URL).then((res) => res.json());
        td.students = students;
        showData(students);
    }

    function showData(studentList) {
        let html = "";
        studentList.forEach(function (element, index) {
            html += "<tr>";
            html += "<td>" + element.last_name + "</td>";
            html += "<td>" + element.first_name + "</td>";
            html += "<td>" + element.middle_name + "</td>";
            html += "<td>" + element.birth_date + "</td>";
            html += "<td>" + element.group + "</td>";
            html += '<td><button onclick="deleteData(' + index + ')" class="btn-danger">Удалить</button>';
            html += '<button onclick="updateData(' + index + ')" class="btn-warning">Изменить</button></td>';
            html += "</tr>";
        });
        document.querySelector("#crudTable tbody").innerHTML += html;
        var table = document.getElementById("crudTable");
        var rowCount = table.rows.length;
        var row = table.rows[rowCount - 1];
        table.deleteRow(row);
    }
}

const app = new StudentsJournal();
app.init();