let produtosCarrinho = []; //Array que guarda os pedidos

const produtoModal = document.querySelector('.produto-modal');
const iconeCarrinho = document.querySelector('#header-carrinho');
const modalCarrinho = document.querySelector('.modal-carrinho');
const carrinhoQuantidade = document.querySelector('#header-carrinho button span');
const carrinhoProdutos = document.querySelector('.area-carrinho-pedidos');
const todosButaoAdd = document.querySelectorAll('#add');
const setaFecharCarrinho = document.querySelector('.carrinho-seta button');
const botaoAddMaisItens = document.querySelector('.area-adicionar-mais-itens button');
const modalTamanho = document.querySelector('.produto-sorvete-tamanho');

let keyCarrinho = 0; //variavel que guarda o index da lista do carrinho
let keyEscolhido;  //variavel que guarda qual item voce clicou para comprar
let itemEscolhido; //variavel que guarda o tipo de lanche escolhido, sorvete, hamburguer etc...

let marginHamburguer = 0; //Margin para movimentar o carrosel de hamburguer
let marginsorvete = 0; //Margin para movimentar o carrosel de sorvete
let marginPastel = 0; //Margin para movimentar o carrosel de sorvete
let marginpasteisEspeciais = 0; //Margin para movimentar o carrosel de sorvete
let marginbebidas = 0; //Margin para movimentar o carrosel de sorvete
let marginbatatas = 0; //Margin para movimentar o carrosel de sorvete
let marginsalgados = 0; //Margin para movimentar o carrosel de sorvete

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
        if ((window.innerWidth - 4800) > x) {
            x = 0;
        }
        marginsorvete = x;
        document.querySelector('.sorvete-list').style.marginLeft = marginsorvete + 'px';
    }
    else {
        marginsorvete = marginsorvete - (window.innerWidth - 60);
        let x = -(window.innerWidth * 9) - 10;
        if (marginsorvete < x) {
            marginsorvete = 0;
        }
        document.querySelector('.sorvete-list').style.marginLeft = marginsorvete + 'px';
    }
});

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
        keyEscolhido = index;
        itemEscolhido = 0;

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
        modalTitle.innerHTML = hamburgueres[index].name;
        modalDescription.innerHTML = hamburgueres[index].description;
        modalPrice.innerHTML = 'R$' + hamburgueres[index].price.toFixed(2);
        modalImg.src = hamburgueres[index].img;

        quantidade.innerHTML = numeroQuantidade;

        // Verifica se o campo de descrição personalizada já existe
        let descricaoPersonalizada = document.querySelector('#produto-descricao');
        if (!descricaoPersonalizada) {
            descricaoPersonalizada = document.createElement('textarea');
            descricaoPersonalizada.id = 'produto-descricao';
            descricaoPersonalizada.placeholder = 'Observação: ';
            const descricaoPersonalizadaContainer = document.createElement('div');
            descricaoPersonalizadaContainer.classList.add('descricao-personalizada');
            descricaoPersonalizadaContainer.appendChild(descricaoPersonalizada);

            // Adicionar o campo de descrição ao modal
            const modalInfoArea = document.querySelector(".produto-informacoes-area1");
            modalInfoArea.appendChild(descricaoPersonalizadaContainer);
        }

        // Limpa o campo de descrição ao abrir a modal
        descricaoPersonalizada.value = ''; // Remova essa linha se quiser manter o texto ao abrir a modal novamente.

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

    hamburguerList.appendChild(hamburguerDiv);


});

