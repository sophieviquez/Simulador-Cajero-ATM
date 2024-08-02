let cuentas = [
  { nombre: "Themis", clave: "1234", saldo: 500 },
  { nombre: "Sophia", clave: "4567", saldo: 800 },
  { nombre: "Helena", clave: "7890", saldo: 900 },
];

//DEclarar variables donde vamos a almacenar el nombre y el saldo actual
let nombre, saldoActual;

// Espera a que el contenido del domuento (HTML) este completamente cargado

document.addEventListener("DOMContentLoaded", () => {
  let consultar = document.getElementById("btnConsultar");
  let retirar = document.getElementById("btnRetirar");
  let depositar = document.getElementById("btnDepositar");
  let ingresar = document.getElementById("btnIngresar");

  // si el boton de iniciar sesion existe, agrega con "listener" para un evento onClick

  if (ingresar) ingresar.addEventListener("click", iniciarSesion);

  //agregar escuchadores para los botones de consulta, depositar y retirar
  if (consultar) consultar.addEventListener("click", consultarSaldo);
  if (retirar) retirar.addEventListener("click", retirarMonto);
  if (depositar) depositar.addEventListener("click", depositarMonto);

  nombreUsuario();
});

//Funcion para cambiar de pagina

function mostrarCajero() {
  location.href = "cajero.html";
}

function cerrarSesion() {
  window.location.href = "login.html";
}

//Funcion para inicio de sesion

function iniciarSesion() {
  const username = document.getElementById("usuario").value;
  const password = document.getElementById("password").value;
  let usuarioEncontrado = false;

  for (let i = 0; i < cuentas.length; i++) {
    if (username === cuentas[i].nombre && password === cuentas[i].clave) {
      nombre = username; // guarda el nombre del usuario
      //Intenta obtener el sadlo desde el almacenamiento local
      saldoActual = parseFloat(
        localStorage.getItem(nombre) || cuentas[i].saldo
      );
      localStorage.setItem("saludo", nombre); // guarda el nombre en el alamacenamiento local
      localStorage.setItem(nombre, saldoActual); //guarda el saldo en el almacenamiento local

      mostrarCajero();
      usuarioEncontrado = true;
      break;
    }
  }

  if (!usuarioEncontrado) {
    alert("Contraseña o usuario inválidos");
    document.getElementById("password").focus(); // Enfocar el campo de contraseña para que el usuario pueda ingresar una nueva clave
    document.getElementById("password").value = ""; // Limpiar el campo de contraseña
  }
}

//funcion para mostrar el nombre del usuario en la pagina del cajero
function nombreUsuario() {
  //obtiene el nombre del almacenamiento local
  let userName = localStorage.getItem("saludo");

  if (userName) {
    // obtiene el saldo del usuario del almacenamiento local
    saldoActual = parseFloat(localStorage.getItem(userName)) || 0;
    // muestra el nombre del usuario
    document.getElementById("saludo").innerHTML =
      "¡ Bienvenida " + userName + " !";
  }
}

function consultarSaldo() {
  alert("Saldo: $" + saldoActual);
}

function depositarMonto() {
  let monto = document.getElementById("depositar").value; // obtiene el monto ingreado
  let deposito = parseFloat(monto); //pasa de string el monto a numero
  let saldoMasDeposito = deposito + saldoActual; //Calcula el nuevo saldo

  if (monto === "") {
    alert("Escriba el monto a depositar");
  } else if (deposito <= 0) {
    // verifivca si el monto es valido
    alert("Ingrese una cantidad valida");
  } else if (saldoMasDeposito > 990) {
    // verifica si el saldo no exde el limite

    alert("Lo lamento, no puede tener más de $990 en la cuenta");
    alert("Saldo actual es de: $" + saldoActual);
  } else {
    // si todo es correcto realiza el deposito

    saldoActual = saldoMasDeposito; //Actualiza el saldo actual
    localStorage.setItem(nombre, saldoActual); // guarda el saldo actualizado en el alamacenamiento local

    alert("Depósito de: $" + deposito); // muestra el depósito
    alert("Saldo actual de: $" + saldoActual); // muestra el nuevo saldo
  }
  limpiarInput("depositar");
}

function retirarMonto() {
  let cantidad = document.getElementById("retirar").value; //Obtiene la cantidad ingresada

  let retiro = parseFloat(cantidad); // Convierte la cantidad string en numero
  let saldoMenosRetiro = saldoActual - retiro;

  if (cantidad === "") {
    alert("Escriba el monto a retirar");
    vaciarAlertas();
  } else if (retiro <= 0) {
    // verifica si la cantidad es válida
    alert("No puede tener menos de $10 en la cuenta");
    alert("Saldo actual de: $" + saldoActual);
    vaciarSaldo();
    vaciarTransaccion();
  } else if (saldoMenosRetiro < 10) {
    // verifica si el saldo no es menor a 10
    alert("No puede tener menos de $10 en la cuenta");
    alert("Saldo actual de: $" + saldoActual);
  } else {
    // si todo esta bien realiza el retiro

    saldoActual = saldoMenosRetiro; // actualiza el saldo actual
    localStorage.storage.setItem(nombre, saldoActual); // guarda el saldo actualizado en el local
    alert("Retiro exitoso de: $" + retiro);
    alert("Saldo actual de: $" + saldoActual);
  }
  limpiarInput("retirar");
}

function limpiarInput(id) {
  document.getElementById(id).value = "";
}
