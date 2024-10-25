let marginsorvete = 0; //Margin para movimentar o carrosel de sorvete

// CARROSEL DELICIAS GELADAS ///////////////////////////////////////////////////////////////////////////////////////////

document.querySelector('.sorvete-setaLeft-icone').addEventListener('click', () => {

    if (window.innerWidth > 460) {
        marginsorvete = marginsorvete + 340;
        if (marginsorvete > 0) {
            marginsorvete = 0;
        }

        document.querySelector('.sorvete-list').style.marginLeft = marginsorvete + 'px';
    }
    else {
        marginsorvete = marginsorvete + (window.innerWidth - 60);
        if (marginsorvete > 0) {
            marginsorvete = 0;
        }
        document.querySelector('.sorvete-list').style.marginLeft = marginsorvete + 'px';
    }
})

document.querySelector('.sorvete-setaRigth-icone').addEventListener('click', () => {
    if (window.innerWidth > 460) {
        let x = marginsorvete - 340;
        if ((window.innerWidth - 2280) > x) {
            x = 0;
        }
        marginsorvete = x;
        document.querySelector('.sorvete-list').style.marginLeft = marginsorvete + 'px';
    }
    else {
        marginsorvete = marginsorvete - (window.innerWidth - 60);
        let x = -(window.innerWidth * 2) - 10;
        if (marginsorvete < x) {
            marginsorvete = 0;
        }
        document.querySelector('.sorvete-list').style.marginLeft = marginsorvete + 'px';
    }
});