// MAPEANDO LISTA DE sorvete ///////////////////////////////////////////////////////////////////////////////////////////

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
    sorveteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path d="M13.299 3.74c-.207-.206-.299-.461-.299-.711 0-.524.407-1.029 1.02-1.029.262 0 .522.1.721.298l3.783 3.783c-.771.117-1.5.363-2.158.726l-3.067-3.067zm3.92 14.84l-.571 1.42h-9.296l-3.597-8.961-.016-.039h9.441c.171-.721.459-1.395.848-2h-14.028v2h.643c.535 0 1.021.304 1.256.784l4.101 10.216h12l1.21-3.015c-.698-.03-1.367-.171-1.991-.405zm-6.518-14.84c.207-.206.299-.461.299-.711 0-.524-.407-1.029-1.02-1.029-.261 0-.522.1-.72.298l-4.701 4.702h2.883l3.259-3.26zm8.799 4.26c-2.484 0-4.5 2.015-4.5 4.5s2.016 4.5 4.5 4.5c2.482 0 4.5-2.015 4.5-4.5s-2.018-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1z"/></svg>'

    sorveteDiv3.appendChild(sorvetePrice);
    sorveteDiv3.appendChild(sorveteButton);
    sorveteButton.addEventListener('click', (e) => {
        keyEscolhido = index;
        itemEscolhido = 1;

        modalTamanho.style.display = 'flex';
        e.preventDefault();

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

        modalTitle.innerHTML = sorvetes[index].name;
        modalDescription.innerHTML = sorvetes[index].description;
        modalPrice.innerHTML = 'R$' + sorvetes[index].price.toFixed(2);
        modalImg.src = sorvetes[index].img;
        quantidade.innerHTML = numeroQuantidade;

        // Verifica se o campo de descrição personalizada já existe
        let descricaoPersonalizada = document.querySelector('#produto-descricao');
        if (!descricaoPersonalizada) {
            descricaoPersonalizada = document.createElement('textarea');
            descricaoPersonalizada.id = 'produto-descricao';
            descricaoPersonalizada.placeholder = 'Observação: ';
            const descricaoPersonalizadaContainer = document.createElement('div');
            descricaoPersonalizadaContainer.classList.add('descricao-personalizada');
            descricaoPersonalizadaContainer.appendChild(descricaoPersonalizada);

            // Adicionar o campo de descrição ao modal
            const modalInfoArea = document.querySelector(".produto-informacoes-area1");
            modalInfoArea.appendChild(descricaoPersonalizadaContainer);
        }

        // Limpa o campo de descrição ao abrir a modal
        descricaoPersonalizada.value = ''; // Remova essa linha se quiser manter o texto ao abrir a modal novamente.

        buttonLess.addEventListener('click', () => { //Botão de tirar 1 item do modal 1
            numeroQuantidade = numeroQuantidade - 1;
            if (numeroQuantidade <= 0) {
                numeroQuantidade = 1
            }
            quantidade.innerHTML = numeroQuantidade;
        });

        buttonPlus.addEventListener('click', () => { //Botão de adicionar 1 item do modal 1
            numeroQuantidade = numeroQuantidade + 1;
            quantidade.innerHTML = numeroQuantidade;
        });


        buttonCancel.addEventListener('click', () => { //Botão cancelar do modal 1
            produtoModal.classList.remove("show");
        });


    });

    sorveteList.appendChild(sorveteDiv);
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
        keyEscolhido = index;
        itemEscolhido = 2;

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
        modalTitle.innerHTML = pasteis[index].name;
        modalDescription.innerHTML = pasteis[index].description;
        modalPrice.innerHTML = 'R$' + pasteis[index].price.toFixed(2);
        modalImg.src = pasteis[index].img;

        quantidade.innerHTML = numeroQuantidade;

        // Verifica se o campo de descrição personalizada já existe
        let descricaoPersonalizada = document.querySelector('#produto-descricao');
        if (!descricaoPersonalizada) {
            descricaoPersonalizada = document.createElement('textarea');
            descricaoPersonalizada.id = 'produto-descricao';
            descricaoPersonalizada.placeholder = 'Observação: ';
            const descricaoPersonalizadaContainer = document.createElement('div');
            descricaoPersonalizadaContainer.classList.add('descricao-personalizada');
            descricaoPersonalizadaContainer.appendChild(descricaoPersonalizada);

            // Adicionar o campo de descrição ao modal
            const modalInfoArea = document.querySelector(".produto-informacoes-area1");
            modalInfoArea.appendChild(descricaoPersonalizadaContainer);
        }

        // Limpa o campo de descrição ao abrir a modal
        descricaoPersonalizada.value = ''; // Remova essa linha se quiser manter o texto ao abrir a modal novamente.

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

