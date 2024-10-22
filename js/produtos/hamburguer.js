let marginHamburguer = 0; //Margin para movimentar o carrosel de hamburguer

// CARROSEL HAMBURGUERES ///////////////////////////////////////////////////////////////////////////////////////////

document.querySelector('.hamburguer-setaLeft-icone').addEventListener('click', () => {

    if (window.innerWidth > 460) {
        marginHamburguer = marginHamburguer + 340;
        if (marginHamburguer > 0) {
            marginHamburguer = 0;
        }

        document.querySelector('.hamburguer-list').style.marginLeft = marginHamburguer + 'px';
    }
    else {
        marginHamburguer = marginHamburguer + (window.innerWidth - 60);
        if (marginHamburguer > 0) {
            marginHamburguer = 0;
        }
        document.querySelector('.hamburguer-list').style.marginLeft = marginHamburguer + 'px';;
    }
});

document.querySelector('.hamburguer-setaRigth-icone').addEventListener('click', () => {
    if (window.innerWidth > 460) {
        let x = marginHamburguer - 340;
        if ((window.innerWidth - 3100) > x) {
            x = 0;
        }
        marginHamburguer = x;
        document.querySelector('.hamburguer-list').style.marginLeft = marginHamburguer + 'px';
    }
    else {
        marginHamburguer = marginHamburguer - (window.innerWidth - 60);
        let x = -(window.innerWidth * 5) - 10;
        if (marginHamburguer < x) {
            marginHamburguer = 0;
        }
        document.querySelector('.hamburguer-list').style.marginLeft = marginHamburguer + 'px';
    }
});

// MAPEANDO LISTA DE HAMBURGUER ///////////////////////////////////////////////////////////////////////////////////////////

