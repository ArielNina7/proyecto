
        let xmlDoc = null;
        let menuHTML = "";
        // Cargar el archivo XML
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

        // Crear menú importando de XML
        function crearMenu(lenguaje) {
            if (!xmlDoc) return;
            menuHTML = "";
            const menu = document.getElementById("menu");
            const items = xmlDoc.getElementsByTagName("item");
            menu.innerHTML = "";
            const footer =xmlDoc.querySelector(`item4[id="footer"] > ${lenguaje}`)?.textContent;
            
            if (footer) {
                document.getElementById("footer").textContent = footer;
            }

            Array.from(items).forEach(item => {
                const id = item.getAttribute("id");
                const translation = item.getElementsByTagName(lenguaje)[0].textContent;
                const link = item.getElementsByTagName("link")[0].textContent;
                const submenu = item.getElementsByTagName("submenu")[0];

                // Si el item tiene un submenú
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

        // Cambio de idioma al seleccionar
        document.getElementById('idioma').addEventListener('change', (event) => {
            crearMenu(event.target.value);
        });
       
        // Cargar y mostrar el menú con el idioma por defecto (español)
        cargaXML(() => {
            crearMenu('es');
        });
   