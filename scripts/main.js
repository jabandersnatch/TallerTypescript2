import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var totalCreditElm = document.getElementById("total-credits");
var studentTbody = document.getElementById('student');
var btnMaxMin = document.getElementById("button-max_min");
var inputMax = document.getElementById("max");
var inputMin = document.getElementById("min");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnMaxMin.onclick = function () { return applyFilterMaxMin(); };
renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudent);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function applyFilterMaxMin() {
    var maxi = inputMax.value;
    var mini = inputMin.value;
    maxi = (maxi == null) ? '10' : maxi;
    mini = (mini == null) ? '-1' : mini;
    clearCoursesInTable();
    var coursesFiltered = searchCreditByMaxMin(mini, maxi, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCreditByMaxMin(valMin, valMax, courses) {
    return (valMin === '-1' && valMax === '10') ? dataCourses : courses.filter(function (c) {
        return (c.credits >= parseInt(valMin) && c.credits <= parseInt(valMax));
    });
}
function renderStudentInTable(students) {
    console.log('Desplegando estudiante');
    students.forEach(function (student) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>C\u00F3digo</td>\n                           <td>" + student.codigo + "</td>";
        studentTbody.appendChild(trElement);
        trElement = document.createElement("tr");
        trElement.innerHTML = "<td>C\u00E9dula</td>\n                           <td>" + student.cedula + "</td>";
        studentTbody.appendChild(trElement);
        trElement = document.createElement("tr");
        trElement.innerHTML = "<td>Edad</td>\n                           <td>" + student.edad + " a\u00F1os</td>";
        studentTbody.appendChild(trElement);
        trElement = document.createElement("tr");
        trElement.innerHTML = "<td>Direcci\u00F3n</td>\n                           <td>" + student.direccion + "</td>";
        studentTbody.appendChild(trElement);
        trElement = document.createElement("tr");
        trElement.innerHTML = "<td>Tel\u00E9fono</td>\n                           <td>" + student.telefono + "</td>";
        studentTbody.appendChild(trElement);
    });
}
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
