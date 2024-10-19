let marginbebidas = 0; //Margin para movimentar o carrosel de sorvete

// CARROSEL BEBIDAS ///////////////////////////////////////////////////////////////////////////////////////////

document.querySelector('.bebidas-setaLeft-icone').addEventListener('click', () => {

    if (window.innerWidth > 460) {
        marginbebidas = marginbebidas + 340;
        if (marginbebidas > 0) {
            marginbebidas = 0;
        }

        document.querySelector('.bebidas-list').style.marginLeft = marginbebidas + 'px';
    }
    else {
        marginbebidas = marginbebidas + (window.innerWidth - 60);
        if (marginbebidas > 0) {
            marginbebidas = 0;
        }
        document.querySelector('.bebidas-list').style.marginLeft = marginbebidas + 'px';;
    }
});

document.querySelector('.bebidas-setaRigth-icone').addEventListener('click', () => {
    if (window.innerWidth > 460) {
        let x = marginbebidas - 340;
        if ((window.innerWidth - 2280) > x) {
            x = 0;
        }
        marginbebidas = x;
        document.querySelector('.bebidas-list').style.marginLeft = marginbebidas + 'px';
    }
    else {
        marginbebidas = marginbebidas - (window.innerWidth - 60);
        let x = -(window.innerWidth * 4) - 10;
        if (marginbebidas < x) {
            marginbebidas = 0;
        }
        document.querySelector('.bebidas-list').style.marginLeft = marginbebidas + 'px';
    }
});

// MAPEANDO LISTA DE BEBIDAS ///////////////////////////////////////////////////////////////////////////////////////////

bebidas.map((item, index) => {
    const bebidasList = document.querySelector('.bebidas-list');
    const bebidasDiv = document.createElement("div");
    bebidasDiv.classList.add("bebidas-item");
    bebidasList.appendChild(bebidasDiv);

    const bebidasDiv1 = document.createElement("div");
    bebidasDiv1.classList.add("bebidas-item-area1");
    bebidasDiv.appendChild(bebidasDiv1);
    const bebidasImg = document.createElement("img");
    bebidasImg.src = item.img;
    bebidasDiv1.appendChild(bebidasImg);

    const bebidasDiv2 = document.createElement("div");
    bebidasDiv2.classList.add("bebidas-item-area2");
    bebidasDiv.appendChild(bebidasDiv2);
    const bebidasTitle = document.createElement("h2");
    const bebidasDescriptopn = document.createElement("p");
    bebidasTitle.innerText = item.name;
    bebidasDescriptopn.innerHTML = item.description;
    bebidasDiv2.appendChild(bebidasTitle);
    bebidasDiv2.appendChild(bebidasDescriptopn);

    const bebidasDiv3 = document.createElement("div");
    bebidasDiv3.classList.add("bebidas-item-area3");
    bebidasDiv.appendChild(bebidasDiv3);
    const bebidasPrice = document.createElement("h2");
    const bebidasButton = document.createElement("div");
    bebidasPrice.innerText = 'R$' + item.price.toFixed(2);
    bebidasButton.classList.add("bebidas-plus");
    bebidasButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path d="M13.299 3.74c-.207-.206-.299-.461-.299-.711 0-.524.407-1.029 1.02-1.029.262 0 .522.1.721.298l3.783 3.783c-.771.117-1.5.363-2.158.726l-3.067-3.067zm3.92 14.84l-.571 1.42h-9.296l-3.597-8.961-.016-.039h9.441c.171-.721.459-1.395.848-2h-14.028v2h.643c.535 0 1.021.304 1.256.784l4.101 10.216h12l1.21-3.015c-.698-.03-1.367-.171-1.991-.405zm-6.518-14.84c.207-.206.299-.461.299-.711 0-.524-.407-1.029-1.02-1.029-.261 0-.522.1-.72.298l-4.701 4.702h2.883l3.259-3.26zm8.799 4.26c-2.484 0-4.5 2.015-4.5 4.5s2.016 4.5 4.5 4.5c2.482 0 4.5-2.015 4.5-4.5s-2.018-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1z"/></svg>'

    bebidasDiv3.appendChild(bebidasPrice);
    bebidasDiv3.appendChild(bebidasButton);
    bebidasButton.addEventListener('click', (e) => {
        keyEscolhido = index;
        itemEscolhido = 4;

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
        modalTitle.innerHTML = bebidas[index].name;
        modalDescription.innerHTML = bebidas[index].description;
        modalPrice.innerHTML = 'R$' + bebidas[index].price.toFixed(2);
        modalImg.src = bebidas[index].img;

        quantidade.innerHTML = numeroQuantidade;

        // // Verifica se o campo de descrição personalizada já existe
        // let descricaoPersonalizada = document.querySelector('#produto-descricao');
        // if (!descricaoPersonalizada) {
        //     descricaoPersonalizada = document.createElement('textarea');
        //     descricaoPersonalizada.id = 'produto-descricao';
        //     descricaoPersonalizada.placeholder = 'Observação: ';
        //     const descricaoPersonalizadaContainer = document.createElement('div');
        //     descricaoPersonalizadaContainer.classList.add('descricao-personalizada');
        //     descricaoPersonalizadaContainer.appendChild(descricaoPersonalizada);

        //     // Adicionar o campo de descrição ao modal
        //     const modalInfoArea = document.querySelector(".produto-informacoes-area1");
        //     modalInfoArea.appendChild(descricaoPersonalizadaContainer);
        // }

        // // Limpa o campo de descrição ao abrir a modal
        // descricaoPersonalizada.value = ''; // Remova essa linha se quiser manter o texto ao abrir a modal novamente.

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

    bebidasList.appendChild(bebidasDiv);
});