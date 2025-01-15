
let xmlDoc = null;
let menuHTML = "";
function cargaXML(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "internacional.xml", true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const parser = new DOMParser();
            xmlDoc = parser.parseFromString(xhr.responseText, "application/xml");
            callback();
        } else {
            console.error("No puedo cargar");
        }
    }
    xhr.send();
}

function crearMenu(lenguaje) {
    if (!xmlDoc) return;
    menuHTML = "";
    const menu = document.getElementById("menu");
    const items = xmlDoc.getElementsByTagName("item");
    menu.innerHTML = "";
    const parrafo =xmlDoc.querySelector(`item2[id="educontenido"] > ${lenguaje}`)?.textContent;
    const titulo =xmlDoc.querySelector(`item3[id="titulo"] > ${lenguaje}`)?.textContent;
    const imag1 =xmlDoc.querySelector(`item5[id="imag1"] > ${lenguaje}`)?.textContent;
    const imag2 =xmlDoc.querySelector(`item6[id="imag2"] > ${lenguaje}`)?.textContent;
    const imag3 =xmlDoc.querySelector(`item7[id="imag3"] > ${lenguaje}`)?.textContent;
    const footer =xmlDoc.querySelector(`item4[id="footer"] > ${lenguaje}`)?.textContent;
    console.log(parrafo);
    console.log(imag2);
    
    if (parrafo) {
        document.getElementById("educontenido").textContent = parrafo;
        document.getElementById("img1").src = imag1;
        document.getElementById("img2").src = imag2;
        document.getElementById("img3").src = imag3;
    }

    if (titulo) {
        document.getElementById("titulo").textContent = titulo;
    }
    if (footer) {
        document.getElementById("footer").textContent = footer;
    }

    Array.from(items).forEach(item => {
        const id = item.getAttribute("id");
        const translation = item.getElementsByTagName(lenguaje)[0].textContent;
        const link = item.getElementsByTagName("link")[0].textContent;
        const submenu = item.getElementsByTagName("submenu")[0];
        if (submenu) {
            let submenuHTML = `<ul class="dropdown-menu" aria-labelledby="${id}">`;
            const submenuItems = submenu.getElementsByTagName("item");
            Array.from(submenuItems).forEach(subitem => {
                const subTranslation = subitem.getElementsByTagName(lenguaje)[0].textContent;
                const subLink = subitem.getElementsByTagName("link")[0].textContent;
                submenuHTML += `
                    <li><a class="dropdown-item" href="${subLink}">${subTranslation}</a></li>
                `;
            });
            submenuHTML += `</ul>`;

            menuHTML += `
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="${id}" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        ${translation}
                    </a>
                    ${submenuHTML}
                </li>
            `;
        } 
        
        
    });

    document.getElementById("menu").innerHTML = menuHTML;
}

document.getElementById('idioma').addEventListener('change', (event) => {
    crearMenu(event.target.value);
});

cargaXML(() => {
    crearMenu('es');
});