// MAPEANDO LISTA DE Pasteis Especiais ///////////////////////////////////////////////////////////////////////////////////////////

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
            descricaoPersonalizada = document.createElement('textarea');
            descricaoPersonalizada.id = 'produto-descricao';
            descricaoPersonalizada.placeholder = 'Observação: ';
            const descricaoPersonalizadaContainer = document.createElement('div');
            descricaoPersonalizadaContainer.classList.add('descricao-personalizada');
            descricaoPersonalizadaContainer.appendChild(descricaoPersonalizada);

            // Adicionar o campo de descrição ao modal
            const modalInfoArea = document.querySelector(".produto-informacoes-area1");
            modalInfoArea.appendChild(descricaoPersonalizadaContainer);
        }

        // Limpa o campo de descrição ao abrir a modal
        descricaoPersonalizada.value = ''; // Remova essa linha se quiser manter o texto ao abrir a modal novamente.

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

// MAPEANDO LISTA DE bebidas ///////////////////////////////////////////////////////////////////////////////////////////

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

        // Verifica se o campo de descrição personalizada já existe
        let descricaoPersonalizada = document.querySelector('#produto-descricao');
        if (!descricaoPersonalizada) {
            descricaoPersonalizada = document.createElement('textarea');
            descricaoPersonalizada.id = 'produto-descricao';
            descricaoPersonalizada.placeholder = 'Observação: ';
            const descricaoPersonalizadaContainer = document.createElement('div');
            descricaoPersonalizadaContainer.classList.add('descricao-personalizada');
            descricaoPersonalizadaContainer.appendChild(descricaoPersonalizada);

            // Adicionar o campo de descrição ao modal
            const modalInfoArea = document.querySelector(".produto-informacoes-area1");
            modalInfoArea.appendChild(descricaoPersonalizadaContainer);
        }

        // Limpa o campo de descrição ao abrir a modal
        descricaoPersonalizada.value = ''; // Remova essa linha se quiser manter o texto ao abrir a modal novamente.

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

// MAPEANDO LISTA DE batatas ///////////////////////////////////////////////////////////////////////////////////////////

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
    batatasButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path d="M13.299 3.74c-.207-.206-.299-.461-.299-.711 0-.524.407-1.029 1.02-1.029.262 0 .522.1.721.298l3.783 3.783c-.771.117-1.5.363-2.158.726l-3.067-3.067zm3.92 14.84l-.571 1.42h-9.296l-3.597-8.961-.016-.039h9.441c.171-.721.459-1.395.848-2h-14.028v2h.643c.535 0 1.021.304 1.256.784l4.101 10.216h12l1.21-3.015c-.698-.03-1.367-.171-1.991-.405zm-6.518-14.84c.207-.206.299-.461.299-.711 0-.524-.407-1.029-1.02-1.029-.261 0-.522.1-.72.298l-4.701 4.702h2.883l3.259-3.26zm8.799 4.26c-2.484 0-4.5 2.015-4.5 4.5s2.016 4.5 4.5 4.5c2.482 0 4.5-2.015 4.5-4.5s-2.018-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1z"/></svg>'

    batatasDiv3.appendChild(batatasPrice);
    batatasDiv3.appendChild(batatasButton);
    batatasButton.addEventListener('click', (e) => {
        keyEscolhido = index;
        itemEscolhido = 5;

        modalTamanho.style.display = 'none';
        e.preventDefault();

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

        modalTitle.innerHTML = batatas[index].name;
        modalDescription.innerHTML = batatas[index].description;
        modalPrice.innerHTML = 'R$' + batatas[index].price.toFixed(2);
        modalImg.src = batatas[index].img;
        quantidade.innerHTML = numeroQuantidade;

        // Verifica se o campo de descrição personalizada já existe
        let descricaoPersonalizada = document.querySelector('#produto-descricao');
        if (!descricaoPersonalizada) {
            descricaoPersonalizada = document.createElement('textarea');
            descricaoPersonalizada.id = 'produto-descricao';
            descricaoPersonalizada.placeholder = 'Observação: ';
            const descricaoPersonalizadaContainer = document.createElement('div');
            descricaoPersonalizadaContainer.classList.add('descricao-personalizada');
            descricaoPersonalizadaContainer.appendChild(descricaoPersonalizada);

            // Adicionar o campo de descrição ao modal
            const modalInfoArea = document.querySelector(".produto-informacoes-area1");
            modalInfoArea.appendChild(descricaoPersonalizadaContainer);
        }

        // Limpa o campo de descrição ao abrir a modal
        descricaoPersonalizada.value = ''; // Remova essa linha se quiser manter o texto ao abrir a modal novamente.

        buttonLess.addEventListener('click', () => { //Botão de tirar 1 item do modal 1
            numeroQuantidade = numeroQuantidade - 1;
            if (numeroQuantidade <= 0) {
                numeroQuantidade = 1
            }
            quantidade.innerHTML = numeroQuantidade;
        });

        buttonPlus.addEventListener('click', () => { //Botão de adicionar 1 item do modal 1
            numeroQuantidade = numeroQuantidade + 1;
            quantidade.innerHTML = numeroQuantidade;
        });


        buttonCancel.addEventListener('click', () => { //Botão cancelar do modal 1
            produtoModal.classList.remove("show");
        });


    });

    batatasList.appendChild(batatasDiv);
});

