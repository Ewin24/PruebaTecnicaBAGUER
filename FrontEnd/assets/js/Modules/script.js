const flexDiv = document.querySelector('.flex');
const img = document.querySelector('img');
const info = document.querySelector('.space-y-3');
const btn = document.querySelector('#generate');
let datosActuales;

let pedirData = async () => {
  let URL = 'https://randomuser.me/api/?nat=ES&results=10';
  const respuesta = await fetch(URL);
  const datos = await respuesta.json();
  console.log(datos);
  return datos;
}

//carga de datos en tabla
document.addEventListener('DOMContentLoaded', () => {
  new DataTable('#example');
  const tableBody = document.querySelector('#tbody')
  async function cargarTabla() {
    let datos = await pedirData();
    datosActuales = datos;
    const elementos = datos.results.map(
      elemento => `
      <tr>
        <td><img class="w-14 h-14 rounded-full mr-8" src="${elemento.picture.thumbnail}"/></td>
        <td>${elemento.name.first}</td>
        <td>${elemento.name.last}</td>
        <td id="btn"><button id="${elemento.id.value}" onclick="mostrarDetalle(this)">detalle</button>
        </td>
      </tr>`
    ).join('');

    tableBody.innerHTML = '';
    tableBody.insertAdjacentHTML('beforebegin', elementos);
  }
  cargarTabla()
})

function mostrarDetalle(btn) {
  console.log(btn.id);
  console.log(datosActuales);
  const result = datosActuales.results.find(p => p.id.value === btn.id)
  if (result) {
    Swal.fire({
      html: `
      <div id="user" class="mt-6 flex flex-col items-center">
        <div class="w-full max-w-4xl p-6 bg-white shadow-lg rounded-lg">
          <div class="flex flex-col items-center">
            <img class="w-48 h-48 rounded-full mb-8" src="${result.picture.large}" />
          </div>
          <div class="grid grid-cols-1 gap-6">
            <div class="text-xl flex items-center">
              <span class="font-bold mr-2">Nombre: </span>${result.name.first}
            </div>
            <div class="text-xl flex items-center">
              <span class="font-bold mr-2">Apellidos: </span>${result.name.last}
            </div>
            <div class="text-xl flex items-center">
              <span class="font-bold mr-2">Genero: </span>${result.gender}
            </div>
            <div class="text-xl flex items-center">
              <span class="font-bold mr-2">Correo: </span>${result.email}
            </div>
            <div class="text-xl flex items-center">
              <span class="font-bold mr-2">Telefono: </span>${result.phone}
            </div>
            <div class="text-xl flex items-center">
              <span class="font-bold mr-2">Celular: </span>${result.cell}
            </div>
            <div class="text-xl flex items-center">
              <span class="font-bold mr-2">Ubicacion (Pais): </span>${result.location.country}
            </div>
            <div class="text-xl flex items-center">
              <span class="font-bold mr-2">Ubicacion (Estado): </span>${result.location.state}
            </div>
            <div class="text-xl flex items-center">
              <span class="font-bold mr-2">Ubicacion (Ciudad): </span>${result.location.city}
            </div>
            <div class="text-xl ">
              <span class="font-bold mr-2">Ubicacion (Direccion): </span>${result.location.street.name}, #${result.location.street.number}
            </div>
            <div class="text-xl flex items-center">
              <span class="font-bold mr-2">Usuario: </span>${result.login.username}
            </div>
          </div>
        </div>
      </div>`,
      showCloseButton: true,
      confirmButtonText: `
        <i class="fa fa-thumbs-up"></i> Aceptar!
      `
    });
    console.log("Objeto encontrado:", result);
  } else {
    console.log("Objeto no encontrado.");
  }
}

// //carga de datos en tarjetas
// function getUserProfile() {
//   btn.firstElementChild.classList.remove('hidden');
//   fetch('https://randomuser.me/api/')
//     .then((response) => response.json())
//     .then((data) => data.results[0])
//     .then((user) => {
//       if (user.gender == 'male') {
//         document.body.className = 'bg-blue-800 text-white overflow-x-hidden';
//       } else {
//         document.body.className = 'bg-purple-800 text-white overflow-x-hidden';
//       }
//       //Button Spinner

//       //User Image:
//       img.setAttribute('src', `${user.picture.large}`);

//       //User Name:
//       info.children[0].innerHTML = ` <p class="text-xl">
//     <span class="font-bold">Name: </span>${user.name.first} ${user.name.last}
//   </p>`;

//       //User Email:
//       info.children[1].innerHTML = ` <p class="text-xl">
//         <span class="font-bold">Email: </span> ${user.email}
//       </p>`;

//       //User Phone:
//       info.children[2].innerHTML = ` <p class="text-xl">
//         <span class="font-bold">Phone: </span> ${user.phone}
//       </p>`;

//       //User Location
//       info.children[3].innerHTML = ` <p class="text-xl">
//       <span class="font-bold">Location: </span> ${user.location.city}, ${user.location.country}
//     </p>`;

//       //User Age:
//       info.children[4].innerHTML = `<p class="text-xl"><span class="font-bold">Age: </span> ${user.dob.age}</p>`;
//     })
//     .then(() => {
//       btn.firstElementChild.classList.add('hidden');
//     })
//     .catch(() => {
//       flexDiv.style.fontSize = '30px';
//       flexDiv.innerHTML = `<h2><strong>OOPs! Something Went Wrong. Please Refresh the Page and Try Again.</strong><h2>`;
//       flexDiv.style.textAlign = 'center';
//     });
// }
// btn.addEventListener('click', getUserProfile);