sorvetes.map((item, index) => {
    const sorveteList = document.querySelector('.sorvete-list');
    const sorveteDiv = document.createElement("div");
    sorveteDiv.classList.add("sorvete-item");
    sorveteList.appendChild(sorveteDiv);

    const sorveteDiv1 = document.createElement("div");
    sorveteDiv1.classList.add("sorvete-item-area1");
    sorveteDiv.appendChild(sorveteDiv1);
    const sorveteImg = document.createElement("img");
    sorveteImg.src = item.img;
    sorveteDiv1.appendChild(sorveteImg);

    const sorveteDiv2 = document.createElement("div");
    sorveteDiv2.classList.add("sorvete-item-area2");
    sorveteDiv.appendChild(sorveteDiv2);
    const sorveteTitle = document.createElement("h2");
    const sorveteDescriptopn = document.createElement("p");
    sorveteTitle.innerText = item.name;
    sorveteDescriptopn.innerHTML = item.description;
    sorveteDiv2.appendChild(sorveteTitle);
    sorveteDiv2.appendChild(sorveteDescriptopn);

    const sorveteDiv3 = document.createElement("div");
    sorveteDiv3.classList.add("sorvete-item-area3");
    sorveteDiv.appendChild(sorveteDiv3);
    const sorvetePrice = document.createElement("h2");
    const sorveteButton = document.createElement("div");
    sorveteButton.classList.add("sorvete-plus");
    sorveteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path d="M13.299 3.74c-.207-.206-.299-.461-.299-.711 0-.524.407-1.029 1.02-1.029.262 0 .522.1.721.298l3.783 3.783c-.771.117-1.5.363-2.158.726l-3.067-3.067zm3.92 14.84l-.571 1.42h-9.296l-3.597-8.961-.016-.039h9.441c.171-.721.459-1.395.848-2h-14.028v2h.643c.535 0 1.021.304 1.256.784l4.101 10.216h12l1.21-3.015c-.698-.03-1.367-.171-1.991-.405zm-6.518-14.84c.207-.206.299-.461.299-.711 0-.524-.407-1.029-1.02-1.029-.261 0-.522.1-.72.298l-4.701 4.702h2.883l3.259-3.26zm8.799 4.26c-2.484 0-4.5 2.015-4.5 4.5s2.016 4.5 4.5 4.5c2.482 0 4.5-2.015 4.5-4.5s-2.018-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1z"/></svg>';

    sorveteDiv3.appendChild(sorvetePrice);
    sorveteDiv3.appendChild(sorveteButton);
    sorveteButton.addEventListener('click', (e) => {

        e.preventDefault(); // Impede a ação padrão do botão

        itemEscolhido = 1;

        if (itemEscolhido === 1) { // Quando o item é um sorvete
            // Configura sabores e acompanhamentos apenas para sorvetes
            configurarSabores(sorvetes[index].name);
            configurarAcompanhamentos();
        } else {
            // Se não for um sorvete, remove qualquer elemento relacionado a tamanhos
            tamanhoContainer.innerHTML = ''; // Limpa os tamanhos anteriores

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

        // Mostra a modal
        modalTamanho.style.display = 'flex';
        produtoModal.classList.add("show");

        let numeroQuantidade = 1; // Define a quantidade inicial
        const modalTitle = document.querySelector(".produto-informacoes-area1 h2");
        const modalDescription = document.querySelector(".produto-informacoes-area1 p");
        const modalPrice = document.querySelector(".produto-preco h2");
        const buttonCancel = document.querySelector('.cancela');
        const buttonLess = document.querySelector('.quantidade-less');
        const buttonPlus = document.querySelector('.quantidade-plus');
        const modalImg = document.querySelector('.produto-img img');
        const quantidade = document.querySelector('.produto-quantidade .quantidade');

        // Carrega os dados do sorvete selecionado
        modalTitle.innerHTML = sorvetes[index].name; // Título do sorvete
        modalDescription.innerHTML = sorvetes[index].description; // Descrição do sorvete
        modalImg.src = sorvetes[index].img; // Imagem do sorvete
        quantidade.innerHTML = numeroQuantidade; // Quantidade

        // Atualiza a descrição para produtos que não são Massa, Açaí ou Cupuaçu
        let descricaoPersonalizada = document.querySelector('#produto-descricao');
        if (!descricaoPersonalizada) {
            descricaoPersonalizada = document.createElement('textarea');
            descricaoPersonalizada.id = 'produto-descricao';
            descricaoPersonalizada.placeholder = 'Observação: "Leite condensado embaixo", por exemplo';

            const descricaoPersonalizadaContainer = document.createElement('div');
            descricaoPersonalizadaContainer.classList.add('descricao-personalizada');
            descricaoPersonalizadaContainer.appendChild(descricaoPersonalizada);

            const modalInfoArea = document.querySelector(".produto-informacoes-area1");
            modalInfoArea.appendChild(descricaoPersonalizadaContainer);
        } else {
            descricaoPersonalizada.value = ''; // Limpa o conteúdo da descrição ao abrir a modal
        }

        const tamanhoContainer = document.querySelector('.tamanhos-opcoes'); // Certifique-se de que esse elemento exista no seu HTML 
        tamanhoContainer.innerHTML = ''; // Limpa os tamanhos anteriores
        // Adiciona os tamanhos e preços
        sorvetes[index].price.forEach((tamanho, i) => {
            const tamanhoDiv = document.createElement('div');
            tamanhoDiv.classList.add('tamanho-item');

            // Alteração: o input deve estar fora do label para funcionar corretamente
            tamanhoDiv.innerHTML = `
        <label for="tamanho-${i}">
            <input type="radio" id="tamanho-${i}" name="tamanho" value="${tamanho.value}" data-tamanho="${tamanho.size}">
            <span>${tamanho.size} - R$${tamanho.value.toFixed(2)}</span>
        </label>
    `;

            tamanhoContainer.appendChild(tamanhoDiv);

            // Atualiza o preço na seleção de tamanho
            const radio = tamanhoDiv.querySelector('input');
            radio.addEventListener('change', () => {
                modalPrice.innerHTML = 'R$' + tamanho.value.toFixed(2); // Preço do sorvete
            });

            // Seleciona o primeiro valor como padrão
            if (i === 0) {
                radio.checked = true;
                modalPrice.innerHTML = 'R$' + tamanho.value.toFixed(2); // Preço do sorvete
            }
        });

        // Remover event listeners antigos antes de adicionar os novos
        buttonLess.removeEventListener('click', handleButtonLess);
        buttonPlus.removeEventListener('click', handleButtonPlus);
        buttonCancel.removeEventListener('click', handleButtonCancel);

        // Adicionar novos event listeners
        buttonLess.addEventListener('click', handleButtonLess);
        buttonPlus.addEventListener('click', handleButtonPlus);
        buttonCancel.addEventListener('click', () => {
            produtoModal.classList.remove("show"); // Fecha a modal
            modalTamanho.style.display = 'none'; // Esconde o modal de tamanho
        });

        // Configurar os sabores e acompanhamentos ao abrir a modal
        configurarSabores(sorvetes[index].name);
        configurarAcompanhamentos();
    });

    // Funções de manipulação de eventos definidas fora do escopo para referência correta
    function handleButtonLess() {
        let numeroQuantidade = parseInt(document.querySelector('.produto-quantidade .quantidade').innerText);
        numeroQuantidade = numeroQuantidade > 1 ? numeroQuantidade - 1 : 1;
        document.querySelector('.produto-quantidade .quantidade').innerText = numeroQuantidade;
    }

    function handleButtonPlus() {
        let numeroQuantidade = parseInt(document.querySelector('.produto-quantidade .quantidade').innerText);
        numeroQuantidade++;
        document.querySelector('.produto-quantidade .quantidade').innerText = numeroQuantidade;
    }

    function handleButtonCancel() {
        produtoModal.classList.remove("show");
    }

    function configurarSabores(produtoNome) {

        if (!produtoNome.includes('Massa') && !produtoNome.includes('Açaí') && !produtoNome.includes('Cupuaçu')) {
            return; // Retorna se não for Massa, Açaí ou Cupuaçu
        }
        let saboresContainer = document.querySelector('#sabores-container');

        // Limpa sabores anteriores
        if (saboresContainer) {
            saboresContainer.remove();
        }

        saboresContainer = document.createElement('div');
        saboresContainer.id = 'sabores-container';
        saboresContainer.classList.add('sabores-selecao');

        // Atualiza a mensagem de acordo com o tipo de produto
        const isAçaiOuCupuaçu = produtoNome.includes('Açaí') || produtoNome.includes('Cupuaçu');
        const saboresLabel = document.createElement('h3');
        saboresLabel.innerText = isAçaiOuCupuaçu ? 'Escolha até 1 sabor:' : 'Escolha até 2 sabores:';
        saboresContainer.appendChild(saboresLabel);

        const saboresButton = document.createElement('button');
        saboresButton.innerText = 'Ver mais sabores';
        saboresButton.classList.add('ver-mais-sabores');
        saboresContainer.appendChild(saboresButton);

        const saboresList = document.createElement('div');
        saboresList.classList.add('sabores-list');
        saboresList.style.display = 'none';

        const sabores = ['Lacta', 'Brigadeiro', 'Morango', 'Beijinho', 'Milho Verde', 'Paçoca', 'Lambada', 'Creme', 'Cupuaçu', 'Açaí'];
        sabores.forEach(sabor => {
            const saborWrapper = document.createElement('div'); // Usei um div como wrapper
            const saborCheckbox = document.createElement('input');
            saborCheckbox.type = 'checkbox';
            saborCheckbox.name = 'sabor';
            saborCheckbox.value = sabor;
            saborCheckbox.classList.add('sabor-checkbox');

            const saborLabel = document.createElement('span');
            saborLabel.style.marginLeft = '8px'; // Adiciona espaço entre o checkbox e o texto
            saborLabel.innerText = sabor;

            saborWrapper.appendChild(saborCheckbox);
            saborWrapper.appendChild(saborLabel);

            // Estilização para alinhar os itens
            saborWrapper.style.display = 'flex';
            saborWrapper.style.alignItems = 'center'; // Alinha o checkbox e o texto verticalmente
            saborWrapper.style.marginBottom = '8px'; // Espaçamento entre os itens

            saboresList.appendChild(saborWrapper);

            saborCheckbox.addEventListener('change', () => {
                const checkedSabores = document.querySelectorAll('.sabor-checkbox:checked');

                if (isAçaiOuCupuaçu) {
                    if (checkedSabores.length > 1) {
                        saborCheckbox.checked = false;
                        alert('Para produtos de Açaí ou Cupuaçu, você só pode escolher 1 sabor.');
                    }
                } else {
                    if (checkedSabores.length > 2) {
                        saborCheckbox.checked = false;
                        alert('Você pode selecionar no máximo 2 sabores.');
                    }
                }
            });
        });

        saboresContainer.appendChild(saboresList);
        document.querySelector(".produto-informacoes-area1").appendChild(saboresContainer);

        saboresButton.addEventListener('click', () => {
            const isVisible = saboresList.style.display === 'block';
            saboresList.style.display = isVisible ? 'none' : 'block';
            saboresButton.innerText = isVisible ? 'Ver mais sabores' : 'Ver menos sabores';
        });
    }

    function configurarAcompanhamentos() {
        let acompanhamentosContainer = document.querySelector('#acompanhamentos-container');

        // Limpa acompanhamentos anteriores
        if (acompanhamentosContainer) {
            acompanhamentosContainer.remove();
        }

        acompanhamentosContainer = document.createElement('div');
        acompanhamentosContainer.id = 'acompanhamentos-container';
        acompanhamentosContainer.classList.add('acompanhamentos-selecao');

        const acompanhamentosLabel = document.createElement('h3');
        acompanhamentosLabel.innerText = 'Escolha até 2 acompanhamentos (1,00 cada):';
        acompanhamentosContainer.appendChild(acompanhamentosLabel);

        const acompanhamentosButton = document.createElement('button');
        acompanhamentosButton.innerText = 'Ver mais acompanhamentos';
        acompanhamentosButton.classList.add('ver-mais-acompanhamentos');
        acompanhamentosContainer.appendChild(acompanhamentosButton);

        const acompanhamentosList = document.createElement('div');
        acompanhamentosList.classList.add('acompanhamentos-list');
        acompanhamentosList.style.display = 'none';

        const acompanhamentos = ['M&M', 'Sucrilho', 'Granola', 'Amendoim', 'Chocolate', 'Leite em Pó', 'Granulado'];
        acompanhamentos.forEach(acompanhamento => {
            const acompanhamentoWrapper = document.createElement('div'); // Usei um div como wrapper
            const acompanhamentoCheckbox = document.createElement('input');
            acompanhamentoCheckbox.type = 'checkbox';
            acompanhamentoCheckbox.name = 'acompanhamento';
            acompanhamentoCheckbox.value = acompanhamento;
            acompanhamentoCheckbox.classList.add('acompanhamento-checkbox');

            const acompanhamentoLabel = document.createElement('span');
            acompanhamentoLabel.style.marginLeft = '8px'; // Adiciona espaço entre o checkbox e o texto
            acompanhamentoLabel.innerText = acompanhamento;

            acompanhamentoWrapper.appendChild(acompanhamentoCheckbox);
            acompanhamentoWrapper.appendChild(acompanhamentoLabel);

            // Estilização para alinhar os itens
            acompanhamentoWrapper.style.display = 'flex';
            acompanhamentoWrapper.style.alignItems = 'center'; // Alinha o checkbox e o texto verticalmente
            acompanhamentoWrapper.style.marginBottom = '8px'; // Espaçamento entre os itens

            acompanhamentosList.appendChild(acompanhamentoWrapper);

            // Adiciona um evento de mudança para controlar a seleção
            acompanhamentoCheckbox.addEventListener('change', () => {
                const checkedCheckboxes = document.querySelectorAll('input[name="acompanhamento"]:checked');

                // Se mais de 2 forem selecionados
                if (checkedCheckboxes.length > 2) {
                    // Desmarca o último checkbox que foi marcado
                    acompanhamentoCheckbox.checked = false;
                    // Alerta ao usuário
                    alert('Você pode selecionar no máximo 2 acompanhamentos.');
                }

                // Atualiza o estado de habilitação dos checkboxes
                const allCheckboxes = document.querySelectorAll('input[name="acompanhamento"]');
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

        acompanhamentosContainer.appendChild(acompanhamentosList);
        document.querySelector(".produto-informacoes-area1").appendChild(acompanhamentosContainer);

        acompanhamentosButton.addEventListener('click', () => {
            const isVisible = acompanhamentosList.style.display === 'block';
            acompanhamentosList.style.display = isVisible ? 'none' : 'block';
            acompanhamentosButton.innerText = isVisible ? 'Ver mais acompanhamentos' : 'Ver menos acompanhamentos';
        });
    }
});