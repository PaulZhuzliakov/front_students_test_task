const URL = "https://backstudentstesttask-production.up.railway.app/students";

//переключат кнопку "Сохранить студента" на "Изменить студента"
function switchAddToEditBtn(studentEntity) {
    document.getElementById("Update").style.display = "block";
    document.getElementById("Submit").style.display = "none";
    fillInputsFromStudentEntity(studentEntity);
}

//переключат кнопку "Изменить студента" на "Сохранить студента"
function switchEditToAddBtn(studentEntity) {
    document.getElementById("Update").style.display = "none";
    document.getElementById("Submit").style.display = "block";
    fillInputsFromStudentEntity(studentEntity);
}

//заполняет поля ввода данными из модели Студента
function fillInputsFromStudentEntity(studentEntity) {
    document.getElementById("id").value = studentEntity.id;
    document.getElementById("last_name").value = studentEntity.last_name;
    document.getElementById("first_name").value = studentEntity.first_name;
    document.getElementById("middle_name").value = studentEntity.middle_name;
    document.getElementById("birth_date").value = studentEntity.birth_date;
    document.getElementById("group").value = studentEntity.group;
}

function clearTable() {
    let table = document.querySelector("#crudTable");
    while (table.rows.length > 1) table.rows[1].remove();
}

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
    let id = document.getElementById("id").value;
    let last_name = document.getElementById("last_name").value;
    let first_name = document.getElementById("first_name").value;
    let middle_name = document.getElementById("middle_name").value;
    let birth_date = document.getElementById("birth_date").value;
    let group = document.getElementById("group").value;

    return {
        id: id,
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

// POST
function saveStudent() {
    if (validateForm() === true) {
        let student = formStudentEntityFromInputs();

        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, body: JSON.stringify(student)
        })
            .then(response => {
                    if (response.status === 200) {
                        clearInputs();
                        clearTable();
                        fetchStudents().then(() => {
                        })
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
            })
            .catch(err => {
                console.log('Fetch Error :-S', err);
            });
    }
}

// DELETE
function deleteData(index) {
    fetch(URL + "/" + index, {
        method: 'DELETE'
    })
        .then(response => {
                if (response.status === 200) {
                    clearInputs();
                    clearTable();
                    fetchStudents().then(() => {
                    })
                }
                if (response.status !== 200) {
                    console.log('Ошибка. Status Code: ' +
                        response.status);
                }
                console.log(response.headers.get("Content-Type"));
                return response;
            }
        )
        .then(myJson => {
            console.log(JSON.stringify(myJson));
        })
        .catch(err => {
            console.log(err);
        });
}

// PUT
function updateStudent() {
    if (validateForm() === true) {
        let student = formStudentEntityFromInputs();

        fetch(URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, body: JSON.stringify(student)
        })
            .then(response => {
                    if (response.status === 200) {
                        clearInputs();
                        clearTable();
                        fetchStudents();
                        switchEditToAddBtn()
                            .then(() => {
                        })
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
            })
            .catch(err => {
                console.log('Fetch Error :-S', err);
            });
    }
}

//заполнение таблицы списком студентов, полученных с сервиса
function showData(studentList) {
    let html = "";
    let sl = studentList;
    studentList.forEach(function (element, index) {
        let currentStudent = JSON.stringify(sl[index]);

        html += "<tr>";
        html += "<td>" + element.last_name + "</td>";
        html += "<td>" + element.first_name + "</td>";
        html += "<td>" + element.middle_name + "</td>";
        html += "<td>" + element.birth_date + "</td>";
        html += "<td>" + element.group + "</td>";
        html += '<td><button onclick="deleteData(' + element.id + ')" class="btn-danger">Удалить</button>';
        html += '<button class="btn-warning" onclick=\'switchAddToEditBtn(' + currentStudent + ') \'>' + 'Изменить' + '</button></td>';
        html += "</tr>";
    });
    document.querySelector("#crudTable tbody").innerHTML += html;
}

const app = new StudentsJournal();
app.init();

function StudentsJournal() {

    //при открытии страницы, после того ка построенно DOM-дерево, загружается списак студентов и на основании его формируется таблица
    this.init = async function () {
        document.addEventListener("DOMContentLoaded", async function () {
            await fetchStudents();
        });
    }

    // GET запрос для получения всех записей
    // дергается при всех остальных запросах на изменение в базе студентов(POST, PUT, DELETE)
    // изменяется список студентов, очищается таблица, заново грузятся все студенты и формируется таблица
    // не лучшее решение, но самое простое
    fetchStudents = async function () {
        const students = await fetch(URL).then((res) => res.json());
        showData(students);
    }
}