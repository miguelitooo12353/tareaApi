const url = 'https://dragonball-api.com/api/characters?page=1&limit=58';

fetch(url)
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('pesonajesD');

        data.items.forEach(personaje => {
            const card = document.createElement('div');
            card.classList.add('col');

            const img = document.createElement('img');
            img.src = personaje.image;
        

            const h3 = document.createElement('h3');
            h3.textContent = personaje.name;

            const LaRaza = document.createElement('p');
            LaRaza.textContent = `Raza: ${personaje.race}`;

            const ElGenero = document.createElement('p');
            ElGenero.textContent = `Genero: ${personaje.gender}`
            
            const Ki = document.createElement('p');
            Ki.textContent = `Ki: ${personaje.ki}`;

            card.appendChild(img);
            card.appendChild(h3);
            card.appendChild(LaRaza);
            card.appendChild(ElGenero);
            card.appendChild(Ki);

            card.onclick = () => mostrarTransformaciones(personaje.id, personaje.name);
            container.appendChild(card);
        });
    })
    .catch(error => console.error('Error al obtener los personajes:', error));

function mostrarTransformaciones(id, nombre) {
    const urlTransformaciones = `https://dragonball-api.com/api/characters/${id}`;

    fetch(urlTransformaciones)
        .then(response => response.json())
        .then(personaje => {
            const modal = document.getElementById('modal');
            const modalTitulo = document.getElementById('modalT');
            const modalCuerpo = document.getElementById('cuerpo');

            modalTitulo.textContent = `Transformaciones de ${nombre}`;
            modalCuerpo.innerHTML = '';

            if((personaje.transformations) && personaje.transformations.length > 0) {
                personaje.transformations.forEach(transformation => {
                    const divT = document.createElement('div');
                    divT.classList.add('carta');

                    const imgT = document.createElement('img');
                    imgT.src = transformation.image;
                    imgT.alt = transformation.name;
                    imgT.classList.add('transformation-img');

                    const nombreTrans = document.createElement('p');
                    nombreTrans.innerHTML = `${transformation.name}`;

            

                    divT.appendChild(imgT);
                    divT.appendChild(nombreTrans);
                    

                    modalCuerpo.appendChild(divT);
                });
            } else {
                const NoTransformaciones = document.createElement('p');
                NoTransformaciones.textContent = 'Este personaje no tiene transformaciones';
                modalCuerpo.appendChild(NoTransformaciones);
            }

            modal.style.display = 'flex';
        })
        .catch(error => console.log('Error al obtener transformaciones:', error));
}



window.addEventListener('click', (event) =>{
    if(event.target == modal){
        modal.style.display = 'none';
        };
});
