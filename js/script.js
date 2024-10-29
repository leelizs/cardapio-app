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

  // Lógica para o sorvete
  if (itemEscolhido === 1) { // Se for sorvete
    const tamanhosSelecionados = document.querySelector('input[name="tamanho"]:checked');

    const precoTamanho = parseFloat(tamanhosSelecionados.value); // Pega o valor do preço do tamanho selecionado
    if (isNaN(precoTamanho)) {
      console.error('Preço do tamanho inválido');
      return; // Sai da função se o preço do tamanho não for válido
    }
    const indexTamanho = Array.from(document.querySelectorAll('input[name="tamanho"]')).indexOf(tamanhosSelecionados);
    const tamanhoSelecionado = sorvetes[keyEscolhido].price[indexTamanho];
    compra.size = tamanhoSelecionado.size; // Armazena o tamanho selecionado
    compra.preco = precoTamanho; // Adiciona o preço ao objeto de compra

    const saboresSelecionados = Array.from(document.querySelectorAll('.sabor-checkbox:checked')).map(cb => cb.value);
    const acompanhamentosSelecionados = Array.from(document.querySelectorAll('.acompanhamento-checkbox:checked')).map(cb => cb.value);

    // Verifica se ao menos um sabor foi selecionado, exceto se for Açaí ou Cupuaçu
    if (saboresSelecionados.length === 0 && compra.produto.name !== 'Açaí' && compra.produto.name !== 'Cupuaçu') {
      alert('Por favor, selecione pelo menos um sabor antes de adicionar ao carrinho.');
      return;
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
  produtosCarrinho.push({
    produto: compra.produto,
    quantidade: compra.quantidade,
    descricao: compra.descricao,
    sabores: compra.sabores,
    acompanhamentos: compra.acompanhamentos,
    adicionais: compra.adicionais,
    preco: compra.preco, // Adiciona o preço do tamanho aqui
    size: compra.size // Adiciona o tamanho selecionado aqui
  });

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
    alert('Tente novamente.');
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
    const valorBase = parseFloat(item.produto.price) || 0; // Preço base do produto, convertido para float
    // Substitua "valorSabor" por "valorTamanho" para refletir melhor o conteúdo
    const valorTamanho = item.preco || 0; // Verifica se o tamanho existe e é um número

    const valorReal = (
      valorBase + // Preço base do produto
      valorTamanho + // Preço do tamanho
      (totalAcompanhamentos * precoAcompanhamento) + // Custo dos acompanhamentos
      (totalAdicionais * precoAdicional) // Custo dos adicionais
    ) * item.quantidade;

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
      carrinhoDescricao.innerText = "Descrição: " + item.descricao; // Adiciona a descrição ao carrinho
      carrinhoDescricao.style.fontStyle = "italic"; // Estilo em itálico para a descrição
      carrinhoDescricao.style.color = "#fff"; // Cor da descrição
      carrinhodiv1.appendChild(carrinhoDescricao); // Coloca a descrição aqui
    }

    // Verifica se o produto é um sorvete antes de criar os campos de sabores e acompanhamentos
    if (item.produto.type && item.produto.type.toLowerCase() === 'sorvete') {
      const carrinhoSabores = document.createElement("p"); // Elemento para exibir sabores
      const carrinhoAcompanhamentos = document.createElement("p"); // Elemento para exibir acompanhamentos
      const carrinhoTamanho = document.createElement("p"); // Elemento para exibir o tamanho escolhido

      // Exibe o tamanho escolhido
      if (item.size) { // Verifica se o tamanho está definido
        carrinhoTamanho.innerText = "Tamanho: " + item.size; // Adiciona o tamanho ao carrinho
        carrinhodiv1.appendChild(carrinhoTamanho); // Adiciona o tamanho à div de detalhes
      }

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

// Função auxiliar para verificar conexão à internet
function verificarConexao() {
  return new Promise((resolve, reject) => {
    if (!navigator.onLine) {
      reject("Você está offline. Não é possível finalizar a compra sem conexão à internet.");
    } else {
      resolve(); // Se estiver online, resolve
    }
  });
}

// Função para capturar o pedido e finalizar a compra
function finalizarECapturarPedido() {
  // Chama a função verificarConexao e aguarda o resultado
  verificarConexao()
    .then(() => {
      // Código de verificação de opções de recebimento
      const retirarLocalChecked = document.getElementById('retirarLocal')?.checked;
      const fazerEntregaChecked = document.getElementById('fazerEntrega')?.checked;
      const enderecoEntrega = document.getElementById('enderecoEntrega')?.value.trim(); // Remove espaços em branco

      if (!retirarLocalChecked && !fazerEntregaChecked) {
        alert('Por favor, selecione uma opção de recebimento.');
        return;
      }

      // Verifica se o endereço está preenchido apenas se a opção de fazer entrega estiver selecionada
      if (fazerEntregaChecked && !enderecoEntrega) {
        alert('Por favor, preencha o campo de endereço.');
        return; // Interrompe a execução se o campo estiver vazio e fazerEntregaChecked está marcado
      }

      const formaEntrega = retirarLocalChecked
        ? "Retirar no Local - Av. das Monções, 846 - Parque Recanto Monica - 08592-150"
        : `Fazer Entrega em: ${enderecoEntrega}`;

      const elementoParaCaptura = document.getElementById('conteudo');
      const informacaoEntrega = document.createElement('p');
      informacaoEntrega.innerText = formaEntrega;
      informacaoEntrega.style.color = 'white';
      elementoParaCaptura.appendChild(informacaoEntrega);

      // Captura o pedido após garantir que há conexão
      capturarPedido()
        .then(() => {
          return verificarConexao(); // Verifica novamente antes de finalizar
        })
        .then(() => {
          finalizarCompra(); // Só finaliza se a conexão for validada novamente
          informacaoEntrega.remove();
        })
        .catch((error) => {
          alert(error);
          informacaoEntrega.remove();
        });
    })
    .catch((error) => {
      alert(error);
      window.location.href = 'offline.html'; // Redireciona para página offline se não tiver internet
    });
}

function capturarPedido() {
  return verificarConexao()
    .then(() => {
      return new Promise((resolve, reject) => {
        const botao = document.getElementById('botaoCaptura');
        const loader = document.getElementById('loader');
        const mensagemOrientacao = document.getElementById('mensagemOrientacao');
        const elementoParaCaptura = document.getElementById('conteudo');
        const totalElement = document.querySelector('.total-itens');
        const metodoEntregaDiv = document.querySelector('.metodo-entrega');
        const originalDisplay = metodoEntregaDiv.style.display;

        loader.style.display = 'block';
        botao.disabled = true;
        mensagemOrientacao.style.opacity = '0';
        metodoEntregaDiv.style.display = 'none';
        elementoParaCaptura.classList.add('captura');
        const totalClone = totalElement.cloneNode(true);
        elementoParaCaptura.appendChild(totalClone);

        html2canvas(elementoParaCaptura, {
          backgroundColor: '#ffffff',
          useCORS: true,
          allowTaint: false,
          scale: window.devicePixelRatio || 2,
          width: 1600,
          height: elementoParaCaptura.scrollHeight,
        }).then(canvas => {
          if (canvas) {
            const imagemDataURL = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imagemDataURL;
            link.download = `captura_${new Date().toISOString()}.png`;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            const numeroWhatsApp = '5511913421009';
            let mensagemTexto = 'Olá! Aqui está o meu pedido:\n';

            produtosCarrinho.forEach((item, index) => {
              let precoTotalItem = 0;
              let itemTexto = `${index + 1}. ${item.produto.type} - ${item.produto.name} - Quantidade: ${item.quantidade}`;
              let precoSize;

              // Preço base do produto
              if (item.produto.type === 'Sorvete') {
                precoSize = item.produto.price.find(p => p.size === item.size);

                if (precoSize) {
                  precoTotalItem += precoSize.value * item.quantidade; // Inclui o preço do sorvete
                  itemTexto += `, Tamanho: ${item.size}`;
                } else {
                  console.warn(`Tamanho não encontrado para Sorvete: ${item.size}`);
                  itemTexto += `, Tamanho: Não especificado`;
                }
              } else {
                if (item.produto.price !== undefined) {
                  precoTotalItem += item.produto.price * item.quantidade; // Inclui o preço do hamburguer ou pastel
                } else {
                  console.warn(`Preço não encontrado para ${item.produto.type}: ${item.produto.name}`);
                }
              }

              if (item.descricao) itemTexto += `, Descrição: ${item.descricao}`;
              if (item.sabores && item.sabores.length > 0) itemTexto += `, Sabores: ${item.sabores.join(', ')}`;

              // Preços dos acompanhamentos e adicionais
              const precoAcompanhamento = 1; // R$ 1,00 por acompanhamento
              const precoAdicional = 2; // R$ 2,00 por adicional

              // Adicionando os custos de acompanhamentos e adicionais ao total do item
              const totalAcompanhamentos = item.acompanhamentos ? item.acompanhamentos.length : 0;
              const totalAdicionais = item.adicionais ? item.adicionais.length : 0;

              precoTotalItem += (totalAcompanhamentos * precoAcompanhamento);
              precoTotalItem += (totalAdicionais * precoAdicional);

              // Adicionando os acompanhamentos e adicionais ao texto do item
              if (totalAcompanhamentos > 0) {
                itemTexto += `, Acompanhamentos: ${item.acompanhamentos.join(', ')}`;
              }
              if (totalAdicionais > 0) {
                itemTexto += `, Adicionais: ${item.adicionais.join(', ')}`;
              }

              // Monta o texto final do item com todos os detalhes e preços corretos
              const precoItem = item.produto.type === 'Sorvete' ? (precoSize ? precoSize.value : 0) : item.produto.price;
              itemTexto += ` - Preço Base: R$ ${(precoItem * item.quantidade).toFixed(2)} = Total Item: R$ ${precoTotalItem.toFixed(2)}`;

              mensagemTexto += itemTexto + "\n";
            });

            mensagemTexto += `${totalElement.innerText}`;

            const metodoEntrega = document.querySelector('input[name="metodoEntrega"]:checked');
            if (metodoEntrega) {
              mensagemTexto += metodoEntrega.id === 'retirarLocal' ? "\nMétodo de entrega: Retirar no local." : `\nMétodo de entrega: Entrega em - ${document.getElementById('enderecoEntrega').value.trim()}`;
            }

            window.open(`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagemTexto)}`, '_blank');
            resolve();
          } else {
            throw new Error('Erro ao gerar a imagem. Canvas está vazio.');
          }
        }).catch(error => {
          mensagemOrientacao.textContent = 'Ocorreu um erro ao capturar a tela. Por favor, tente novamente.';
          mensagemOrientacao.style.opacity = '1';
          console.error(error.message);
          reject();
        }).finally(() => {
          loader.style.display = 'none';
          botao.disabled = false;
          metodoEntregaDiv.style.display = originalDisplay;
          elementoParaCaptura.classList.remove('captura');
          totalClone.remove();
        });
      });
    });
}

// Função para finalizar a compra
function finalizarCompra() {
  return new Promise((resolve, reject) => {
    // Verifica a conexão antes de finalizar a compra
    verificarConexao()
      .then(() => {
        // Limpa o carrinho no localStorage
        localStorage.removeItem('produtosCarrinho');
        produtosCarrinho = []; // Limpa o array em memória
        contagemCarrinho(); // Atualiza a contagem no display
        mostrarPedidos(); // Atualiza a exibição do carrinho

        // Redefine o total
        total = "------"; // Certifique-se de que a variável total está definida no escopo apropriado
        document.querySelector('.contador-carrinho').innerText = total; // Atualiza a exibição do total

        resolve(); // Resolve a promessa após finalizar a compra
      })
      .catch((error) => {
        alert(error); // Exibe a mensagem de erro se não estiver online
        reject(); // Rejeita a promessa se não houver conexão
      });
  });
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
