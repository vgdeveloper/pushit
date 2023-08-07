// Datos de presencia en diferentes países (coordenadas geográficas)
const countriesData = [
    { country: "EEUU", lat: 37.09024, lng: -95.712891 },
    { country: "El Salvador", lat: 13.794185, lng: -88.89653 },
    { country: "Inglaterra", lat: 52.3555177, lng: -1.1743197 },
    { country: "Irlanda", lat: 53.1423672, lng: -7.6920536 },
    { country: "México", lat: 23.634501, lng: -102.552783 },
    { country: "España", lat: 40.463667, lng: -3.74922 },
    { country: "Francia", lat: 46.603354, lng: 1.888334 },
    { country: "Grecia", lat: 39.074208, lng: 21.824312 },
    { country: "Israel", lat: 31.046051, lng: 34.851612 },
    { country: "Cyprus", lat: 35.126413, lng: 33.429859 },
    { country: "Sudáfrica", lat: -30.559482, lng: 22.937506 },
];

// Función para inicializar el mapa y agregar marcadores para cada país
function initMap() {
    const map = L.map('map').setView([20, 0], 2); // Cambia el nivel de zoom según tus necesidades
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Icono personalizado con el color #f23849
    const customIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });

    countriesData.forEach(country => {
        L.marker([country.lat, country.lng], { icon: customIcon }).addTo(map).bindPopup(country.country);
    });
}

// Llama a la función initMap una vez que se haya cargado el DOM
document.addEventListener('DOMContentLoaded', initMap);




function mostrarFormulario() {
    Swal.fire({
        title: 'Contact',
        html:
          '<input id="swal-input-name" class="swal2-input" placeholder="Name">' +
          '<input id="swal-input-email" class="swal2-input" placeholder="Email">' +
          '<textarea id="swal-input-message" class="swal2-textarea" placeholder="Message"></textarea>',
        showCancelButton: true,
        confirmButtonText: 'Send',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          const name = document.getElementById('swal-input-name').value;
          const email = document.getElementById('swal-input-email').value;
          const message = document.getElementById('swal-input-message').value;
    
          // Aquí puedes realizar la validación de los campos antes de enviarlos
          if (!name || !email || !message) {
            Swal.showValidationMessage('Please fill in all fields');
          }
    
          // Enviar el correo electrónico utilizando EmailJS
          const serviceID = 'service_4wxi9iy'; // Reemplaza con tu ID de servicio EmailJS
          const templateID = 'template_j2gk9kf'; // Reemplaza con tu ID de plantilla EmailJS
          const userID = 'fwrAVI3PsionSBvPB'; // Reemplaza con tu ID de usuario EmailJS
    
          // Configurar EmailJS con tu cuenta
          emailjs.init(userID);
    
          // Datos a enviar en el correo electrónico
          const emailData = {
            name,
            email,
            message,
          };
    
          // Enviar el correo electrónico
          return emailjs.send(serviceID, templateID, emailData)
            .then(response => {
              // Email enviado con éxito
              return emailData;
            })
            .catch(error => {
              // Error al enviar el correo electrónico
              Swal.showValidationMessage('Error sending email');
            });
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          // Mostrar mensaje de confirmación con los datos ingresados
          Swal.fire({
            title: 'Form Data Sent',
            html: `<p>Name: ${result.value.name}</p><p>Email: ${result.value.email}</p><p>Message: ${result.value.message}</p>`,
            icon: 'success',
          });
        }
      });
}