// MAPEANDO LISTA DE salgados ///////////////////////////////////////////////////////////////////////////////////////////

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
        keyEscolhido = index;
        itemEscolhido = 6;

        modalTamanho.style.display = 'none';
        e.preventDefault();

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
            descricaoPersonalizada = document.createElement('textarea');
            descricaoPersonalizada.id = 'produto-descricao';
            descricaoPersonalizada.placeholder = 'Observação: ';
            const descricaoPersonalizadaContainer = document.createElement('div');
            descricaoPersonalizadaContainer.classList.add('descricao-personalizada');
            descricaoPersonalizadaContainer.appendChild(descricaoPersonalizada);

            // Adicionar o campo de descrição ao modal
            const modalInfoArea = document.querySelector(".produto-informacoes-area1");
            modalInfoArea.appendChild(descricaoPersonalizadaContainer);
        }

        // Limpa o campo de descrição ao abrir a modal
        descricaoPersonalizada.value = ''; // Remova essa linha se quiser manter o texto ao abrir a modal novamente.

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


//EVENTOS ///////////////////////////////////////////////////////////////////////////////////////////////////

iconeCarrinho.addEventListener('click', () => { //Botao do carrinho para mostrar os pedidos
    mostrarPedidos();
});

todosButaoAdd.forEach((item) => { //Botão adicionar o item no carrinho
    item.addEventListener('click', () => {
        addCarrinho(keyEscolhido, itemEscolhido);
        produtoModal.classList.remove("show");
        mostrarPedidos();
    });
});

setaFecharCarrinho.addEventListener('click', () => { //Botao da seta fechar o carrinho
    document.querySelector('.carrinho').style.animationName = 'slideout';
    setTimeout(() => {
        modalCarrinho.classList.remove("show");
    }, 500);
});

botaoAddMaisItens.addEventListener('click', () => { //Botão adicionar mais itens
    document.querySelector('.carrinho').style.animationName = 'slideout';
    setTimeout(() => {
        modalCarrinho.classList.remove("show");
    }, 500);

});

//FUNCOES ////////////////////////////////////////////////////////////////////////////////////////

