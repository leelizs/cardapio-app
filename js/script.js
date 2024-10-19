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

//EVENTOS ///////////////////////////////////////////////////////////////////////////////////////////////////

iconeCarrinho.addEventListener('click', () => { // Botão do carrinho para mostrar os pedidos
    //console.log('Ícone do carrinho clicado.');
    mostrarPedidos();
});

todosButaoAdd.forEach((item) => { // Botão adicionar o item no carrinho
    item.addEventListener('click', () => {
        addCarrinho(keyEscolhido, itemEscolhido);
        produtoModal.classList.remove("show");
        mostrarPedidos();
    });
});

setaFecharCarrinho.addEventListener('click', () => { // Botão da seta fechar o carrinho
    document.querySelector('.carrinho').style.animationName = 'slideout';
    setTimeout(() => {
        modalCarrinho.classList.remove("show");
    }, 500);
});

botaoAddMaisItens.addEventListener('click', () => { // Botão adicionar mais itens
    document.querySelector('.carrinho').style.animationName = 'slideout';
    setTimeout(() => {
        modalCarrinho.classList.remove("show");
    }, 500);
});

// FUNÇÕES ////////////////////////////////////////////////////////////////////////////////////////

let total = "------"; // Inicialização do total do carrinho

function addCarrinho(keyEscolhido, itemEscolhido) {
    const compra = new Object();

    // Verifique se o elemento existe antes de acessar o valor
    const quantidadeElemento = document.querySelector('.produto-quantidade .quantidade');
    if (quantidadeElemento) {
        compra.quantidade = quantidadeElemento.innerText; // Captura a quantidade escolhida
    } else {
        console.error('Elemento de quantidade não encontrado');
        return; // Saia da função se o elemento não for encontrado
    }

    // Verifique se a descrição está sendo capturada corretamente
    const descricaoInput = document.querySelector('#produto-descricao');
    const descricaoPersonalizada = descricaoInput ? descricaoInput.value.trim() : '';

    // Verifica se a descrição não está vazia
    if (descricaoPersonalizada) {
        compra.descricao = descricaoPersonalizada; // Adiciona a descrição ao objeto de compra
    }

    // Adiciona o produto ao carrinho com base no itemEscolhido
    switch (itemEscolhido) {
        case 0:
            compra.produto = hamburgueres[keyEscolhido];
            break;
        case 1:
            compra.produto = sorvetes[keyEscolhido];
            break;
        case 2:
            compra.produto = pasteis[keyEscolhido];
            break;
        case 3:
            compra.produto = pasteisEspeciais[keyEscolhido];
            break;
        case 4:
            compra.produto = bebidas[keyEscolhido];
            break;
        case 5:
            compra.produto = batatas[keyEscolhido];
            break;
        case 6:
            compra.produto = salgados[keyEscolhido];
            break;
        default:
            console.error('Produto não reconhecido');
            return;
    }

    // Verifique se a propriedade produto foi definida
    if (!compra.produto) {
        console.error('Produto não foi definido corretamente');
        return; // Saia da função se o produto não for encontrado
    }

    // Inicializa as propriedades de sabores e acompanhamentos
    compra.sabores = [];
    compra.acompanhamentos = [];
    compra.precoAcompanhamentos = 0;

    // Captura os sabores e acompanhamentos apenas se for um sorvete
    if (itemEscolhido === 1) { // Se for sorvete
        const saboresSelecionados = Array.from(document.querySelectorAll('.sabor-checkbox:checked')).map(cb => cb.value);
        const acompanhamentosSelecionados = Array.from(document.querySelectorAll('.acompanhamento-checkbox:checked')).map(cb => cb.value);

        if (saboresSelecionados.length > 0) {
            compra.sabores = saboresSelecionados; // Adiciona os sabores selecionados
        }
        if (acompanhamentosSelecionados.length > 0) {
            compra.acompanhamentos = acompanhamentosSelecionados; // Adiciona os acompanhamentos selecionados
            compra.precoAcompanhamentos = acompanhamentosSelecionados.length; // Contabiliza o custo dos acompanhamentos
        }
    }

    // Limpa o campo de descrição
    if (descricaoInput) {
        descricaoInput.value = ''; // Limpa a descrição
    }

    // Limpa os sabores e acompanhamentos apenas para a modal de sorvete
    if (itemEscolhido === 1) { // Se for sorvete
        document.querySelectorAll('.sabor-checkbox').forEach(cb => cb.checked = false);
        document.querySelectorAll('.acompanhamento-checkbox').forEach(cb => cb.checked = false);
    }

    // Adiciona a compra ao carrinho
    produtosCarrinho.push(compra);

    // Atualiza o índice do carrinho e salva
    keyCarrinho = produtosCarrinho.length; // Atualiza o índice do carrinho para o comprimento atual
    saveCarrinhoToLocalStorage(); // Salva o carrinho no localStorage
    contagemCarrinho(); // Atualiza a contagem
    mostrarPedidos();
    produtoModal.classList.remove("show"); // Fecha a modal
}

