let marginPastel = 0; //Margin para movimentar o carrosel de sorvete

// CARROSEL PASTEIS ///////////////////////////////////////////////////////////////////////////////////////////

document.querySelector('.pastel-setaLeft-icone').addEventListener('click', () => {

    if (window.innerWidth > 460) {
        marginPastel = marginPastel + 340;
        if (marginPastel > 0) {
            marginPastel = 0;
        }

        document.querySelector('.pastel-list').style.marginLeft = marginPastel + 'px';
    }
    else {
        marginPastel = marginPastel + (window.innerWidth - 60);
        if (marginPastel > 0) {
            marginPastel = 0;
        }
        document.querySelector('.pastel-list').style.marginLeft = marginPastel + 'px';;
    }
});

document.querySelector('.pastel-setaRigth-icone').addEventListener('click', () => {
    if (window.innerWidth > 460) {
        let x = marginPastel - 340;
        if ((window.innerWidth - 4420) > x) {
            x = 0;
        }
        marginPastel = x;
        document.querySelector('.pastel-list').style.marginLeft = marginPastel + 'px';
    }
    else {
        marginPastel = marginPastel - (window.innerWidth - 60);
        let x = -(window.innerWidth * 8) - 10;
        if (marginPastel < x) {
            marginPastel = 0;
        }
        document.querySelector('.pastel-list').style.marginLeft = marginPastel + 'px';
    }
});

// MAPEANDO LISTA DE PASTEIS ///////////////////////////////////////////////////////////////////////////////////////////

pasteis.map((item, index) => {
    const pastelList = document.querySelector('.pastel-list');
    const pastelDiv = document.createElement("div");
    pastelDiv.classList.add("pastel-item");
    pastelList.appendChild(pastelDiv);

    const pastelDiv1 = document.createElement("div");
    pastelDiv1.classList.add("pastel-item-area1");
    pastelDiv.appendChild(pastelDiv1);
    const pastelImg = document.createElement("img");
    pastelImg.src = item.img;
    pastelDiv1.appendChild(pastelImg);

    const pastelDiv2 = document.createElement("div");
    pastelDiv2.classList.add("pastel-item-area2");
    pastelDiv.appendChild(pastelDiv2);
    const pastelTitle = document.createElement("h2");
    const pastelDescriptopn = document.createElement("p");
    pastelTitle.innerText = item.name;
    pastelDescriptopn.innerHTML = item.description;
    pastelDiv2.appendChild(pastelTitle);
    pastelDiv2.appendChild(pastelDescriptopn);

    const pastelDiv3 = document.createElement("div");
    pastelDiv3.classList.add("pastel-item-area3");
    pastelDiv.appendChild(pastelDiv3);
    const pastelPrice = document.createElement("h2");
    const pastelButton = document.createElement("div");
    pastelPrice.innerText = 'R$' + item.price.toFixed(2);
    pastelButton.classList.add("pastel-plus");
    pastelButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path d="M13.299 3.74c-.207-.206-.299-.461-.299-.711 0-.524.407-1.029 1.02-1.029.262 0 .522.1.721.298l3.783 3.783c-.771.117-1.5.363-2.158.726l-3.067-3.067zm3.92 14.84l-.571 1.42h-9.296l-3.597-8.961-.016-.039h9.441c.171-.721.459-1.395.848-2h-14.028v2h.643c.535 0 1.021.304 1.256.784l4.101 10.216h12l1.21-3.015c-.698-.03-1.367-.171-1.991-.405zm-6.518-14.84c.207-.206.299-.461.299-.711 0-.524-.407-1.029-1.02-1.029-.261 0-.522.1-.72.298l-4.701 4.702h2.883l3.259-3.26zm8.799 4.26c-2.484 0-4.5 2.015-4.5 4.5s2.016 4.5 4.5 4.5c2.482 0 4.5-2.015 4.5-4.5s-2.018-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1z"/></svg>'

    pastelDiv3.appendChild(pastelPrice);
    pastelDiv3.appendChild(pastelButton);
    pastelButton.addEventListener('click', (e) => {
        e.preventDefault();

        itemEscolhido = 2;
       
        if (itemEscolhido === 1) { // Quando o item é um sorvete
            // Configura sabores e acompanhamentos apenas para sorvetes
            configurarSabores(sorvetes[index].name);
            configurarAcompanhamentos();
        } else {
            // Remove qualquer elemento relacionado a sabores/acompanhamentos
            const saboresContainer = document.querySelector('#sabores-container');
            if (saboresContainer) saboresContainer.remove();

            const acompanhamentosContainer = document.querySelector('#acompanhamentos-container');
            if (acompanhamentosContainer) acompanhamentosContainer.remove();

            // Remove a descrição anterior
            const descricaoPersonalizada = document.querySelector('#produto-descricao');
            if (descricaoPersonalizada) {
                descricaoPersonalizada.parentElement.remove(); // Remove o container da descrição
            }
        }
        
        keyEscolhido = index;
        
        modalTamanho.style.display = 'none';
        produtoModal.classList.add("show");

        let numeroQuantidade = 1;
        const modalTitle = document.querySelector(".produto-informacoes-area1 h2");
        const modalDescription = document.querySelector(".produto-informacoes-area1 p");
        const modalPrice = document.querySelector(".produto-preco h2");
        const buttonCancel = document.querySelector('.cancela');
        const buttonLess = document.querySelector('.quantidade-less');
        const buttonPlus = document.querySelector('.quantidade-plus');
        const buttonAdd = document.querySelector('#add');
        const quantidade = document.querySelector('.produto-quantidade .quantidade');
        const modalImg = document.querySelector('.produto-img img');
        modalTitle.innerHTML = pasteis[index].name;
        modalDescription.innerHTML = pasteis[index].description;
        modalPrice.innerHTML = 'R$' + pasteis[index].price.toFixed(2);
        modalImg.src = pasteis[index].img;

        quantidade.innerHTML = numeroQuantidade;

        // Verifica se o campo de descrição personalizada já existe
        let descricaoPersonalizada = document.querySelector('#produto-descricao');

        if (!descricaoPersonalizada) {
            // Cria o campo de descrição se não existir
            descricaoPersonalizada = document.createElement('textarea');
            descricaoPersonalizada.id = 'produto-descricao';
            descricaoPersonalizada.placeholder = 'Observação: ';

            const descricaoPersonalizadaContainer = document.createElement('div');
            descricaoPersonalizadaContainer.classList.add('descricao-personalizada');
            descricaoPersonalizadaContainer.appendChild(descricaoPersonalizada);

            const modalInfoArea = document.querySelector(".produto-informacoes-area1");
            modalInfoArea.appendChild(descricaoPersonalizadaContainer);
        } else {
            // Se o campo já existe, apenas limpa o valor
            descricaoPersonalizada.value = ''; // Limpa a descrição ao abrir a modal
        }

        buttonLess.addEventListener('click', () => {
            numeroQuantidade = numeroQuantidade - 1;
            if (numeroQuantidade <= 0) {
                numeroQuantidade = 1
            }
            quantidade.innerHTML = numeroQuantidade;
        });

        buttonPlus.addEventListener('click', () => {
            numeroQuantidade = numeroQuantidade + 1;
            quantidade.innerHTML = numeroQuantidade;
        });


        buttonCancel.addEventListener('click', () => {
            produtoModal.classList.remove("show");
        });


    });

    pastelList.appendChild(pastelDiv);


});