function addCarrinho(keyEscolhido, itemEscolhido) {
    const compra = new Object();
    compra.quantidade = document.querySelector('.produto-quantidade .quantidade').innerText;
    
    // Obtenha a descrição do campo de texto
    const descricaoInput = document.querySelector('#produto-descricao');
    const descricaoPersonalizada = descricaoInput.value.trim(); // Remove espaços em branco

    // Verifica se a descrição não está vazia
    if (descricaoPersonalizada) {
        compra.descricao = descricaoPersonalizada; // Adiciona a descrição ao objeto de compra
    }

    if (itemEscolhido == 0) {
        compra.produto = hamburgueres[keyEscolhido];
        produtosCarrinho[keyCarrinho] = compra;
    }
    else if (itemEscolhido == 1) {
        compra.produto = sorvetes[keyEscolhido];
        produtosCarrinho[keyCarrinho] = compra;
    }
    else if (itemEscolhido == 2) {
        compra.produto = pasteis[keyEscolhido];
        produtosCarrinho[keyCarrinho] = compra;
    }
    else if (itemEscolhido == 3) {
        compra.produto = pasteisEspeciais[keyEscolhido];
        produtosCarrinho[keyCarrinho] = compra;
    }
    else if (itemEscolhido == 4) {
        compra.produto = bebidas[keyEscolhido];
        produtosCarrinho[keyCarrinho] = compra;
    }
    else if (itemEscolhido == 5) {
        compra.produto = batatas[keyEscolhido];
        produtosCarrinho[keyCarrinho] = compra;
    }
    else if (itemEscolhido == 6) {
        compra.produto = salgados[keyEscolhido];
        produtosCarrinho[keyCarrinho] = compra;
    }

    // Limpa o campo de descrição após adicionar ao carrinho
    descricaoInput.value = ''; 

    keyCarrinho = keyCarrinho + 1;

    produtoModal.classList.remove("show");
    contagemCarrinho();
}


function contagemCarrinho() { //funcao que conta quantos itens tem no carrinho
    let qt = 0;
    produtosCarrinho.forEach((item) => {
        qt = qt + parseInt(item.quantidade);

    })
    carrinhoQuantidade.innerText = qt;
}

function mostrarPedidos() {
    modalCarrinho.classList.add("show");
    document.querySelector('.carrinho').style.animationName = 'slidein';
    carrinhoProdutos.innerHTML = "";
    let totalItens = 0;

    produtosCarrinho.forEach((item, index) => {
        const carrinhoItem = document.createElement("div");
        const carrinhodiv1 = document.createElement("div");
        const carrinhoqt = document.createElement("h3");
        const carrinhoNome = document.createElement("h2");
        const carrinhodiv2 = document.createElement("div");
        const carrinhoPrice = document.createElement("h4");
        const carrinhoDescricao = document.createElement("p"); // Novo elemento para a descrição
        const valorReal = item.quantidade * item.produto.price.toFixed(2);
        const carrinhoButton = document.createElement("button");
        const carrinhoSpan = document.createElement("span");

        carrinhoItem.classList.add("carrinho-item");
        carrinhoqt.innerText = item.quantidade + "x";
        carrinhoNome.innerText = item.produto.type + "\n" + item.produto.name;
        carrinhoPrice.innerText = "R$" + valorReal.toFixed(2);
        carrinhoButton.classList.add("butao-delete");
        carrinhoSpan.classList.add("material-symbols-outlined");
        carrinhoSpan.innerText = "delete_forever";
        totalItens = totalItens + valorReal;

        // Exibe a descrição se estiver presente
        if (item.descricao) {
            carrinhoDescricao.innerText = item.descricao; // Adiciona a descrição ao carrinho
            carrinhoDescricao.style.fontStyle = "italic"; // Estilo em itálico para a descrição
            carrinhoDescricao.style.color = "#white"; // Cor da descrição
        }

        document.querySelector('.carrinho .total-itens h2').innerText = "R$" + totalItens.toFixed(2);
        carrinhoButton.appendChild(carrinhoSpan);
        carrinhodiv2.appendChild(carrinhoPrice);
        carrinhodiv2.appendChild(carrinhoButton);
        carrinhodiv1.appendChild(carrinhoqt);
        carrinhodiv1.appendChild(carrinhoNome);
        carrinhoItem.appendChild(carrinhodiv1);
        carrinhoItem.appendChild(carrinhodiv2);

        // Adiciona a descrição ao carrinho se estiver presente
        if (item.descricao) {
            carrinhoItem.appendChild(carrinhoDescricao);
        }

        carrinhoButton.addEventListener('click', () => {
            item.quantidade = item.quantidade - 1;
            mostrarPedidos();
            produtosCarrinho.splice(index, 1);
            mostrarPedidos();
            contagemCarrinho();
        });

        carrinhoProdutos.appendChild(carrinhoItem);
    });
}

