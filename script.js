// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-database.js";

// Configuración (la tuya)
const firebaseConfig = {
  apiKey: "AIzaSyBLD98c3245Mg5Odv6q2uvAcJXNaE8Ion4",
  authDomain: "kanban-7d366.firebaseapp.com",
  databaseURL: "https://kanban-7d366-default-rtdb.firebaseio.com",
  projectId: "kanban-7d366",
  storageBucket: "kanban-7d366.firebasestorage.app",
  messagingSenderId: "124295361155",
  appId: "1:124295361155:web:a0e6dd1c7db90e9f59a1b6"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Referencias
const columns = ["todo", "doing", "done"];

// Escuchar cambios en la base de datos
columns.forEach(col => {
  const tasksRef = ref(db, col);

  onValue(tasksRef, snapshot => {
    const container = document.querySelector(`#${col} .tasks`);
    container.innerHTML = "";

    snapshot.forEach(child => {
      const data = child.val();
      const key = child.key;

      const taskDiv = document.createElement("div");
      taskDiv.className = "task";

      taskDiv.innerHTML = `
        <span>${data.text}</span>
        <button onclick="deleteTask('${col}', '${key}')">X</button>
      `;

      container.appendChild(taskDiv);
    });
  });
});

// Agregar tarea
window.addTask = function(column) {
  const input = document.querySelector(`#${column} input`);
  const text = input.value.trim();

  if (text === "") return;

  const tasksRef = ref(db, column);
  push(tasksRef, { text });

  input.value = "";
};

// Eliminar tarea
window.deleteTask = function(column, key) {
  const taskRef = ref(db, `${column}/${key}`);
  remove(taskRef);
};