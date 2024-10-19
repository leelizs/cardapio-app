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
    
    batatasButton.addEventListener('click', (e) => {
        e.preventDefault();

        // Limpa dados anteriores da modal
        resetModalFields();

        // Define a modal atual
        produtoModal.classList.add("show");
        
        // Atribui informações do item à modal
        setModalData(item, index);
    });

    batatasList.appendChild(batatasDiv);
});

// Função para definir os dados da modal
function setModalData(item, index) {
    const modalTitle = document.querySelector(".produto-informacoes-area1 h2");
    const modalDescription = document.querySelector(".produto-informacoes-area1 p");
    const modalPrice = document.querySelector(".produto-preco h2");
    const buttonCancel = document.querySelector('.cancela');
    const buttonLess = document.querySelector('.quantidade-less');
    const buttonPlus = document.querySelector('.quantidade-plus');
    const modalImg = document.querySelector('.produto-img img');
    const quantidade = document.querySelector('.produto-quantidade .quantidade');

    modalTitle.innerHTML = item.name;
    modalDescription.innerHTML = item.description;
    modalPrice.innerHTML = 'R$' + item.price.toFixed(2);
    modalImg.src = item.img;
    quantidade.innerHTML = '1';

    // Adicionar event listeners
    addModalEventListeners(buttonLess, buttonPlus, buttonCancel);
}

// Função para adicionar event listeners à modal
function addModalEventListeners(buttonLess, buttonPlus, buttonCancel) {
    buttonLess.removeEventListener('click', handleButtonLess);
    buttonPlus.removeEventListener('click', handleButtonPlus);
    buttonCancel.removeEventListener('click', handleButtonCancel);

    buttonLess.addEventListener('click', handleButtonLess);
    buttonPlus.addEventListener('click', handleButtonPlus);
    buttonCancel.addEventListener('click', handleButtonCancel);
}

// Funções de manipulação de eventos
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

// Função para resetar os campos da modal
function resetModalFields() {
    // Limpar campos de descrição
    const descricaoInput = document.querySelector('#produto-descricao');
    if (descricaoInput) {
        descricaoInput.value = ''; // Limpa a descrição
    }

    // Resetar a quantidade
    document.querySelector('.produto-quantidade .quantidade').innerText = '1'; // Ou o valor padrão desejado
}