const menuItens = document.querySelectorAll('#header-menu a[href^="#"]'); //pega todos a

menuItens.forEach(item => {
    item.addEventListener('click', scrollToIdOnClick);
});

const menuMobileItens = document.querySelectorAll('#header-menu-mobile a[href^="#"]'); //pega todos a

menuMobileItens.forEach(item => {
    item.addEventListener('click', scrollToIdOnClick);
});

function scrollToIdOnClick(event) { //esse event e passado cada a cada vez que e clicado, addeventlistener
    event.preventDefault();
    const element = event.target; // o event vem com varios atributos, o target pega so a tag "a"
    const id = element.getAttribute('href'); //pega so atributo href dentro do element
    const to = document.querySelector(id).offsetTop; //esse offsettop pega o top da section

    window.scroll({
        top: to - 160,
        behavior: "smooth",
    });
}

document.getElementById('botaoCaptura').addEventListener('click', function () {
    const botao = document.getElementById('botaoCaptura');
    const loader = document.getElementById('loader');
    const mensagemOrientacao = document.getElementById('mensagemOrientacao');
    const elementoParaCaptura = document.getElementById('conteudo');
    const containerControles = document.getElementById('controles');

    // Exibe o loader e desabilita o botão durante a captura
    loader.style.display = 'block';
    botao.disabled = true;
    mensagemOrientacao.style.opacity = '0';

    // Captura o conteúdo da página usando html2canvas
    html2canvas(elementoParaCaptura).then(canvas => {
        // Converte a imagem para uma URL base64
        const imagemDataURL = canvas.toDataURL('image/png');

        // Remove qualquer link de download existente
        const linkExistente = document.getElementById('linkDownload');
        if (linkExistente) {
            linkExistente.remove();
        }

        // Gera um nome de arquivo único com a data e hora atual
        const agora = new Date();
        const timestamp = `${agora.getFullYear()}${String(agora.getMonth() + 1).padStart(2, '0')}${String(agora.getDate()).padStart(2, '0')}_${String(agora.getHours()).padStart(2, '0')}${String(agora.getMinutes()).padStart(2, '0')}${String(agora.getSeconds()).padStart(2, '0')}`;
        const nomeArquivo = `captura_${timestamp}.png`;

        // Cria um link temporário para download da imagem
        const link = document.createElement('a');
        link.id = 'linkDownload';
        link.href = imagemDataURL;
        link.download = nomeArquivo;
        link.textContent = `(${nomeArquivo})`;
        containerControles.appendChild(link)

        // Exibe uma mensagem de orientação para o usuário
        mensagemOrientacao.style.opacity = '1';

        // Gera uma URL para enviar a mensagem pelo WhatsApp
        const numeroWhatsApp = '5511913421009'; // Substitua pelo número de telefone desejado
        const mensagemTexto = encodeURIComponent('Olá Denize! Este print é o meu pedido.');

        // Abre o WhatsApp com a mensagem de texto
        window.open(`https://wa.me/${numeroWhatsApp}?text=${mensagemTexto}`, '_blank');

        // Oculta o loader e reabilita o botão
        loader.style.display = 'none';
        botao.disabled = false;
    }).catch(() => {
        // Em caso de erro, exibe uma mensagem de falha
        mensagemOrientacao.textContent = 'Ocorreu um erro ao capturar a tela. Por favor, tente novamente.';
        mensagemOrientacao.style.opacity = '1';
        loader.style.display = 'none';
        botao.disabled = false;
    });
});