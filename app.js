// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

// Array para almacenar los nombres de los amigos
let amigos = [];

// Función para agregar un amigo
function agregarAmigo() {
    const inputNombre = document.getElementById('nombreAmigo');
    const nombre = inputNombre.value.trim();

    // Validar que el campo no esté vacío
    if (nombre === '') {
        alert('Por favor, inserte un nombre.');
        inputNombre.focus(); // Dejar el cursor en el campo
        return;
    }

    // Validar que el nombre no esté repetido, independiente de como se escriba
    if (amigos.includes(nombre.toUpperCase())) {
        alert('Este nombre ya está en la lista. Por favor, ingrese un nombre diferente.');
        inputNombre.value = ''; // Limpiar el campo
        inputNombre.focus(); // Dejar el cursor en el campo
        return;
    }

    // Añadir el nombre al array
    amigos.push(nombre.toUpperCase());
    inputNombre.value = '';
    inputNombre.focus(); // Dejar el cursor en el campo
    actualizarListaAmigos();
}

// Función para actualizar la lista de amigos en el DOM
function actualizarListaAmigos() {
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = '';

    amigos.forEach((amigo) => {
        const li = document.createElement('li');
        li.textContent = amigo;
        li.setAttribute('role', 'listitem');
        listaAmigos.appendChild(li);
    });
}

// Función para sortear amigos secretos
function sortearAmigo() {
    if (amigos.length === 0) {
        alert('No hay amigos para sortear.');
        return;
    }

    if (amigos.length < 2) {
        alert('Necesitas al menos 2 amigos para realizar el sorteo.');
        return;
    }

    // Crear una copia del array para no modificar el original
    let amigosDisponibles = [...amigos];
    let resultadoSorteo = [];

    // Si el número de amigos es impar, se permite que un nombre se repita
    let esImpar = amigosDisponibles.length % 2 !== 0;

    // Asignar parejas
    while (amigosDisponibles.length > 1) {
        // Seleccionar el primer amigo de la lista
        let amigoActual = amigosDisponibles[0];

        // Filtrar los amigos disponibles excluyendo al amigo actual
        let opcionesDisponibles = amigosDisponibles.slice(1);

        // Seleccionar un amigo secreto aleatorio de las opciones disponibles
        const indiceAleatorio = Math.floor(Math.random() * opcionesDisponibles.length);
        let amigoSecreto = opcionesDisponibles[indiceAleatorio];

        // Añadir el resultado al array de resultados
        resultadoSorteo.push(`${amigoActual} ➡️ ${amigoSecreto}`);

        // Eliminar ambos amigos de la lista de disponibles
        amigosDisponibles = amigosDisponibles.filter(
            (amigo) => amigo !== amigoActual && amigo !== amigoSecreto
        );
    }

    // Si el número de amigos es impar, asignar el último amigo a una pareja existente
    if (esImpar && amigosDisponibles.length === 1) {
        let amigoRestante = amigosDisponibles[0];
        // Seleccionar una pareja existente al azar
        const indicePareja = Math.floor(Math.random() * resultadoSorteo.length);
        let parejaSeleccionada = resultadoSorteo[indicePareja];

        // Dividir la pareja seleccionada en dos nombres
        let [nombre1, nombre2] = parejaSeleccionada.split(' ➡️ ');

        // Asignar el amigo restante a uno de los nombres de la pareja
        resultadoSorteo[indicePareja] = `${nombre1} ➡️ ${amigoRestante}`;
        resultadoSorteo.push(`${amigoRestante} ➡️ ${nombre2}`);
    }

    // Mostrar el resultado en el modal
    mostrarResultado(resultadoSorteo);
}

/* Función para mezclar un array (algoritmo de Fisher-Yates)
function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Intercambiar elementos
    }
    return array;
}*/

// Función para mostrar el resultado en un modal
function mostrarResultado(resultadoSorteo) {
    const modal = document.getElementById('modal');
    const resultadoModal = document.getElementById('resultadoModal');
    const cerrarModal = document.getElementById('cerrarModal');

    // Mostrar los resultados en el modal
    resultadoModal.innerHTML = resultadoSorteo.map((item) => `<li>${item}</li>`).join('');
    

    // Mostrar el modal
    modal.style.display = 'block';

    // Cerrar el modal al hacer clic en la "X"
    cerrarModal.onclick = () => {
        modal.style.display = 'none';
    };

    // Cerrar el modal al hacer clic fuera de él
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

// Función para reiniciar el sorteo
function reiniciarSorteo() {
    amigos = [];
    actualizarListaAmigos();
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('resultadoModal').innerHTML = '';
    alert('El sorteo ha sido reiniciado.');
}