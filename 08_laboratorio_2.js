/**     LABORATORIO II
 *
 * Crea una nueva clase, ExtendedUser, que heredará de la clase User
 *
 * Coloque un setter y un getter nombrados fullName en la clase.  El getter debe devolver el
 * nombre y el apellido concatenados en un cadena. El setter toma el nombre y el apellido concatenados
 * (por ejemplo, 'Rafael Fifer') y los divide en nombre y apellido (el método split),
 * cambiando las propiedades apropiadas del objeto.
 *
 * Basándose en la clase ExtenderUser, cree dos clases más Teacher y Student (herencia). No
 * deberían tener nuevos métodos ni propiedades, sino solo los roles predeterminados en
 * sus constructores para 'teacher' o 'student' respectivamente (es decir, sus constructores
 * tomarán tres parámetros en lugar de cuatro: name, surname y email);
 *
 * Pruebe su solución utilizando el siguiente código:
 */

// Class User original
class User {
  constructor({ name, surname, email, role }) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.role = role;
    this.courses = {}; // Almacena cursos y niveles en un objeto
    this.messages = []; // Historial de mensajes
  }

  addCourse(course, level) {
    this.courses[course] = level;
    console.log(
      `${this.name} ha agregado el curso: ${course} con nivel: ${level}`
    );
  }

  removeCourse(course) {
    if (this.courses[course]) {
      delete this.courses[course];
      console.log(`${this.name} ha eliminado el curso: ${course}`);
    } else {
      console.log(`El curso ${course} no existe en la lista.`);
    }
  }

  editCourse(course, level) {
    if (this.courses[course]) {
      this.courses[course] = level;
      console.log(
        `${this.name} ha actualizado el curso: ${course} al nivel: ${level}`
      );
    } else {
      console.log(`El curso ${course} no existe en la lista.`);
    }
  }

  sendMessage(from, message) {
    const fullMessage = `De: ${from.name} (${from.role})\nPara: ${this.name} (${this.role})\nMensaje: ${message}\n`;
    this.messages.push(fullMessage);
    this.sendEmail(from, this, message);
  }

  sendEmail(from, to, message) {
    console.log(`Simulando envío de email de ${from.name} a ${to.name}...`);
  }

  showMessagesHistory() {
    if (this.messages.length === 0) {
      console.log(`${this.name} no ha recibido mensajes.`);
    } else {
      console.log(`Historial de mensajes para ${this.name}:`);
      this.messages.forEach((message, index) => {
        console.log(`Mensaje ${index + 1}:\n${message}`);
      });
    }
  }
}

// Clase ExtendedUser que extiende User
class ExtendedUser extends User {
  get fullName() {
    return `${this.name} ${this.surname}`;
  }

  set fullName(fullName) {
    [this.name, this.surname] = fullName.split(" ");
  }
}

// Clase Teacher que extiende ExtendedUser
class Teacher extends ExtendedUser {
  constructor({ name, surname, email }) {
    super({ name, surname, email, role: "teacher" });
  }
}

// Clase Student que extiende ExtendedUser
class Student extends ExtendedUser {
  constructor({ name, surname, email }) {
    super({ name, surname, email, role: "student" });
  }
}

let student1 = new Student({
  name: "Rafael",
  surname: "Fife",
  email: "rfife@rhyta.com",
});
let student2 = new Student({
  name: "Kelly",
  surname: "Estes",
  email: "k_estes@dayrep.com",
});
let teacher1 = new Teacher({
  name: "Paula",
  surname: "Thompkins",
  email: "PaulaThompkins@jourrapide.com",
});

student1.addCourse("maths", 2);
teacher1.addCourse("biology", 3);
teacher1.editCourse("chemistry", 4);
console.log(
  `${student1.fullName}: ${Object.keys(student1.courses).length} courses`
); // -> Rafael Fife: 1 courses
console.log(
  `${teacher1.fullName}: ${Object.keys(teacher1.courses).length} courses`
); // -> Paula Thompkins: 2 courses
student1.fullName = "Rafael Fifer";
console.log(`${student1.fullName}: ${student1.courses.length} courses`); // -> Rafael Fifer: 1 courses