function contagemCarrinho() { // Função que conta quantos itens tem no carrinho
    let qt = 0;
    // Verifica se produtosCarrinho está definido e não é nulo
    if (Array.isArray(produtosCarrinho)) {
        produtosCarrinho.forEach((item) => {
            if (item.quantidade) { // Verifica se a quantidade existe
                qt += parseInt(item.quantidade);
            }
        });
    }
    carrinhoQuantidade.innerText = qt; // Atualiza a contagem no display
}

function mostrarPedidos() {
    carrinhoProdutos.innerHTML = ""; // Limpa a lista de produtos no carrinho
    let totalItens = 0;

    // Verifica se há itens no carrinho antes de exibi-lo
    if (produtosCarrinho.length === 0) {
        alert('Carrinho vazio, adicione algo para que possa ser exibido.');
        modalCarrinho.classList.remove("show"); // Fecha o modal se estiver aberto
        return; // Não faz nada se o carrinho estiver vazio
    } else {
        modalCarrinho.classList.add("show"); // Mostra o modal
    }

    document.querySelector('.carrinho').style.animationName = 'slidein'; // Animação de entrada do carrinho

    produtosCarrinho.forEach((item, index) => {
        const carrinhoItem = document.createElement("div");
        const carrinhodiv1 = document.createElement("div");
        const carrinhoqt = document.createElement("h3");
        const carrinhoNome = document.createElement("h2");
        const carrinhoDescricao = document.createElement("p"); // Novo elemento para a descrição
        const carrinhoSabores = document.createElement("p"); // Elemento para exibir sabores
        const carrinhoAcompanhamentos = document.createElement("p"); // Elemento para exibir acompanhamentos
        const carrinhodiv2 = document.createElement("div");
        const carrinhoPrice = document.createElement("h4");
        const valorReal = (item.produto.price + item.precoAcompanhamentos) * item.quantidade; // Cálculo do preço total com acompanhamentos
        const carrinhoButton = document.createElement("button");
        const carrinhoSpan = document.createElement("span");

        carrinhoItem.classList.add("carrinho-item");
        carrinhodiv1.classList.add("carrinho-detalhes"); // Classe adicional para estilização
        carrinhoqt.innerText = item.quantidade + "x"; // Exibe a quantidade
        carrinhoNome.innerText = item.produto.type + "\n" + item.produto.name; // Nome do produto
        carrinhoPrice.innerText = "R$" + valorReal.toFixed(2); // Exibe o preço total
        carrinhoButton.classList.add("butao-delete");
        carrinhoSpan.classList.add("material-symbols-outlined");
        carrinhoSpan.innerText = "delete_forever"; // Ícone de delete
        totalItens += valorReal; // Acumula o valor total dos itens

        // Exibe a descrição se estiver presente
        if (item.descricao) {
            carrinhoDescricao.innerText = item.descricao; // Adiciona a descrição ao carrinho
            carrinhoDescricao.style.fontStyle = "italic"; // Estilo em itálico para a descrição
            carrinhoDescricao.style.color = "#fff"; // Cor da descrição
        }

        // Exibe os sabores se estiver presente
        if (item.sabores && item.sabores.length > 0) {
            carrinhoSabores.innerText = "Sabores: " + item.sabores.join(', '); // Adiciona os sabores ao carrinho
        }

        // Exibe os acompanhamentos se estiver presente
        if (item.acompanhamentos && item.acompanhamentos.length > 0) {
            carrinhoAcompanhamentos.innerText = "Acompanhamentos: " + item.acompanhamentos.join(', '); // Adiciona os acompanhamentos ao carrinho
        }

        document.querySelector('.carrinho .total-itens h2').innerText = "R$" + totalItens.toFixed(2); // Atualiza o total no carrinho
        carrinhoButton.appendChild(carrinhoSpan);
        carrinhodiv2.appendChild(carrinhoPrice);
        carrinhodiv2.appendChild(carrinhoButton);
        carrinhodiv1.appendChild(carrinhoqt);
        carrinhodiv1.appendChild(carrinhoNome);
        carrinhodiv1.appendChild(carrinhoDescricao); // Colocando a descrição abaixo do nome
        carrinhodiv1.appendChild(carrinhoSabores); // Adicionando os sabores
        carrinhodiv1.appendChild(carrinhoAcompanhamentos); // Adicionando os acompanhamentos
        carrinhoItem.appendChild(carrinhodiv1);
        carrinhoItem.appendChild(carrinhodiv2);

        // Evento para remover item do carrinho
        carrinhoButton.addEventListener('click', () => {
            produtosCarrinho.splice(index, 1); // Remove o item do carrinho
            saveCarrinhoToLocalStorage(); // Atualiza o localStorage
            mostrarPedidos(); // Atualiza a exibição do carrinho
            contagemCarrinho();

            // Verifica se o carrinho ficou vazio após a remoção
            if (produtosCarrinho.length === 0) {
                localStorage.removeItem('produtosCarrinho'); // Remove produtosCarrinho do localStorage
                modalCarrinho.classList.remove("show"); // Fecha o modal se estiver vazio
            }
        });

        carrinhoProdutos.appendChild(carrinhoItem); // Adiciona o item ao carrinho
    });
}

