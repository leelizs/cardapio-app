let marginbatatas = 0; //Margin para movimentar o carrosel de batatas

// CARROSEL BATATAS ///////////////////////////////////////////////////////////////////////////////////////////

document.querySelector('.batatas-setaLeft-icone').addEventListener('click', () => {

    if (window.innerWidth > 460) {
        marginbatatas = marginbatatas + 340;
        if (marginbatatas > 0) {
            marginbatatas = 0;
        }

        document.querySelector('.batatas-list').style.marginLeft = marginbatatas + 'px';
    }
    else {
        marginbatatas = marginbatatas + (window.innerWidth - 60);
        if (marginbatatas > 0) {
            marginbatatas = 0;
        }
        document.querySelector('.batatas-list').style.marginLeft = marginbatatas + 'px';;
    }
});

document.querySelector('.batatas-setaRigth-icone').addEventListener('click', () => {
    if (window.innerWidth > 460) {
        let x = marginbatatas - 340;
        if ((window.innerWidth - 2280) > x) {
            x = 0;
        }
        marginbatatas = x;
        document.querySelector('.batatas-list').style.marginLeft = marginbatatas + 'px';
    }
    else {
        marginbatatas = marginbatatas - (window.innerWidth - 60);
        let x = -(window.innerWidth * 2) - 10;
        if (marginbatatas < x) {
            marginbatatas = 0;
        }
        document.querySelector('.batatas-list').style.marginLeft = marginbatatas + 'px';
    }
});

// MAPEANDO LISTA DE BATATAS ///////////////////////////////////////////////////////////////////////////////////////////

batatas.map((item, index) => {
    const batatasList = document.querySelector('.batatas-list');
    const batatasDiv = document.createElement("div");
    batatasDiv.classList.add("batatas-item");
    batatasList.appendChild(batatasDiv);

    const batatasDiv1 = document.createElement("div");
    batatasDiv1.classList.add("batatas-item-area1");
    batatasDiv.appendChild(batatasDiv1);
    const batatasImg = document.createElement("img");
    batatasImg.src = item.img;
    batatasDiv1.appendChild(batatasImg);

    const batatasDiv2 = document.createElement("div");
    batatasDiv2.classList.add("batatas-item-area2");
    batatasDiv.appendChild(batatasDiv2);
    const batatasTitle = document.createElement("h2");
    const batatasDescriptopn = document.createElement("p");
    batatasTitle.innerText = item.name;
    batatasDescriptopn.innerHTML = item.description;
    batatasDiv2.appendChild(batatasTitle);
    batatasDiv2.appendChild(batatasDescriptopn);

    const batatasDiv3 = document.createElement("div");
    batatasDiv3.classList.add("batatas-item-area3");
    batatasDiv.appendChild(batatasDiv3);
    const batatasPrice = document.createElement("h2");
    const batatasButton = document.createElement("div");
    batatasPrice.innerText = 'R$' + item.price.toFixed(2);
    batatasButton.classList.add("batatas-plus");
    batatasButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path d="M13.299 3.74c-.207-.206-.299-.461-.299-.711 0-.524.407-1.029 1.02-1.029.262 0 .522.1.721.298l3.783 3.783c-.771.117-1.5.363-2.158.726l-3.067-3.067zm3.92 14.84l-.571 1.42h-9.296l-3.597-8.961-.016-.039h9.441c.171-.721.459-1.395.848-2h-14.028v2h.643c.535 0 1.021.304 1.256.784l4.101 10.216h12l1.21-3.015c-.698-.03-1.367-.171-1.991-.405zm-6.518-14.84c.207-.206.299-.461.299-.711 0-.524-.407-1.029-1.02-1.029-.261 0-.522.1-.72.298l-4.701 4.702h2.883l3.259-3.26zm8.799 4.26c-2.484 0-4.5 2.015-4.5 4.5s2.016 4.5 4.5 4.5c2.482 0 4.5-2.015 4.5-4.5s-2.018-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1z"/></svg>';

    batatasDiv3.appendChild(batatasPrice);
    batatasDiv3.appendChild(batatasButton);
    batatasList.appendChild(batatasDiv);

    batatasButton.addEventListener('click', (e) => {
        e.preventDefault();

        itemEscolhido = 5;

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

        if (itemEscolhido === 0 || itemEscolhido === 2 || itemEscolhido === 3) { // Quando o item é um hamburguer, pastel ou pastel especial
            // Configura adicionais apenas para hamburguer
            // Configura adicionais apenas para pastel
            // Configura adicionais apenas para pastel especial
            configurarAdicionais();
        } else {
            // Remove qualquer elemento relacionado a sabores/acompanhamentos
            const saboresContainer = document.querySelector('#sabores-container');
            if (saboresContainer) saboresContainer.remove();

            const acompanhamentosContainer = document.querySelector('#acompanhamentos-container');
            if (acompanhamentosContainer) acompanhamentosContainer.remove();

            const adicionaisContainer = document.querySelector('#adicionais-container');
            if (adicionaisContainer) adicionaisContainer.remove();

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
        modalTitle.innerHTML = batatas[index].name;
        modalDescription.innerHTML = batatas[index].description;
        modalPrice.innerHTML = 'R$' + batatas[index].price.toFixed(2);
        modalImg.src = batatas[index].img;

        quantidade.innerHTML = numeroQuantidade;

        // Atualiza a descrição para produtos que não são Massa, Açaí ou Cupuaçu
        let descricaoPersonalizada = document.querySelector('#produto-descricao');
        if (!descricaoPersonalizada) {
            descricaoPersonalizada = document.createElement('textarea');
            descricaoPersonalizada.id = 'produto-descricao';
            descricaoPersonalizada.placeholder = 'Observação: "Sem mostarda", por exemplo';

            const descricaoPersonalizadaContainer = document.createElement('div');
            descricaoPersonalizadaContainer.classList.add('descricao-personalizada');
            descricaoPersonalizadaContainer.appendChild(descricaoPersonalizada);

            const modalInfoArea = document.querySelector(".produto-informacoes-area1");
            modalInfoArea.appendChild(descricaoPersonalizadaContainer);
        } else {
            descricaoPersonalizada.value = ''; // Limpa o conteúdo da descrição ao abrir a modal
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

    batatasList.appendChild(batatasDiv);

});


