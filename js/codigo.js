const url = 'https://dragonball-api.com/api/characters?page=1&limit=58';

fetch(url)
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('characters');

        data.items.forEach(character => {
            const card = document.createElement('div');
            card.classList.add('card');

            const img = document.createElement('img');
            img.src = character.image;
            img.alt = character.name;

            const h3 = document.createElement('h3');
            h3.textContent = character.name;

            const pRaza = document.createElement('p');
            pRaza.textContent = `Raza: ${character.race}`;

            const pGenero = document.createElement('p');
            pGenero.textContent = `Genero: ${character.gender}`
            
            const pKi = document.createElement('p');
            pGenero.textContent = `Ki: ${character.ki}`;

            card.appendChild(img);
            card.appendChild(h3);
            card.appendChild(pRaza);
            card.appendChild(pGenero);
            card.appendChild(pKi);

            card.onclick = () => mostrarTransformaciones(character.id, character.name);
            container.appendChild(card);
        });
    })
    .catch(error => console.error('Error al obtener los personajes:', error));

function mostrarTransformaciones(id, nombre) {
    const urlTransformaciones = `https://dragonball-api.com/api/characters/${id}`;

    fetch(urlTransformaciones)
        .then(response => response.json())
        .then(character => {
            const modal = document.getElementById('modal');
            const modalTitulo = document.getElementById('modalT');
            const modalCuerpo = document.getElementById('cuerpo');

            modalTitulo.textContent = `Transformaciones de ${nombre}`;
            modalCuerpo.innerHTML = '';

            if ((character.transformations) && character.transformations.length > 0) {
                character.transformations.forEach(transformation => {
                    const divTrans = document.createElement('div');
                    divTrans.classList.add('carta');

                    const imgTrans = document.createElement('img');
                    imgTrans.src = transformation.image;
                    imgTrans.alt = transformation.name;
                    imgTrans.classList.add('transformation-img');

                    const pNombreTrans = document.createElement('p');
                    pNombreTrans.innerHTML = `<b>${transformation.name}</b>`;

            

                    divTrans.appendChild(imgTrans);
                    divTrans.appendChild(pNombreTrans);
                    

                    modalCuerpo.appendChild(divTrans);
                });
            } else {
                const pNoTransformaciones = document.createElement('p');
                pNoTransformaciones.textContent = 'Este personaje no tiene transformaciones registradas.';
                modalCuerpo.appendChild(pNoTransformaciones);
            }

            modal.style.display = 'flex';
        })
        .catch(error => console.error('Error al obtener transformaciones:', error));
}



document.querySelector('.cerrar').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
});
