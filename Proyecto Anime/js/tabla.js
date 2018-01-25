var table = [];

window.onload = loadEvents;

function loadEvents() {
  var form = document.getElementById("animes");
  form.addEventListener("submit", animes);
}

function showTable() {
  var tableBody = document.getElementById("tusanimes");
  var fullTable = "";

  for (var i = 0; i < table.length; i++) {
    fullTable +=
    "<tr><td>" + table[i].anime + "</td><td>" + table[i].capitulosvistos +
    "</td><td>" + table[i].capitulospendientes + "</td><td>" + table[i].temporadasvistas +
    "</td><td>" + table[i].temporadaspendientes + "</td><td>" + table[i].genero +
    "</td><td>" + table[i].duracioncaps + "</td><td>" + table[i].capitulosportemp +
    "</td><td>" + table[i].anyodeestreno + "</td><td>" + table[i].estado +
    "</td></tr>";
  }

  tableBody.innerHTML = fullTable;
}

function animes(event) {
  event.preventDefault();

  var animeIntroducido = document.getElementById("anime").value;
  var capitulosvistosIntroducido = document.getElementById("capitulosvistos").value;
  var capitulospendientesIntroducido = document.getElementById("capitulospendientes").value;
  var temporadasvistasIntroducido = document.getElementById("temporadasvistas").value;
  var temporadaspendientesIntroducido = document.getElementById("temporadaspendientes").value;
  var generoIntroducido = document.getElementById("genero").value;
  var capitulosportempIntroducido = document.getElementById("capitulosportemp").value;
  var duracioncapsIntroducido = document.getElementById("duracioncaps").value;
  var anyodeestrenoIntroducido = document.getElementById("anyodeestreno").value;
  var estadoIntroducido = document.getElementById("estado").value;

  var agnadir = {
    anime: animeIntroducido, capitulosvistos: capitulosvistosIntroducido,
    capitulospendientes: capitulospendientesIntroducido, temporadasvistas: temporadasvistasIntroducido,
    temporadaspendientes: temporadaspendientesIntroducido, genero: generoIntroducido,
    capitulosportemp: capitulosportempIntroducido, duracioncaps: duracioncapsIntroducido,
    anyodeestreno: anyodeestrenoIntroducido, estado: estadoIntroducido
  };
  table.push(agnadir);
  showTable();
}
