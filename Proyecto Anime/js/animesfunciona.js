window.onload = inicializar;
var refAnimes;
const AGREGAR = "1";
const EDITAR = "2";
var modo = AGREGAR;
var refAnimesAEditar;
var parametro;
var comprobacion;

function inicializar() {
  inicializarFirebase();

  var formulario = document.getElementById("formulario");
  formulario.addEventListener("submit", enviarAnime);


  mostrarAnimes();
}

function borrarAnime(event) {
  var clave = this.getAttribute("data-indentificador");
  var refAnimes = firebase.database().ref().child("Animes").child(clave);
  refAnimes.remove();
}

function editarAnime(event) {
  var clave = this.getAttribute("data-indentificador");
  refAnimesAEditar = firebase.database().ref().child("Animes").child(clave);
  refAnimesAEditar.once("value", function(snapshot){
    var datos = snapshot.val();
    var formulario = document.getElementById("formulario");
    formulario.anime.value = datos.Anime;
    formulario.autor.value = datos.Autor;
    formulario.description.value = datos.Descripcion;
    formulario.email.value = datos.Email;
    formulario.fecha.value = datos.Fecha;
    formulario.genero.value = datos.Genero;
    parametro = datos.Recomendado;
    modo = EDITAR;
    var btnEnviar = document.getElementById("enviar");
    btnEnviar.innerHTML = "Editar";
  });
}

function enviarAnime(event) {
  comprobacion = 0;
  var formulario = event.target;
  if(formulario.anime.value == "") {
    event.preventDefault();
    document.getElementById("error-anime").style.display = "block";
  } else if(formulario.anime.value != "") {
    document.getElementById("error-anime").style.display = "none";
  } if(formulario.autor.value == "") {
    event.preventDefault();
    document.getElementById("error-autor").style.display = "block";
  } else if(formulario.autor.value != "") {
    document.getElementById("error-autor").style.display = "none";
  } if(formulario.description.value == "") {
    event.preventDefault();
    document.getElementById("error-des").style.display = "block";
  } else if(formulario.description.value != "") {
    document.getElementById("error-des").style.display = "none";
  } if(formulario.email.value == "") {
    event.preventDefault();
    document.getElementById("error-email").style.display = "block";
  } else if(formulario.email.value != "") {
    document.getElementById("error-email").style.display = "none";
  } if(formulario.fecha.value <=1863 || formulario.fecha.value >2020) {
    event.preventDefault();
    document.getElementById("error-fecha").style.display = "block";
  } else if(formulario.fecha.value != "") {
    document.getElementById("error-fecha").style.display = "none";
  } if(formulario.genero.value == "") {
    event.preventDefault();
    document.getElementById("error-genero").style.display = "block";
  } else if(formulario.genero.value != "") {
    document.getElementById("error-genero").style.display = "none";
  } if (document.getElementById("recomendado").checked == false && document.getElementById("norecomendado").checked == false){
    event.preventDefault();
    document.getElementById("error-rec").style.display = 'block';
  } else {
    comprobacion++;
    if (document.getElementById("recomendado").checked == true) {
      parametro = "Sí";
    } else {
      parametro = "No";
    }
    document.getElementById("error-rec").style.display = 'none';
  }

  if(modo == AGREGAR){

    refAnimes.push(
      {
        Anime: formulario.anime.value,
        Autor: formulario.autor.value,
        Descripcion: formulario.description.value,
        Email: formulario.email.value,
        Fecha: formulario.fecha.value,
        Genero: formulario.genero.value,
        Recomendado: parametro
      }
    );
  } else {
    refAnimesAEditar.update({
      Anime: formulario.anime.value,
      Autor: formulario.autor.value,
      Descripcion: formulario.description.value,
      Email: formulario.email.value,
      Fecha: formulario.fecha.value,
      Genero: formulario.genero.value,
      Recomendado: parametro
    });
  }
  modo = AGREGAR;
  event.preventDefault();
}

function mostrarAnimes() {
  refAnimes = firebase.database().ref().child("Animes");
  refAnimes.on("value", mostrarDatos);
}

function mostrarDatos(snapshot) {
  var datos = snapshot.val();
  var tableBody = document.getElementById("tabla");
  var todosLosAnimes = "";
  for (var key in datos){
    todosLosAnimes += '<tr><td> <img class="borrar" src="img/borrar.png" alt="borrar" data-indentificador="' + key + '"/>'+
    '<img class="editar" src="img/editar.png" alt="editar" data-indentificador="' + key + '"/>' + datos[key].Anime + "</td><td>" + datos[key].Autor + "</td><td>" + datos[key].Descripcion +
    "</td><td>" + datos[key].Email + "</td><td>" + datos[key].Fecha + "</td><td>" + datos[key].Genero + "</td><td>" + datos[key].Recomendado + "</td></tr>";
  }
  document.getElementById("tabla").innerHTML = todosLosAnimes;
  var imagenes = document.getElementsByClassName("borrar");
  for(var i = 0; i < imagenes.length; i++) {
    imagenes[i].addEventListener("click", borrarAnime);
  }
  var imagenes = document.getElementsByClassName("editar");
  for(var i = 0; i < imagenes.length; i++) {
    imagenes[i].addEventListener("click", editarAnime);
  }
}




function inicializarFirebase() {
  // Initialize Firebase
 var config = {
   apiKey: "AIzaSyCnHhFYPTlmWPjm8WQYr_z0ZIRCQ8LeO_c",
   authDomain: "animes-8ad09.firebaseapp.com",
   databaseURL: "https://animes-8ad09.firebaseio.com",
   projectId: "animes-8ad09",
   storageBucket: "animes-8ad09.appspot.com",
   messagingSenderId: "203817166204"
 };
 firebase.initializeApp(config);
}
