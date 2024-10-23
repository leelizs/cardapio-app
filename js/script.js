if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/pwabuilder-sw.js').then(registration => {
    registration.onupdatefound = () => {
      const installingWorker = registration.installing;

      installingWorker.onstatechange = () => {
        if (installingWorker.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            showUpdateNotification(); // Chama a função para mostrar a notificação na div
          }
        }
      };
    };
  }).catch(error => {
    console.log('Falha ao registrar o Service Worker:', error);
  });

  // Ouvir mensagens do Service Worker
  navigator.serviceWorker.onmessage = (event) => {
    if (event.data && event.data.type === 'NEW_VERSION_AVAILABLE') {
      showUpdateNotification(); // Também chama aqui se a notificação for enviada pelo Service Worker
    }
  };
}

// Função para exibir a notificação de atualização
function showUpdateNotification() {
  const notification = document.createElement('div');
  notification.classList.add('update-notification');
  notification.innerHTML = `
    <div class="message">
      <p>Nova atualização disponível!</p>
      <button id="refresh-button">Atualizar</button>
    </div>
  `;

  document.body.appendChild(notification);

  document.getElementById('refresh-button').addEventListener('click', () => {
    location.reload(); // Recarrega a página ao clicar no botão
  });
}


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
  compra.adicionais = [];
  compra.precoAdicionais = 0;

  // Captura os sabores e acompanhamentos apenas se for um sorvete
  if (itemEscolhido === 1) { // Se for sorvete
    const saboresSelecionados = Array.from(document.querySelectorAll('.sabor-checkbox:checked')).map(cb => cb.value);
    const acompanhamentosSelecionados = Array.from(document.querySelectorAll('.acompanhamento-checkbox:checked')).map(cb => cb.value);

    if (saboresSelecionados.length === 0) {
      alert('Por favor, selecione pelo menos um sabor antes de adicionar ao carrinho.');
      return; // Impede de adicionar ao carrinho e mantém a modal aberta
    }

    // Adiciona os sabores e acompanhamentos se houver seleção
    compra.sabores = saboresSelecionados; // Adiciona os sabores selecionados
    if (acompanhamentosSelecionados.length > 0) {
      compra.acompanhamentos = acompanhamentosSelecionados; // Adiciona os acompanhamentos selecionados
      compra.precoAcompanhamentos = acompanhamentosSelecionados.length; // Contabiliza o custo dos acompanhamentos
    }
  }

  // Captura os adicionais apenas se for um hamburguer, pastel ou pastel especial
  if (itemEscolhido === 0 || itemEscolhido === 2 || itemEscolhido === 3) { // Se for hamburguer, pastel ou pastel especial
    const adicionaisSelecionados = Array.from(document.querySelectorAll('.adicional-checkbox:checked')).map(cb => cb.value);

    if (adicionaisSelecionados.length > 0) {
      compra.adicionais = adicionaisSelecionados; // Adiciona os adicionais selecionados
      compra.precoAdicionais = adicionaisSelecionados.length; // Contabiliza o custo dos adicionais
    }
  }

  // Limpa os campos de descrição, sabores e acompanhamentos
  if (descricaoInput) {
    descricaoInput.value = ''; // Limpa a descrição
  }

  // Limpa os checkboxes de sabores e acompanhamentos
  document.querySelectorAll('.sabor-checkbox').forEach(cb => cb.checked = false);
  document.querySelectorAll('.acompanhamento-checkbox').forEach(cb => cb.checked = false);
  document.querySelectorAll('.adicional-checkbox').forEach(cb => cb.checked = false);

  // Adiciona a compra ao carrinho
  produtosCarrinho.push(compra);

  // Atualiza o índice do carrinho e salva
  keyCarrinho = produtosCarrinho.length; // Atualiza o índice do carrinho para o comprimento atual
  saveCarrinhoToLocalStorage(); // Salva o carrinho no localStorage
  contagemCarrinho(); // Atualiza a contagem

  // Chama mostrarPedidos apenas se houver pelo menos um sabor selecionado
  if (itemEscolhido === 1 && compra.sabores.length > 0) {
    mostrarPedidos(); // Chama mostrarPedidos apenas se a adição for bem-sucedida
    produtoModal.classList.remove("show"); // Fecha a modal apenas após a adição
  } else if (itemEscolhido !== 1) {
    // Se não for sorvete, apenas fecha a modal sem adicionar nada relacionado a sabores/acompanhamentos
    produtoModal.classList.remove("show");
  }
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
    alert('Nenhum item.');
    modalCarrinho.classList.remove("show"); // Fecha o modal se estiver aberto
    return; // Não faz nada se o carrinho estiver vazio
  } else {
    modalCarrinho.classList.add("show"); // Mostra o modal
  }

  document.querySelector('.carrinho').style.animationName = 'slidein'; // Animação de entrada do carrinho

  produtosCarrinho.forEach((item, index) => {
    const carrinhoItem = document.createElement("div");
    const carrinhodiv1 = document.createElement("div");
    const carrinhodiv2 = document.createElement("div");
    const carrinhoqt = document.createElement("h3");
    const carrinhoNome = document.createElement("h2");
    const carrinhoDescricao = document.createElement("p"); // Novo elemento para a descrição
    const carrinhoPrice = document.createElement("h4");
    const carrinhoButton = document.createElement("button");
    const carrinhoSpan = document.createElement("span");

    // Preço de cada acompanhamento ou adicional
    const precoAcompanhamento = 1; // R$ 1,00 por acompanhamento
    const precoAdicional = 2; // R$ 2,00 por adicional

    // Total de acompanhamentos e adicionais selecionados
    const totalAcompanhamentos = item.acompanhamentos ? item.acompanhamentos.length : 0; // Número de acompanhamentos (pode ser 0 se não houver)
    const totalAdicionais = item.adicionais ? item.adicionais.length : 0; // Número de adicionais (pode ser 0 se não houver)

    // Cálculo do valor total considerando acompanhamentos e/ou adicionais
    const valorReal = (item.produto.price + (totalAcompanhamentos * precoAcompanhamento) + (totalAdicionais * precoAdicional)) * item.quantidade;

    totalItens += valorReal; // Acumula o valor total dos itens

    carrinhoItem.classList.add("carrinho-item");
    carrinhodiv1.classList.add("carrinho-detalhes"); // Classe adicional para estilização
    carrinhoqt.innerText = item.quantidade + "x"; // Exibe a quantidade
    carrinhoNome.innerText = item.produto.type + "\n" + item.produto.name; // Nome do produto
    carrinhoPrice.innerText = "R$ " + valorReal.toFixed(2); // Exibe o preço total
    carrinhoButton.classList.add("butao-delete");
    carrinhoSpan.classList.add("material-symbols-outlined");
    carrinhoSpan.innerText = "delete_forever"; // Ícone de delete

    // Adiciona a quantidade à div de detalhes **antes** do nome do produto
    carrinhodiv1.appendChild(carrinhoqt); // Exibe a quantidade acima do nome
    carrinhodiv1.appendChild(carrinhoNome); // Adiciona o nome do produto

    // Exibe a descrição se estiver presente
    if (item.descricao) {
      carrinhoDescricao.innerText = item.descricao; // Adiciona a descrição ao carrinho
      carrinhoDescricao.style.fontStyle = "italic"; // Estilo em itálico para a descrição
      carrinhoDescricao.style.color = "#fff"; // Cor da descrição
      carrinhodiv1.appendChild(carrinhoDescricao); // Coloca a descrição aqui
    }

    // Verifica se o produto é um sorvete antes de criar os campos de sabores e acompanhamentos
    if (item.produto.type && item.produto.type.toLowerCase() === 'sorvete') {
      const carrinhoSabores = document.createElement("p"); // Elemento para exibir sabores
      const carrinhoAcompanhamentos = document.createElement("p"); // Elemento para exibir acompanhamentos

      // Exibe os sabores se estiver presente
      if (item.sabores && item.sabores.length > 0) {
        carrinhoSabores.innerText = "Sabores: " + item.sabores.join(', '); // Adiciona os sabores ao carrinho
        carrinhodiv1.appendChild(carrinhoSabores); // Adicionando os sabores
      }

      // Exibe os acompanhamentos se estiver presente
      if (item.acompanhamentos && item.acompanhamentos.length > 0) {
        carrinhoAcompanhamentos.innerText = "Acompanhamentos: " + item.acompanhamentos.join(', '); // Adiciona os acompanhamentos ao carrinho
        carrinhodiv1.appendChild(carrinhoAcompanhamentos); // Adicionando os acompanhamentos
      }
    }

    // Verifica se o produto é um hamburguer ou pastel antes de criar os campos de adicionais
    if (item && item.produto && item.produto.type) {
      console.log("Tipo do produto:", item.produto.type);
      if (item.produto.type.toLowerCase() === 'hamburguer' ||
        item.produto.type.toLowerCase() === 'pastel' ||
        item.produto.type.toLowerCase() === 'pasteis') {

        const carrinhoAdicionais = document.createElement("p"); // Elemento para exibir adicionais

        // Exibe os adicionais se estiver presente
        console.log("Adicionais:", item.adicionais);
        if (Array.isArray(item.adicionais) && item.adicionais.length > 0) {
          carrinhoAdicionais.innerText = "Adicionais: " + item.adicionais.join(', '); // Adiciona os Adicionais ao carrinho
          carrinhodiv1.appendChild(carrinhoAdicionais); // Adicionando os adicionais
        }
      }
    }


    // Adiciona a div de preço e botão à segunda div
    carrinhodiv2.appendChild(carrinhoPrice);
    carrinhodiv2.appendChild(carrinhoButton);
    carrinhoButton.appendChild(carrinhoSpan);

    // Adiciona a div de detalhes e a div de preço ao item
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

  // Atualiza o total no carrinho
  document.querySelector('.carrinho .total-itens h2').innerText = "R$ " + totalItens.toFixed(2);

  // Criar e adicionar opções de Retirada e Entrega
  adicionarOpcoesEntrega(carrinhoProdutos);
}

function adicionarOpcoesEntrega(container) {
  // Verifica se as opções já existem para evitar duplicação
  if (document.querySelector('.metodo-entrega')) return;

  const metodoEntregaDiv = document.createElement("div");
  metodoEntregaDiv.classList.add("metodo-entrega");

  // Estilizando a opção de Retirar no Local
  const retirarLocalContainer = document.createElement("div");
  retirarLocalContainer.classList.add("opcao-entrega");

  const retirarLocalInput = document.createElement("input");
  retirarLocalInput.type = "radio";
  retirarLocalInput.id = "retirarLocal";
  retirarLocalInput.name = "metodoEntrega"; // Define o mesmo nome para que sejam parte do mesmo grupo

  const retirarLocalLabel = document.createElement("label");
  retirarLocalLabel.htmlFor = "retirarLocal";
  retirarLocalLabel.innerText = "Retirar no Local";
  retirarLocalLabel.classList.add("label-entrega");

  retirarLocalContainer.appendChild(retirarLocalInput);
  retirarLocalContainer.appendChild(retirarLocalLabel);
  metodoEntregaDiv.appendChild(retirarLocalContainer);

  // Estilizando a opção de Fazer Entrega em
  const fazerEntregaContainer = document.createElement("div");
  fazerEntregaContainer.classList.add("opcao-entrega");

  const fazerEntregaInput = document.createElement("input");
  fazerEntregaInput.type = "radio";
  fazerEntregaInput.id = "fazerEntrega";
  fazerEntregaInput.name = "metodoEntrega"; // Define o mesmo nome para que sejam parte do mesmo grupo

  const fazerEntregaLabel = document.createElement("label");
  fazerEntregaLabel.htmlFor = "fazerEntrega";
  fazerEntregaLabel.innerText = "Fazer Entrega em:";
  fazerEntregaLabel.classList.add("label-entrega");

  const enderecoInput = document.createElement("input");
  enderecoInput.id = "enderecoEntrega";
  enderecoInput.placeholder = "Digite seu endereço";
  enderecoInput.style.display = "none"; // Oculta o campo de endereço inicialmente
  enderecoInput.classList.add("input-endereco"); // Classe para estilização

  fazerEntregaInput.addEventListener('change', () => {
    enderecoInput.style.display = "block"; // Mostra o campo de endereço
  });

  retirarLocalInput.addEventListener('change', () => {
    enderecoInput.style.display = "none"; // Oculta o campo de endereço
  });

  fazerEntregaContainer.appendChild(fazerEntregaInput);
  fazerEntregaContainer.appendChild(fazerEntregaLabel);
  fazerEntregaContainer.appendChild(enderecoInput);
  metodoEntregaDiv.appendChild(fazerEntregaContainer);

  container.appendChild(metodoEntregaDiv); // Adiciona a seção de método de entrega ao carrinho
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
  // Verificar se está offline
  if (!navigator.onLine) {
    alert("Você está offline. Não é possível finalizar a compra sem conexão à internet.");
    // Redireciona para a página offline, caso desejado
    window.location.href = 'offline.html';
    return;
  }

  const retirarLocalChecked = document.getElementById('retirarLocal')?.checked; // Usar optional chaining
  const fazerEntregaChecked = document.getElementById('fazerEntrega')?.checked;
  const enderecoEntrega = document.getElementById('enderecoEntrega')?.value || ''; // Pega o valor do input ou vazio

  if (!retirarLocalChecked && !fazerEntregaChecked) {
    alert('Por favor, selecione uma opção de recebimento.');
    return;
  }

  const formaEntrega = retirarLocalChecked
    ? "Retirar no Local - Av. das Monções, 846 - Parque Recanto Monica - 08592-150"
    : `Fazer Entrega em: ${enderecoEntrega}`;

  const elementoParaCaptura = document.getElementById('conteudo');
  const informacaoEntrega = document.createElement('p');
  informacaoEntrega.innerText = formaEntrega;

  // Altera a cor do texto para branco
  informacaoEntrega.style.color = 'white'; // Define a cor para branco

  elementoParaCaptura.appendChild(informacaoEntrega);

  capturarPedido().then(() => {
    finalizarCompra();
    informacaoEntrega.remove(); // Remove a informação após finalizar a compra
  }).catch(() => {
    // Caso ocorra erro, remove a informação
    informacaoEntrega.remove();
  });
}

function capturarPedido() {
  return new Promise((resolve, reject) => {
    const botao = document.getElementById('botaoCaptura');
    const loader = document.getElementById('loader');
    const mensagemOrientacao = document.getElementById('mensagemOrientacao');
    const elementoParaCaptura = document.getElementById('conteudo');
    const totalElement = document.querySelector('.total-itens'); // Seleciona o elemento total-itens
    const enderecoInput = document.querySelector('input[placeholder="Digite seu endereço"]'); // Campo de endereço
    const metodoEntregaDiv = document.querySelector('.metodo-entrega'); // Div das opções de entrega
    const originalDisplay = metodoEntregaDiv.style.display; // Armazena o estado original das opções de entrega

    // Identifique os elementos "Retirar no Local" e "Fazer Entrega em"
    const retirarNoLocalElement = document.querySelector('.retirar-local'); // Adapte para a sua classe ou ID
    const fazerEntregaElement = document.querySelector('.fazer-entrega'); // Adapte para a sua classe ou ID

    // Exibe o loader e desabilita o botão durante a captura
    loader.style.display = 'block';
    botao.disabled = true;
    mensagemOrientacao.style.opacity = '0';

    // Oculta as opções de entrega
    metodoEntregaDiv.style.display = 'none'; // Oculta a div das opções de entrega

    // Muda a cor para branco
    if (retirarNoLocalElement) {
      retirarNoLocalElement.style.color = 'white'; // Muda a cor para branco
    }
    if (fazerEntregaElement) {
      fazerEntregaElement.style.color = 'white'; // Muda a cor para branco
    }

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
      metodoEntregaDiv.style.display = originalDisplay; // Restaura a visibilidade das opções de entrega

      // Restaura a cor original
      if (retirarNoLocalElement) {
        retirarNoLocalElement.style.color = ''; // Restaura a cor original
      }
      if (fazerEntregaElement) {
        fazerEntregaElement.style.color = ''; // Restaura a cor original
      }

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
        let mensagemTexto = encodeURIComponent('Olá! Este print é o meu pedido. Confira:');

        // Adiciona o endereço se a entrega for selecionada
        if (enderecoInput.style.display === 'block' && enderecoInput.value.trim() !== '') {
          const endereco = encodeURIComponent(enderecoInput.value.trim());
          mensagemTexto += `%0AEntrega em: ${endereco}`;
        } else {
          mensagemTexto += `%0ARetirar no local.`;
        }

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
        metodoEntregaDiv.style.display = originalDisplay; // Restaura em caso de erro
        reject();
      }
    }).catch(() => {
      mensagemOrientacao.textContent = 'Ocorreu um erro ao capturar a tela. Por favor, tente novamente.';
      mensagemOrientacao.style.opacity = '1';
      loader.style.display = 'none';
      botao.disabled = false;
      elementoParaCaptura.classList.remove('captura'); // Remove a classe em caso de erro
      totalClone.remove(); // Remove o clone em caso de erro
      metodoEntregaDiv.style.display = originalDisplay; // Restaura em caso de erro
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