hamburgueres.map((item, index) => {
    const hamburguerList = document.querySelector('.hamburguer-list');
    const hamburguerDiv = document.createElement("div");
    hamburguerDiv.classList.add("hamburguer-item");
    hamburguerList.appendChild(hamburguerDiv);

    const hamburguerDiv1 = document.createElement("div");
    hamburguerDiv1.classList.add("hamburguer-item-area1");
    hamburguerDiv.appendChild(hamburguerDiv1);
    const hamburguerImg = document.createElement("img");
    hamburguerImg.src = item.img;
    hamburguerDiv1.appendChild(hamburguerImg);

    const hamburguerDiv2 = document.createElement("div");
    hamburguerDiv2.classList.add("hamburguer-item-area2");
    hamburguerDiv.appendChild(hamburguerDiv2);
    const hamburguerTitle = document.createElement("h2");
    const hamburguerDescriptopn = document.createElement("p");
    hamburguerTitle.innerText = item.name;
    hamburguerDescriptopn.innerHTML = item.description;
    hamburguerDiv2.appendChild(hamburguerTitle);
    hamburguerDiv2.appendChild(hamburguerDescriptopn);

    const hamburguerDiv3 = document.createElement("div");
    hamburguerDiv3.classList.add("hamburguer-item-area3");
    hamburguerDiv.appendChild(hamburguerDiv3);
    const hamburguerPrice = document.createElement("h2");
    const hamburguerButton = document.createElement("div");
    hamburguerPrice.innerText = 'R$' + item.price.toFixed(2);
    hamburguerButton.classList.add("hamburguer-plus");
    hamburguerButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path d="M13.299 3.74c-.207-.206-.299-.461-.299-.711 0-.524.407-1.029 1.02-1.029.262 0 .522.1.721.298l3.783 3.783c-.771.117-1.5.363-2.158.726l-3.067-3.067zm3.92 14.84l-.571 1.42h-9.296l-3.597-8.961-.016-.039h9.441c.171-.721.459-1.395.848-2h-14.028v2h.643c.535 0 1.021.304 1.256.784l4.101 10.216h12l1.21-3.015c-.698-.03-1.367-.171-1.991-.405zm-6.518-14.84c.207-.206.299-.461.299-.711 0-.524-.407-1.029-1.02-1.029-.261 0-.522.1-.72.298l-4.701 4.702h2.883l3.259-3.26zm8.799 4.26c-2.484 0-4.5 2.015-4.5 4.5s2.016 4.5 4.5 4.5c2.482 0 4.5-2.015 4.5-4.5s-2.018-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1z"/></svg>'

    hamburguerDiv3.appendChild(hamburguerPrice);
    hamburguerDiv3.appendChild(hamburguerButton);

    hamburguerButton.addEventListener('click', (e) => {
        e.preventDefault();

        itemEscolhido = 0;

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
        modalTitle.innerHTML = hamburgueres[index].name;
        modalDescription.innerHTML = hamburgueres[index].description;
        modalPrice.innerHTML = 'R$' + hamburgueres[index].price.toFixed(2);
        modalImg.src = hamburgueres[index].img;

        quantidade.innerHTML = numeroQuantidade;

        // Atualiza a descrição para produtos que não são Massa, Açaí ou Cupuaçu
        let descricaoPersonalizada = document.querySelector('#produto-descricao');
        if (!descricaoPersonalizada) {
            descricaoPersonalizada = document.createElement('textarea');
            descricaoPersonalizada.id = 'produto-descricao';
            descricaoPersonalizada.placeholder = 'Observação: "Sem alface e tomate", por exemplo';

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

    function configurarAdicionais() {
        let adicionaisContainer = document.querySelector('#adicionais-container');

        // Limpa adicionais anteriores
        if (adicionaisContainer) {
            adicionaisContainer.remove();
        }

        adicionaisContainer = document.createElement('div');
        adicionaisContainer.id = 'adicionais-container';
        adicionaisContainer.classList.add('adicionais-selecao');

        const adicionaisLabel = document.createElement('h3');
        adicionaisLabel.innerText = 'Escolha até 2 adicionais (2,00 cada):';
        adicionaisContainer.appendChild(adicionaisLabel);

        const adicionaisButton = document.createElement('button');
        adicionaisButton.innerText = 'Ver mais adicionais';
        adicionaisButton.classList.add('ver-mais-adicionais');
        adicionaisContainer.appendChild(adicionaisButton);

        const adicionaisList = document.createElement('div');
        adicionaisList.classList.add('adicionais-list');
        adicionaisList.style.display = 'none';

        const adicionais = ['Calabresa', 'Bacon em Tiras', 'Presunto Ralado', 'Frango Desfiado', 'Ovo', 'Hamburguer', 'Queijo'];
        adicionais.forEach(adicional => {
            const adicionalWrapper = document.createElement('div'); // Usei um div como wrapper
            const adicionalCheckbox = document.createElement('input');
            adicionalCheckbox.type = 'checkbox';
            adicionalCheckbox.name = 'adicional';
            adicionalCheckbox.value = adicional;
            adicionalCheckbox.classList.add('adicional-checkbox');

            const adicionalLabel = document.createElement('span');
            adicionalLabel.style.marginLeft = '8px'; // Adiciona espaço entre o checkbox e o texto
            adicionalLabel.innerText = adicional;

            adicionalWrapper.appendChild(adicionalCheckbox);
            adicionalWrapper.appendChild(adicionalLabel);

            // Estilização para alinhar os itens
            adicionalWrapper.style.display = 'flex';
            adicionalWrapper.style.alignItems = 'center'; // Alinha o checkbox e o texto verticalmente
            adicionalWrapper.style.marginBottom = '8px'; // Espaçamento entre os itens

            adicionaisList.appendChild(adicionalWrapper);

            // Adiciona um evento de mudança para controlar a seleção
            adicionalCheckbox.addEventListener('change', () => {
                const checkedCheckboxes = document.querySelectorAll('input[name="adicional"]:checked');

                // Se mais de 2 forem selecionados
                if (checkedCheckboxes.length > 2) {
                    // Desmarca o último checkbox que foi marcado
                    adicionalCheckbox.checked = false;
                    // Alerta ao usuário
                    alert('Você pode selecionar no máximo 2 adicionais.');
                }

                // Atualiza o estado de habilitação dos checkboxes
                const allCheckboxes = document.querySelectorAll('input[name="adicional"]');
                if (checkedCheckboxes.length >= 2) {
                    allCheckboxes.forEach(checkbox => {
                        if (!checkbox.checked) {
                            checkbox.disabled = true;
                        }
                    });
                } else {
                    allCheckboxes.forEach(checkbox => {
                        checkbox.disabled = false;
                    });
                }
            });
        });

        adicionaisContainer.appendChild(adicionaisList);
        document.querySelector(".produto-informacoes-area1").appendChild(adicionaisContainer);

        adicionaisButton.addEventListener('click', () => {
            const isVisible = adicionaisList.style.display === 'block';
            adicionaisList.style.display = isVisible ? 'none' : 'block';
            adicionaisButton.innerText = isVisible ? 'Ver mais adicionais' : 'Ver menos adicionais';
        });
    }

    hamburguerList.appendChild(hamburguerDiv);

});