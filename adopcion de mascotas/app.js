// Obtener el selector de idioma
const languageSelect = document.getElementById('idioma');

// Función para cambiar el contenido en función del idioma
function loadContent(language) {
  // Cargar el archivo JSON con los contenidos
  fetch('content.json')
    .then(response => response.json())
    .then(data => {
      // Actualizar los elementos con los contenidos del idioma seleccionado
      document.getElementById('title').innerText = data[language].title;
      document.getElementById('image').src = data[language].image;
      document.getElementById('paragraph').innerText = data[language].paragraph;
    })
    .catch(error => console.error('Error al cargar el contenido:', error));
}

// Inicializar el contenido con el idioma por defecto (español)
loadContent('es');

// Cambiar el idioma cuando el usuario seleccione una opción
languageSelect.addEventListener('change', (event) => {
  const selectedLanguage = event.target.value;
  loadContent(selectedLanguage);
});
