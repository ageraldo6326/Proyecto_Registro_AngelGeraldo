// captura de los elementos del formulario
const btnBorrar = document.getElementById('borrar');
const btnEnviar = document.getElementById('enviar');
const btnRegEnviado = document.getElementById('reg_enviados')
const txtNombre = document.getElementById('nombreCompleto');
const txtCorreo = document.getElementById('correo');
const txtTelefono = document.getElementById('telefono');
const txtFechaNacimiento = document.getElementById('fechaNacimiento');
const seleccionCurso = document.getElementById('seleccionCurso');
const txtComentario = document.getElementById('comentario');
const error_nombre = document.getElementById("error_nombre");
const error_correo = document.getElementById("error_correo");
const error_telefono = document.getElementById("error_telefono");
const error_fecha_nacimiento = document.getElementById("error_fecha_nacimiento");
const error_seleccionCurso = document.getElementById("error_seleccionCurso");
const tbodyLocalStorage = document.getElementById('localStorage')

// Funcion para borrar el valor de los campos, mensajes de error
// y el listado de registros enviados
function borrar() {

  txtNombre.value = "";
  txtCorreo.value = "";
  txtTelefono.value = "";
  txtFechaNacimiento.value = "";
  seleccionCurso.value = "";
  txtComentario.value = "";
  error_nombre.innerText = "";
  error_correo.innerText = "";
  error_telefono.innerText = "";
  error_fecha_nacimiento.innerText = "";
  error_seleccionCurso.innerText = "";
  tbodyLocalStorage.innerHTML = "";
}

// captura del evento click del boton btnBorrar que 
// ejecuta previene que la pagina se recargue y la funcion borrar
btnBorrar.addEventListener('click', (e) => {
  e.preventDefault()
  borrar();
})

// captura del evento click del boton btnEnviar que 
// ejecuta previene que la pagina se recargue,  
// valida todos los campos segun lo requerido
// ademas almacena los valores del formulario en localStorage
btnEnviar.addEventListener('click', (e) => {
  e.preventDefault()

  let validacion = true;
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexTelefono = /^[0-9]+$/;
  const regexFecha = /^\d{4}-\d{2}-\d{2}$/;

  if (txtNombre.value === "") {
    error_nombre.innerText = "❌ El nombre es obligatorio!"
    validacion = false;
  } else {
    error_nombre.innerText = ""
  }

  if (txtCorreo.value === "") {
    error_correo.innerText = "❌ El correo es obligatorio!"
    validacion = false;
  } else {
    error_correo.innerText = ""
  }

  if (!regexCorreo.test(txtCorreo.value)) {
    error_correo.innerText = "❌ El correo no tiene un formato correcto!"
    validacion = false;
  } else {
    error_correo.innerText = ""
  }

  if (txtTelefono.value === "") {
    error_telefono.innerText = "❌ El telefono es obligatorio!"
    validacion = false;
  } else {
    error_telefono.innerText = ""
  }

  if (!regexTelefono.test(txtTelefono.value)) {
    error_telefono.innerText = "❌ El telefono debe ser numerico!"
    validacion = false;
  } else {
    error_telefono.innerText = ""
  }

  if (txtFechaNacimiento.value === "") {
    error_fecha_nacimiento.innerText = "❌ La fecha de nacimiento es obligatoria!"
    validacion = false;
  } else {
    error_fecha_nacimiento.innerText = ""
  }

  if (!regexFecha.test(txtFechaNacimiento.value)) {
    error_fecha_nacimiento.innerText = "❌  La fecha de nacimiento no tiene un formato correcto!"
    validacion = false;
  } else {
    error_fecha_nacimiento.innerText = ""
  }

  if (seleccionCurso.value === "") {
    error_seleccionCurso.innerText = "❌ Selecionar un curso es obligatorio!"
    validacion = false;
  } else {
    error_seleccionCurso.innerText = ""
  }




  if (validacion) {
    // Se declara una variable tipo arreglo para almacenar los envios
    let registros = [];
    // se define como un objeto el nuevo envio
    const nuevoRegistro = {
      nombre: txtNombre.value,
      correo: txtCorreo.value,
      telefono: txtTelefono.value,
      fechaNacimiento: txtFechaNacimiento.value,
      seleccionCurso: seleccionCurso.value,
      comentario: txtComentario.value
    }
    // se leen los valores que esten en localStorage
    registros = localStorage.getItem('registros');

    // Se verifica si hay algun valor si lo hay se asigna al arreglo
    // de lo contrario el arreglo se queda vacio
    if (registros) {
      registros = JSON.parse(registros)
    } else {
      registros = []
    }

    console.log('registros guardados antes de ', registros)

    // se agrega el nuevo valor al arrelgo registros
    registros.push(nuevoRegistro)

    console.log('registros guardados despues de', registros)

    // se guarda o reemplaza el valor de registros en el localStorage
    // con el valor del arreglo registros
    localStorage.setItem("registros", JSON.stringify(registros))

    borrar();
    alert("Registro Enviado");
  }
})


btnRegEnviado.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(localStorage.getItem('registros'));
  const registros = JSON.parse(localStorage.getItem('registros'));
  tbodyLocalStorage.innerHTML = ""

  registros.map(r => {
    tbodyLocalStorage.innerHTML += `<tr><td>${r.nombre}</td><td>${r.correo}</td><td>${r.telefono}</td><td>${r.fechaNacimiento}</td><td>${r.seleccionCurso}</td><td>${r.comentario}</td></td>`;
  });

})