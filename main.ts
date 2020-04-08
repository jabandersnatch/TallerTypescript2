import { Course } from './course.js';
import {Student} from './student.js';

import { dataCourses } from './dataCourses.js';
import {dataStudent} from './dataStudent.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;

let studentTbody: HTMLElement = document.getElementById('student')!;
const btnMaxMin: HTMLElement = document.getElementById("button-max_min")!;
const inputMax: HTMLInputElement = <HTMLInputElement> document.getElementById("max")!;
const inputMin: HTMLInputElement = <HTMLInputElement> document.getElementById("min")!;

btnfilterByName.onclick = () => applyFilterByName();

btnMaxMin.onclick = () => applyFilterMaxMin();
renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudent);
totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`

function applyFilterMaxMin() { 
  let maxi = inputMax.value;
  let mini = inputMin.value;
  maxi = (maxi == null) ? '10' : maxi;
  mini = (mini == null) ? '-1' : mini;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCreditByMaxMin(mini, maxi, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCreditByMaxMin(valMin: string, valMax: string, courses: Course[]) {
  return (valMin === '-1' && valMax === '10') ? dataCourses : courses.filter( c => 
    (c.credits >= parseInt(valMin) && c.credits <= parseInt(valMax)));
}

function renderStudentInTable(students: Student[]): void {
  console.log('Desplegando estudiante');
  students.forEach((student) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>Código</td>
                           <td>${student.codigo}</td>`;
    studentTbody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = `<td>Cédula</td>
                           <td>${student.cedula}</td>`;
    studentTbody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = `<td>Edad</td>
                           <td>${student.edad} años</td>`;
    studentTbody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = `<td>Dirección</td>
                           <td>${student.direccion}</td>`;
    studentTbody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = `<td>Teléfono</td>
                           <td>${student.telefono}</td>`;
    studentTbody.appendChild(trElement);
  });
}

function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
 

 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}