// Função para salvar os itens do carrinho no localStorage
function saveCarrinhoToLocalStorage() {
    localStorage.setItem('produtosCarrinho', JSON.stringify(produtosCarrinho));
}

document.addEventListener('DOMContentLoaded', function () {
    // Adiciona o evento ao botão de captura (que agora finaliza a compra)
    const botaoCaptura = document.getElementById('botaoCaptura');
    if (botaoCaptura) {
        botaoCaptura.addEventListener('click', finalizarECapturarPedido);
    } else {
        console.error('Elemento "botaoCaptura" não encontrado no DOM.');
    }
});

// Função para capturar o pedido e finalizar a compra
function finalizarECapturarPedido() {
    // Captura o pedido antes de finalizar a compra
    capturarPedido().then(() => {
        // Após a captura, finaliza a compra
        finalizarCompra();
    });
}

function capturarPedido() {
    return new Promise((resolve, reject) => {
        const botao = document.getElementById('botaoCaptura');
        const loader = document.getElementById('loader');
        const mensagemOrientacao = document.getElementById('mensagemOrientacao');
        const elementoParaCaptura = document.getElementById('conteudo');
        const totalElement = document.querySelector('.total-itens'); // Seleciona o elemento total-itens

        // Exibe o loader e desabilita o botão durante a captura
        loader.style.display = 'block';
        botao.disabled = true;
        mensagemOrientacao.style.opacity = '0';

        // Adiciona a classe para estilização durante a captura
        elementoParaCaptura.classList.add('captura');

        // Clona o total-itens e adiciona no final para garantir a visibilidade
        const totalClone = totalElement.cloneNode(true);
        elementoParaCaptura.appendChild(totalClone);

        // Calcula a altura total do conteúdo para capturar todos os itens e o total
        const alturaTotal = elementoParaCaptura.scrollHeight;

        // Captura o conteúdo da página usando html2canvas
        html2canvas(elementoParaCaptura, {
            backgroundColor: '#ffffff',
            useCORS: true,
            allowTaint: false,
            scale: window.devicePixelRatio || 2, // Ajusta para a densidade de pixels do dispositivo
            width: 1600, // Define uma largura fixa para a captura
            height: alturaTotal, // Captura toda a altura do conteúdo, incluindo o total
        }).then(canvas => {
            // Remove a classe de captura para restaurar o estilo original
            elementoParaCaptura.classList.remove('captura');

            // Remove o clone do total-itens após a captura
            totalClone.remove();

            if (canvas) {
                // Converte a imagem para uma URL base64
                const imagemDataURL = canvas.toDataURL('image/png');

                // Gera um nome de arquivo único com a data e hora atual
                const agora = new Date();
                const timestamp = `${agora.getFullYear()}${String(agora.getMonth() + 1).padStart(2, '0')}${String(agora.getDate()).padStart(2, '0')}_${String(agora.getHours()).padStart(2, '0')}${String(agora.getMinutes()).padStart(2, '0')}${String(agora.getSeconds()).padStart(2, '0')}`;
                const nomeArquivo = `captura_${timestamp}.png`;

                // Cria um link temporário para download da imagem e aciona automaticamente o download
                const link = document.createElement('a');
                link.href = imagemDataURL;
                link.download = nomeArquivo;
                link.style.display = 'none'; // Esconde o link
                document.body.appendChild(link);
                link.click(); // Inicia automaticamente o download
                document.body.removeChild(link); // Remove o link após o download

                // Gera uma URL para enviar a mensagem pelo WhatsApp
                const numeroWhatsApp = '5511913421009';
                const mensagemTexto = encodeURIComponent('Olá! Este print é o meu pedido. Confira:');

                // Abre o WhatsApp com a mensagem de texto
                window.open(`https://wa.me/${numeroWhatsApp}?text=${mensagemTexto}`, '_blank');

                // Oculta o loader e reabilita o botão
                loader.style.display = 'none';
                botao.disabled = false;

                // Resolve a Promise após a captura e envio
                resolve();
            } else {
                console.error('Erro ao gerar a imagem. Canvas está vazio.');
                mensagemOrientacao.textContent = 'Ocorreu um erro ao capturar a tela. Por favor, tente novamente.';
                mensagemOrientacao.style.opacity = '1';
                loader.style.display = 'none';
                botao.disabled = false;
                reject();
            }
        }).catch(() => {
            mensagemOrientacao.textContent = 'Ocorreu um erro ao capturar a tela. Por favor, tente novamente.';
            mensagemOrientacao.style.opacity = '1';
            loader.style.display = 'none';
            botao.disabled = false;
            elementoParaCaptura.classList.remove('captura'); // Remove a classe em caso de erro
            totalClone.remove(); // Remove o clone em caso de erro
            reject();
        });
    });
}

