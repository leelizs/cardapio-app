let marginpasteisEspeciais = 0; //Margin para movimentar o carrosel de pasteis especiais

// CARROSEL PASTEIS ESPECIAIS ///////////////////////////////////////////////////////////////////////////////////////////

document.querySelector('.pasteisEspeciais-setaLeft-icone').addEventListener('click', () => {

    if (window.innerWidth > 460) {
        marginpasteisEspeciais = marginpasteisEspeciais + 340;
        if (marginpasteisEspeciais > 0) {
            marginpasteisEspeciais = 0;
        }

        document.querySelector('.pasteisEspeciais-list').style.marginLeft = marginpasteisEspeciais + 'px';
    }
    else {
        marginpasteisEspeciais = marginpasteisEspeciais + (window.innerWidth - 60);
        if (marginpasteisEspeciais > 0) {
            marginpasteisEspeciais = 0;
        }
        document.querySelector('.pasteisEspeciais-list').style.marginLeft = marginpasteisEspeciais + 'px';;
    }
});

document.querySelector('.pasteisEspeciais-setaRigth-icone').addEventListener('click', () => {
    if (window.innerWidth > 460) {
        let x = marginpasteisEspeciais - 340;
        if ((window.innerWidth - 2880) > x) {
            x = 0;
        }
        marginpasteisEspeciais = x;
        document.querySelector('.pasteisEspeciais-list').style.marginLeft = marginpasteisEspeciais + 'px';
    }
    else {
        marginpasteisEspeciais = marginpasteisEspeciais - (window.innerWidth - 60);
        let x = -(window.innerWidth * 5) - 10;
        if (marginpasteisEspeciais < x) {
            marginpasteisEspeciais = 0;
        }
        document.querySelector('.pasteisEspeciais-list').style.marginLeft = marginpasteisEspeciais + 'px';
    }
});

// MAPEANDO LISTA DE PASTEIS ESPECIAIS ///////////////////////////////////////////////////////////////////////////////////////////

pasteisEspeciais.map((item, index) => {
    const pasteisEspeciaisList = document.querySelector('.pasteisEspeciais-list');
    const pasteisEspeciaisDiv = document.createElement("div");
    pasteisEspeciaisDiv.classList.add("pasteisEspeciais-item");
    pasteisEspeciaisList.appendChild(pasteisEspeciaisDiv);

    const pasteisEspeciaisDiv1 = document.createElement("div");
    pasteisEspeciaisDiv1.classList.add("pasteisEspeciais-item-area1");
    pasteisEspeciaisDiv.appendChild(pasteisEspeciaisDiv1);
    const pasteisEspeciaisImg = document.createElement("img");
    pasteisEspeciaisImg.src = item.img;
    pasteisEspeciaisDiv1.appendChild(pasteisEspeciaisImg);

    const pasteisEspeciaisDiv2 = document.createElement("div");
    pasteisEspeciaisDiv2.classList.add("pasteisEspeciais-item-area2");
    pasteisEspeciaisDiv.appendChild(pasteisEspeciaisDiv2);
    const pasteisEspeciaisTitle = document.createElement("h2");
    const pasteisEspeciaisDescriptopn = document.createElement("p");
    pasteisEspeciaisTitle.innerText = item.name;
    pasteisEspeciaisDescriptopn.innerHTML = item.description;
    pasteisEspeciaisDiv2.appendChild(pasteisEspeciaisTitle);
    pasteisEspeciaisDiv2.appendChild(pasteisEspeciaisDescriptopn);

    const pasteisEspeciaisDiv3 = document.createElement("div");
    pasteisEspeciaisDiv3.classList.add("pasteisEspeciais-item-area3");
    pasteisEspeciaisDiv.appendChild(pasteisEspeciaisDiv3);
    const pasteisEspeciaisPrice = document.createElement("h2");
    const pasteisEspeciaisButton = document.createElement("div");
    pasteisEspeciaisPrice.innerText = 'R$' + item.price.toFixed(2);
    pasteisEspeciaisButton.classList.add("pasteisEspeciais-plus");
    pasteisEspeciaisButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path d="M13.299 3.74c-.207-.206-.299-.461-.299-.711 0-.524.407-1.029 1.02-1.029.262 0 .522.1.721.298l3.783 3.783c-.771.117-1.5.363-2.158.726l-3.067-3.067zm3.92 14.84l-.571 1.42h-9.296l-3.597-8.961-.016-.039h9.441c.171-.721.459-1.395.848-2h-14.028v2h.643c.535 0 1.021.304 1.256.784l4.101 10.216h12l1.21-3.015c-.698-.03-1.367-.171-1.991-.405zm-6.518-14.84c.207-.206.299-.461.299-.711 0-.524-.407-1.029-1.02-1.029-.261 0-.522.1-.72.298l-4.701 4.702h2.883l3.259-3.26zm8.799 4.26c-2.484 0-4.5 2.015-4.5 4.5s2.016 4.5 4.5 4.5c2.482 0 4.5-2.015 4.5-4.5s-2.018-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1z"/></svg>'

    pasteisEspeciaisDiv3.appendChild(pasteisEspeciaisPrice);
    pasteisEspeciaisDiv3.appendChild(pasteisEspeciaisButton);
    pasteisEspeciaisButton.addEventListener('click', (e) => {
        keyEscolhido = index;
        itemEscolhido = 3;

        e.preventDefault();
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
        modalTitle.innerHTML = pasteisEspeciais[index].name;
        modalDescription.innerHTML = pasteisEspeciais[index].description;
        modalPrice.innerHTML = 'R$' + pasteisEspeciais[index].price.toFixed(2);
        modalImg.src = pasteisEspeciais[index].img;

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

    pasteisEspeciaisList.appendChild(pasteisEspeciaisDiv);
});