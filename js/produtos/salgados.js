let marginsalgados = 0; //Margin para movimentar o carrosel de salgados

// CARROSEL SALGADOS ///////////////////////////////////////////////////////////////////////////////////////////

document.querySelector('.salgados-setaLeft-icone').addEventListener('click', () => {

    if (window.innerWidth > 460) {
        marginsalgados = marginsalgados + 340;
        if (marginsalgados > 0) {
            marginsalgados = 0;
        }

        document.querySelector('.salgados-list').style.marginLeft = marginsalgados + 'px';
    }
    else {
        marginsalgados = marginsalgados + (window.innerWidth - 60);
        if (marginsalgados > 0) {
            marginsalgados = 0;
        }
        document.querySelector('.salgados-list').style.marginLeft = marginsalgados + 'px';
    }
});

document.querySelector('.salgados-setaRigth-icone').addEventListener('click', () => {
    if (window.innerWidth > 460) {
        let x = marginsalgados - 340;
        if ((window.innerWidth - 1000) > x) {
            x = 0;
        }
        marginsalgados = x;
        document.querySelector('.salgados-list').style.marginLeft = marginsalgados + 'px';
    }
    else {
        marginsalgados = marginsalgados - (window.innerWidth - 60);
        let x = -(window.innerWidth * 1) - 10;
        if (marginsalgados < x) {
            marginsalgados = 0;
        }
        document.querySelector('.salgados-list').style.marginLeft = marginsalgados + 'px';
    }
});

// MAPEANDO LISTA DE SALGADOS ///////////////////////////////////////////////////////////////////////////////////////////

salgados.map((item, index) => {
    const salgadosList = document.querySelector('.salgados-list');
    const salgadosDiv = document.createElement("div");
    salgadosDiv.classList.add("salgados-item");
    salgadosList.appendChild(salgadosDiv);

    const salgadosDiv1 = document.createElement("div");
    salgadosDiv1.classList.add("salgados-item-area1");
    salgadosDiv.appendChild(salgadosDiv1);
    const salgadosImg = document.createElement("img");
    salgadosImg.src = item.img;
    salgadosDiv1.appendChild(salgadosImg);

    const salgadosDiv2 = document.createElement("div");
    salgadosDiv2.classList.add("salgados-item-area2");
    salgadosDiv.appendChild(salgadosDiv2);
    const salgadosTitle = document.createElement("h2");
    const salgadosDescriptopn = document.createElement("p");
    salgadosTitle.innerText = item.name;
    salgadosDescriptopn.innerHTML = item.description;
    salgadosDiv2.appendChild(salgadosTitle);
    salgadosDiv2.appendChild(salgadosDescriptopn);

    const salgadosDiv3 = document.createElement("div");
    salgadosDiv3.classList.add("salgados-item-area3");
    salgadosDiv.appendChild(salgadosDiv3);
    const salgadosPrice = document.createElement("h2");
    const salgadosButton = document.createElement("div");
    salgadosPrice.innerText = 'R$' + item.price.toFixed(2);
    salgadosButton.classList.add("salgados-plus");
    salgadosButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path d="M13.299 3.74c-.207-.206-.299-.461-.299-.711 0-.524.407-1.029 1.02-1.029.262 0 .522.1.721.298l3.783 3.783c-.771.117-1.5.363-2.158.726l-3.067-3.067zm3.92 14.84l-.571 1.42h-9.296l-3.597-8.961-.016-.039h9.441c.171-.721.459-1.395.848-2h-14.028v2h.643c.535 0 1.021.304 1.256.784l4.101 10.216h12l1.21-3.015c-.698-.03-1.367-.171-1.991-.405zm-6.518-14.84c.207-.206.299-.461.299-.711 0-.524-.407-1.029-1.02-1.029-.261 0-.522.1-.72.298l-4.701 4.702h2.883l3.259-3.26zm8.799 4.26c-2.484 0-4.5 2.015-4.5 4.5s2.016 4.5 4.5 4.5c2.482 0 4.5-2.015 4.5-4.5s-2.018-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1z"/></svg>'

    salgadosDiv3.appendChild(salgadosPrice);
    salgadosDiv3.appendChild(salgadosButton);
    salgadosButton.addEventListener('click', (e) => {
        e.preventDefault();

        itemEscolhido = 6;

        if (itemEscolhido === 1) { // Quando o item é um sorvete
            // Configura sabores e acompanhamentos apenas para sorvetes
            configurarTamanhos(index); // Chama a nova função para configurar tamanhos
            configurarSabores(sorvetes[index].name);
            configurarAcompanhamentos();
        } else {
            // Remove qualquer container de tamanhos existente
            const tamanhoContainerExisting = document.querySelector('.tamanhos-opcoes');
            if (tamanhoContainerExisting) tamanhoContainerExisting.remove(); // Remove o container de tamanhos, se existir

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
        const modalImg = document.querySelector('.produto-img img');
        const buttonAdd = document.querySelector('#add');
        const quantidade = document.querySelector('.produto-quantidade .quantidade');

        modalTitle.innerHTML = salgados[index].name;
        modalDescription.innerHTML = salgados[index].description;
        modalPrice.innerHTML = 'R$' + salgados[index].price.toFixed(2);
        modalImg.src = salgados[index].img;
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
            descricaoPersonalizada.value = ''; // Limpa o conteúdo da descrição ao abrir a modal
        }

        buttonLess.addEventListener('click', () => { //Botão de tirar 1 item do modal 1
            numeroQuantidade = numeroQuantidade - 1;
            if (numeroQuantidade <= 0) {
                numeroQuantidade = 1;
            }
            quantidade.innerHTML = numeroQuantidade;
        });

        buttonPlus.addEventListener('click', () => { //Botão de adicionar 1 item do modal 1
            numeroQuantidade = numeroQuantidade + 1;
            quantidade.innerHTML = numeroQuantidade;
        });

        buttonCancel.addEventListener('click', () => { //Botão cancelar do modal 1
            produtoModal.classList.remove("show");
            descricaoPersonalizada.value = ''; // Limpar a descrição ao fechar a modal
        });
    });

    salgadosList.appendChild(salgadosDiv);
});