// Função para finalizar a compra
function finalizarCompra() {
    // Limpa o carrinho no localStorage
    localStorage.removeItem('produtosCarrinho');
    produtosCarrinho = []; // Limpa o array em memória
    contagemCarrinho(); // Atualiza a contagem no display
    mostrarPedidos(); // Atualiza a exibição do carrinho

    // Redefine o total
    total = "------"; // Certifique-se de que a variável total está definida no escopo apropriado
    document.querySelector('.contador-carrinho').innerText = total; // Atualiza a exibição do total
}

// Função para carregar os itens do carrinho do localStorage

function loadCarrinhoFromLocalStorage() {
    const carrinhoSalvo = localStorage.getItem('produtosCarrinho');
    if (carrinhoSalvo) {
        try {
            produtosCarrinho = JSON.parse(carrinhoSalvo);
            // Verifica se os produtos carregados têm a propriedade "quantidade"
            if (!produtosCarrinho.every(item => item.quantidade)) {
                throw new Error("Um ou mais itens não têm a propriedade 'quantidade'");
            }
            keyCarrinho = produtosCarrinho.length; // Atualiza o índice do carrinho
            contagemCarrinho(); // Atualiza a contagem
            mostrarPedidos(); // Exibe os pedidos carregados
            console.log('Carrinho carregado:', produtosCarrinho); // Adicionado para debug
        } catch (error) {
            console.error('Erro ao carregar o carrinho do localStorage:', error);
            produtosCarrinho = []; // Reinicializa o carrinho em caso de erro
        }
    } else {
        produtosCarrinho = []; // Inicia um carrinho vazio se não houver dados
    }


    // Se o carrinho estiver vazio, atualiza a exibição
    if (produtosCarrinho.length === 0) {
        document.querySelector('.contador-carrinho').innerText = "------"; // Exibe o total padrão
    }
}

document.addEventListener('DOMContentLoaded', function () {
    loadCarrinhoFromLocalStorage(); // Carrega o carrinho do localStorage ao iniciar

    if (produtosCarrinho.length > 0) {
        mostrarPedidos(); // Exibe o carrinho apenas se houver itens
    }

    // iconeCarrinho.addEventListener('click', () => {
    //     mostrarPedidos(); // Exibe os pedidos quando o ícone do carrinho for clicado
    // });
    // // Outras inicializações...
});

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
