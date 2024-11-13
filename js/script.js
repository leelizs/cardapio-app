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

function openMap() {
  document.getElementById("mapModal").style.display = "block";
}

function closeMap() {
  document.getElementById("mapModal").style.display = "none";
}

// Fecha o modal se o usuário clicar fora da área de conteúdo
window.onclick = function (event) {
  const modal = document.getElementById("mapModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
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

let totalSalgados = 0; // Variável global

//console.log("salgados:", salgados);

// Função que calcula o total dos salgados
function calcularTotalSalgados(keyEscolhido) {
  keyEscolhido = parseInt(keyEscolhido);
  //console.log("keyEscolhido na função:", keyEscolhido);

  if (isNaN(keyEscolhido) || salgados[keyEscolhido] === undefined) {
    //console.error(`Salgado com índice ${keyEscolhido} não encontrado.`);
    return 0; // Retorna 0 ou qualquer valor padrão
  }

  // Adicione este log
  //console.log("Tipos de salgados:", salgados[keyEscolhido].tipos);

  const salgadosSelecionados = salgados[keyEscolhido].tipos.map((salgado, index) => {
    const quantidadeElement = document.querySelector(`.salgado-row:nth-child(${index + 1}) .salgado-quantidade`);
    //console.log("Quantidade Element:", quantidadeElement);
    const quantidade = quantidadeElement ? parseInt(quantidadeElement.innerText) || 0 : 0;
    return { price: salgado.price, quantity: quantidade };
  });

  // Calcula o total
  return salgadosSelecionados.reduce((total, salgado) => total + (salgado.price * salgado.quantity), 0);
}

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
    case 6: // Caso seja "salgados"
      compra.produto = salgados[keyEscolhido];

      // Para "Cento de Salgados Mini", não precisa selecionar tipos
      if (salgados[keyEscolhido].id === 1) {
        compra.salgados = [{ nome: "Cento de Salgados Mini", quantidade: 1 }]; // Adiciona um item ao carrinho
      } else {
        compra.totalSalgados = calcularTotalSalgados(keyEscolhido);

        // Captura os salgados selecionados com quantidade maior que 0
        compra.salgados = salgados[keyEscolhido].tipos.map((salgado, index) => {
          const quantidadeElement = document.querySelector(`.salgado-row:nth-child(${index + 1}) .salgado-quantidade`);
          const quantidade = quantidadeElement ? parseInt(quantidadeElement.innerText) || 0 : 0;
          return { nome: salgado.name, quantidade };
        }).filter(s => s.quantidade > 0);

        // Verifica se ao menos um salgado foi selecionado
        if (compra.salgados.length === 0) {
          alert("Por favor, selecione pelo menos um salgado antes de adicionar ao carrinho.");
          return; // Sai da função sem adicionar ao carrinho
        }
      }
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

  // Adiciona o preço total dos salgados (caso existam) ao preço final da compra
  compra.preco = (compra.preco || 0) + (compra.totalSalgados || 0);

  // Adiciona a compra ao carrinho
  produtosCarrinho.push({
    produto: compra.produto,
    quantidade: compra.quantidade,
    descricao: compra.descricao,
    sabores: compra.sabores,
    acompanhamentos: compra.acompanhamentos,
    adicionais: compra.adicionais,
    salgados: compra.salgados, // Adiciona os salgados ao carrinho
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
    alert(`Ops! Tente novamente. Possíveis causas: 'Adicione algo ao carrinho para que os itens possam ser exibidos', 'Este alerta é exibido quando algo não ocorre como esperado' ou 'Item removido do carrinho.'`);
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

    // Calcula total de salgados se o item for um salgado
    const totalSalgados = calcularTotalSalgados(keyEscolhido);

    let valorReal;

    // Verifica se o item é um salgado
    if (item.produto.type && item.produto.type.toLowerCase() === 'salgado') {
      valorReal = (
        valorBase + // Deve ser o preço do salgado
        (totalAcompanhamentos * precoAcompanhamento) +
        (totalAdicionais * precoAdicional) +
        totalSalgados // Adiciona total de salgados ao valor total
      ) * item.quantidade; // Multiplicando pela quantidade
    } else {
      // Para outros tipos de produtos, você pode incluir o valorTamanho
      valorReal = (
        valorBase +
        valorTamanho + // Somente se não for salgado
        (totalAcompanhamentos * precoAcompanhamento) +
        (totalAdicionais * precoAdicional)
      ) * item.quantidade;
    }

    // Acumula o valor total dos itens
    totalItens += valorReal;

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
        item.produto.type.toLowerCase() === 'pasteis especiais') {

        const carrinhoAdicionais = document.createElement("p"); // Elemento para exibir adicionais

        // Exibe os adicionais se estiver presente
        console.log("Adicionais:", item.adicionais);
        if (Array.isArray(item.adicionais) && item.adicionais.length > 0) {
          carrinhoAdicionais.innerText = "Adicionais: " + item.adicionais.join(', '); // Adiciona os Adicionais ao carrinho
          carrinhodiv1.appendChild(carrinhoAdicionais); // Adicionando os adicionais
        }
      }
    }

    if (item.produto.type && item.produto.type.toLowerCase() === 'salgados') {
      const carrinhoSalgados = document.createElement("p");

      // Verifica se o produto é "Cento de Salgados Mini"
      if (item.produto.name === 'Cento de Salgados Mini') {
      } else {
        // Para outros salgados, exibe a lista
        if (item.salgados && item.salgados.length > 0) {
          const salgadosList = item.salgados.map(salgado => {
            const salgadoInfo = salgados.find(s => s.name === salgado.nome);

            if (salgadoInfo) {
              const tipo = salgadoInfo.tipos.find(t => t.name.toLowerCase() === salgado.nome.toLowerCase());
              const price = tipo ? tipo.price * salgado.quantidade : 0;
              return `${salgado.nome} (${salgado.quantidade}) - R$ ${price.toFixed(2)}`;
            }

            return `${salgado.nome} (${salgado.quantidade})`;
          }).join(', ');

          if (salgadosList) {
            carrinhoSalgados.innerText = "Item: " + salgadosList;
            carrinhodiv1.appendChild(carrinhoSalgados);
          }
        } else {
          carrinhoSalgados.innerText = "Salgados: Nenhum salgado selecionado";
          carrinhodiv1.appendChild(carrinhoSalgados);
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
    // Evento para remover item do carrinho
    carrinhoButton.addEventListener('click', () => {
      produtosCarrinho.splice(index, 1); // Remove o item do carrinho

      // Verifica se o carrinho ficou vazio após a remoção
      if (produtosCarrinho.length === 0) {
        localStorage.removeItem('produtosCarrinho'); // Remove a variável do localStorage
        modalCarrinho.classList.remove("show"); // Fecha o modal
      } else {
        saveCarrinhoToLocalStorage(); // Atualiza o localStorage
      }

      mostrarPedidos(); // Atualiza a exibição do carrinho
      contagemCarrinho();
    });

    // Adiciona o item ao container do carrinho
    carrinhoProdutos.appendChild(carrinhoItem);
  });

  // Atualiza o total no carrinho
  document.querySelector('.carrinho .total-itens h2').innerText = "R$ " + totalItens.toFixed(2);

  // Criar e adicionar opções de Retirada e Entrega
  adicionarOpcoesEntrega(carrinhoProdutos);

  adicionarOpcoesPagamento(carrinhoProdutos, totalItens);
}

// Função para adicionar opções de pagamento
function adicionarOpcoesPagamento(container, total) {
  if (document.querySelector('.metodo-pagamento')) return;

  const metodoPagamentoDiv = document.createElement("div");
  metodoPagamentoDiv.classList.add("metodo-pagamento");

  // Opção para pagamento em dinheiro
  const dinheiroContainer = document.createElement("div");
  dinheiroContainer.classList.add("opcao-pagamento");

  const dinheiroInput = document.createElement("input");
  dinheiroInput.type = "radio";
  dinheiroInput.id = "pagamentoDinheiro";
  dinheiroInput.name = "metodoPagamento";

  const dinheiroLabel = document.createElement("label");
  dinheiroLabel.htmlFor = "pagamentoDinheiro";
  dinheiroLabel.innerText = "Dinheiro";
  dinheiroLabel.classList.add("label-pagamento");

  dinheiroContainer.appendChild(dinheiroInput);
  dinheiroContainer.appendChild(dinheiroLabel);
  metodoPagamentoDiv.appendChild(dinheiroContainer);

  // Opção para pagamento com PIX
  const pixContainer = document.createElement("div");
  pixContainer.classList.add("opcao-pagamento");

  const pixInput = document.createElement("input");
  pixInput.type = "radio";
  pixInput.id = "pagamentoPix";
  pixInput.name = "metodoPagamento";

  const pixLabel = document.createElement("label");
  pixLabel.htmlFor = "pagamentoPix";
  pixLabel.innerText = "PIX";
  pixLabel.classList.add("label-pagamento");

  pixInput.addEventListener('change', async () => {
    if (pixInput.checked) {
      // Chama a função para gerar o QR Code de pagamento
      await solicitarQRCode(total);
      // Desabilita a opção Dinheiro se o QR Code foi gerado
      desabilitarPagamentoDinheiro();
    }
  });

  pixContainer.appendChild(pixInput);
  pixContainer.appendChild(pixLabel);
  metodoPagamentoDiv.appendChild(pixContainer);

  container.appendChild(metodoPagamentoDiv); // Adiciona a seção de método de pagamento ao carrinho

  // Chama a função de desativação ao inicializar
  desabilitarPagamentoDinheiro();
}


async function solicitarQRCode(valor) {
  // Recupera as informações do localStorage
  const qrCode = localStorage.getItem("qrCode");
  let txid = localStorage.getItem("txid"); // txid pode ser atualizado
  let expiracao = localStorage.getItem("expiracao");

  if (txid === null) {
    console.error("txid não encontrado no localStorage.");
  } else {
    console.log(`TXID recuperado do localStorage: ${txid}`);
  }

  // Se o QR Code e a transação já foram salvos e a expiração ainda é válida, exibe o QR Code
  if (qrCode && txid && expiracao && Date.now() < parseInt(expiracao, 10)) {
    console.log("QR Code encontrado no localStorage, exibindo...");
    exibirQRCode(qrCode, txid, parseInt(expiracao, 10));
    return; // Termina a execução da função
  }

  try {
    // Solicita o QR Code da API
    const response = await fetch('https://pagamento-lemon.vercel.app/api/create-qrcode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ valor }),
      mode: 'cors' // Define explicitamente o modo CORS
    });

    if (!response.ok) {
      throw new Error(`Erro de status HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log("Dados da API:", data);

    if (data.qrcode && data.qrcode.copiaECola) {
      // Gerar o QR Code diretamente com o código Copia e Cola
      expiracao = Date.now() + 600000; // 10 minutos
      localStorage.setItem("expiracao", expiracao.toString()); // Armazena a expiração no localStorage como string
      localStorage.setItem("qrCode", data.qrcode.copiaECola); // Armazena o código Copia e Cola
      localStorage.setItem("txid", data.qrcode.txid); // Armazena o txid
      txid = data.qrcode.txid; // Atualiza a variável txid
      console.log("txid armazenado:", txid); // Verifique se está correto

      exibirQRCode(data.qrcode.copiaECola, txid, expiracao); // Passa o valor da expiração
    } else {
      console.error("Erro ao gerar QR Code:", data.error);
    }
  } catch (error) {
    console.error("Erro ao solicitar QR Code:", error);
  }
}

// Função verificarPagamento global
const verificarPagamento = (txid) => {
  return new Promise((resolve, reject) => {
    const intervaloVerificacao = setInterval(() => {
      fetch(`https://pagamento-lemon.vercel.app/api/verificar-status?txid=${txid}`)
        .then(response => response.json())
        .then(data => {
          if (data.status === "CONCLUIDA") {
            clearInterval(intervaloVerificacao); // Para o intervalo de verificações

            // Exibe a mensagem de confirmação de pagamento se o elemento existir
            const mensagemConfirmacao = document.getElementById("mensagemConfirmacaoPagamento");
            if (mensagemConfirmacao) {
              mensagemConfirmacao.style.display = "block";
            }

            // Oculta o QR Code, código Copia e Cola, e timer se os elementos existirem
            const qrCodeImage = document.getElementById("qrCodeImage");
            if (qrCodeImage) {
              qrCodeImage.style.display = "none";
            }

            const copiarBtn = document.getElementById("copiarBtn");
            if (copiarBtn) {
              copiarBtn.style.display = "none";
            }

            const timer = document.getElementById("timer");
            if (timer) {
              timer.style.display = "none";
            }

            // Remove o texto "Código Copia e Cola:" se o elemento existir
            const codigoTexto = document.querySelector("p strong");
            if (codigoTexto) {
              codigoTexto.style.display = "none";
            }

            resolve("CONCLUIDA"); // Resolve a Promise com status "CONCLUIDA"
          } else if (data.status === "PENDENTE") {
            console.log("Aguardando pagamento...");
          }
        })
        .catch(err => {
          clearInterval(intervaloVerificacao); // Para o intervalo se houver erro
          reject(err); // Rejeita a Promise com o erro
        });
    }, 5000); // Verifica o pagamento a cada 5 segundos
  });
};


// Função exibirQRCode
function exibirQRCode(copiaECola, txid, expiracao) {
  QRCode.toDataURL(copiaECola, function (err, url) {
    if (err) {
      console.error("Erro ao gerar QR Code:", err);
      return;
    }

    console.log(url); // Verifique a URL gerada para o QR Code

    // Cria a div da modal
    const qrCodeModal = document.createElement("div");
    qrCodeModal.classList.add("modal-qrcode");

    // Cria a div "modal-content" que irá conter o conteúdo da modal
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    // Cria a imagem do QR Code
    const qrCodeImg = document.createElement("img");
    qrCodeImg.src = url; // URL do QR Code gerado
    qrCodeImg.alt = "QR Code para pagamento PIX";
    qrCodeImg.id = "qrCodeImage"; // Atribui um ID para poder ocultá-lo posteriormente

    // Cria o botão de copiar
    const copiarBtn = document.createElement("button");
    copiarBtn.innerText = "Copiar Código";
    copiarBtn.id = "copiarBtn"; // Atribui um ID para poder ocultá-lo posteriormente
    copiarBtn.addEventListener("click", () => copiarCopiaCola(copiaECola));

    // Cria o timer para exibir a expiração
    const timerElement = document.createElement("p");
    timerElement.id = "timer"; // Atribui um ID para poder ocultá-lo posteriormente

    let tempoRestante = expiracao - Date.now(); // Usar a expiração fixa passada como parâmetro

    if (tempoRestante <= 0) {
      alert("QR Code expirado!");
      return;
    }

    // Função para atualizar o timer
    const atualizarTempo = () => {
      let minutos = Math.floor(tempoRestante / 60000);
      let segundos = Math.floor((tempoRestante % 60000) / 1000);
      timerElement.textContent = `Expira em: ${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
    };

    atualizarTempo();

    // Atualiza o tempo a cada segundo
    const contadorExpiracao = setInterval(() => {
      tempoRestante -= 1000;
      if (tempoRestante <= 0) {
        clearInterval(contadorExpiracao);
        alert("QR Code expirado!");
      } else {
        atualizarTempo();
      }
    }, 1000);

    // Cria o botão de fechar
    const fecharModal = document.createElement("button");
    fecharModal.innerText = "Fechar";
    fecharModal.addEventListener("click", () => {
      document.body.removeChild(qrCodeModal);

      // Limpar o localStorage ao fechar a modal
      localStorage.removeItem("qrCode");
      localStorage.removeItem("expiracao");

      document.getElementById("pagamentoPix").checked = false;
    });

    // Adiciona os elementos à "modal-content"
    modalContent.appendChild(qrCodeImg);
    modalContent.appendChild(copiarBtn);
    modalContent.appendChild(timerElement);
    modalContent.appendChild(fecharModal);

    // Cria a mensagem de confirmação de pagamento
    const mensagemConfirmacaoPagamento = document.createElement("div");
    mensagemConfirmacaoPagamento.id = "mensagemConfirmacaoPagamento";
    mensagemConfirmacaoPagamento.style.display = "none";
    mensagemConfirmacaoPagamento.style.textAlign = "center";

    const icon = document.createElement("span");
    icon.style.fontSize = "30px";
    icon.style.color = "green";
    icon.innerText = "✔️";

    const texto = document.createElement("p");
    texto.style.fontSize = "18px";
    texto.style.color = "#4CAF50";
    texto.innerText = "Pagamento recebido com sucesso!";

    mensagemConfirmacaoPagamento.appendChild(icon);
    mensagemConfirmacaoPagamento.appendChild(texto);

    // Adiciona a mensagem de confirmação ao conteúdo da modal
    modalContent.appendChild(mensagemConfirmacaoPagamento);

    // Adiciona a "modal-content" à modal
    qrCodeModal.appendChild(modalContent);

    // Adiciona a modal ao corpo do documento
    document.body.appendChild(qrCodeModal);

    // Salva o QR Code e o txid no localStorage
    localStorage.setItem("qrCode", copiaECola);
    localStorage.setItem("expiracao", expiracao); // Armazena a expiração original

    // Agora passa o txid para a função verificarPagamento
    verificarPagamento(txid).then(status => {
      if (status === "CONCLUIDA") {
        console.log("Pagamento concluído.");
      }
    }).catch(error => {
      console.error("Erro ao verificar status de pagamento:", error);
    });

  });
}

// Função para copiar o código Copia e Cola
function copiarCopiaCola(codigo) {
  navigator.clipboard.writeText(codigo)
    .then(() => alert("Código Copia e Cola copiado!"))
    .catch(err => console.error("Erro ao copiar o código:", err));
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

async function finalizarECapturarPedido() {
  try {
    await verificarConexao();

    // Verificação de retirada/local e endereço
    const retirarLocalChecked = document.getElementById('retirarLocal')?.checked;
    const fazerEntregaChecked = document.getElementById('fazerEntrega')?.checked;
    const enderecoEntrega = document.getElementById('enderecoEntrega')?.value.trim();

    if (!retirarLocalChecked && !fazerEntregaChecked) {
      alert('Por favor, selecione uma opção de recebimento.');
      return;
    }
    if (fazerEntregaChecked && !enderecoEntrega) {
      alert('Por favor, preencha o campo de endereço.');
      return;
    }

    const formaEntrega = retirarLocalChecked
      ? "Retirar no Local - Av. das Monções, 846 - Parque Recanto Monica - 08592-150"
      : `Fazer Entrega em: ${enderecoEntrega}`;

    const elementoParaCaptura = document.getElementById('conteudo');

    // Remover qualquer informação de entrega anterior
    const informacaoEntregaAnterior = document.getElementById("informacaoEntrega");
    if (informacaoEntregaAnterior) informacaoEntregaAnterior.remove();

    // Adicionar nova informação de entrega
    const informacaoEntrega = document.createElement('p');
    informacaoEntrega.id = "informacaoEntrega";
    informacaoEntrega.innerText = formaEntrega;
    informacaoEntrega.style.color = 'white';
    elementoParaCaptura.appendChild(informacaoEntrega);

    const pagamentoSelecionado = document.querySelector('input[name="metodoPagamento"]:checked');

    if (!pagamentoSelecionado) {
      alert('Por favor, selecione um método de pagamento.');
      return;
    }

    const metodoPagamento = pagamentoSelecionado.id;
    let metodoPagamentoTexto = "";

    if (metodoPagamento === "pagamentoPix") {
      metodoPagamentoTexto = "Pagamento via PIX";
      const txid = localStorage.getItem("txid");

      if (!txid) {
        alert('Erro: Transação PIX não encontrada.');
        return;
      }

      let statusPagamento = await verificarPagamento(txid);

      while (statusPagamento !== "CONCLUIDA") {
        if (statusPagamento === null) {
          alert('Erro ao verificar o pagamento.');
          return;
        }
        if (statusPagamento === "PENDENTE") {
          console.log("Aguardando pagamento...");
        } else {
          console.log("Status desconhecido:", statusPagamento);
        }

        // Aguarda 5 segundos antes de verificar novamente
        await new Promise(resolve => setTimeout(resolve, 5000));
        statusPagamento = await verificarPagamento(txid);
      }

      localStorage.removeItem("txid");
    } else if (metodoPagamento === "pagamentoDinheiro") {
      metodoPagamentoTexto = "Pagamento em Dinheiro";
    }

    // Remover qualquer informação de pagamento anterior
    const informacaoPagamentoAnterior = document.getElementById("informacaoPagamento");
    if (informacaoPagamentoAnterior) informacaoPagamentoAnterior.remove();

    // Adicionar nova informação de pagamento
    const informacaoPagamento = document.createElement('p');
    informacaoPagamento.id = "informacaoPagamento";
    informacaoPagamento.innerText = metodoPagamentoTexto;
    informacaoPagamento.style.color = 'white';
    elementoParaCaptura.appendChild(informacaoPagamento);

    await capturarPedido(metodoPagamentoTexto);
    finalizarCompra();

    informacaoEntrega.remove();
    informacaoPagamento.remove();

  } catch (error) {
    console.error(error);
    alert('Erro ao processar o pedido. Você será redirecionado.');
    window.location.href = 'offline.html';
  }
}


// Desabilita a opção "Dinheiro" se o PIX foi concluído
function desabilitarPagamentoDinheiro() {
  const pagamentoDinheiro = document.getElementById('pagamentoDinheiro');
  const txid = localStorage.getItem("txid");

  console.log("TXID:", txid); // Verifica se o TXID está presente

  if (txid) {
    verificarPagamento(txid).then(status => {
      console.log("Status do pagamento:", status); // Verifique o status retornado
      if (status === "CONCLUIDA") {
        // Desativa a opção de pagamento em dinheiro
        if (pagamentoDinheiro) {
          pagamentoDinheiro.disabled = true;
          console.log('Pagamento via PIX concluído. Não é possível selecionar Dinheiro após finalizar um pagamento PIX.');
        } else {
          console.warn("Elemento pagamentoDinheiro não encontrado no DOM.");
        }
      }
    }).catch(err => {
      console.error("Erro ao verificar o pagamento:", err);
      alert('Erro ao verificar o status do pagamento. Tente novamente.');
    });
  }
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
        const metodoPagamentoDiv = document.querySelector('.metodo-pagamento'); // Selecione a div de métodos de pagamento
        const originalDisplayEntrega = metodoEntregaDiv.style.display;
        const originalDisplayPagamento = metodoPagamentoDiv.style.display;

        loader.style.display = 'block';
        botao.disabled = true;
        mensagemOrientacao.style.opacity = '0';

        // Esconde os métodos de entrega e pagamento temporariamente
        metodoEntregaDiv.style.display = 'none';
        metodoPagamentoDiv.style.display = 'none';
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
            let mensagemTexto = 'Olá Denize! Aqui está o meu pedido:\n';

            produtosCarrinho.forEach((item, index) => {
              let precoTotalItem = 0;
              let itemTexto;

              // Verifica se o produto é do tipo 'salgados' para formatar a string
              if (item.produto.type.toLowerCase() === 'salgados') {
                itemTexto = `${index + 1}. ${item.produto.type} - ${item.produto.name}`; // Sem quantidade
              } else {
                itemTexto = `${index + 1}. ${item.produto.type} - ${item.produto.name} - Quantidade: ${item.quantidade}`; // Com quantidade
              }

              let precoBase = 0;

              // Preço base do produto
              if (item.produto.type === 'Sorvete') {
                const precoSize = item.produto.price.find(p => p.size === item.size);
                if (precoSize) {
                  precoBase = precoSize.value;
                  precoTotalItem += precoBase * item.quantidade; // Inclui o preço do sorvete
                  itemTexto += `, Tamanho: ${item.size}`;
                } else {
                  console.warn(`Tamanho não encontrado para Sorvete: ${item.size}`);
                  itemTexto += `, Tamanho: Não especificado`;
                }
              } else if (item.produto.type.toLowerCase() === 'salgados' && item.salgados) {
                // Cálculo para salgados
                const salgadosTotal = item.salgados.reduce((total, salgado) => {
                  const salgadoInfo = salgados.find(s => s.nome === salgado.nome);
                  if (salgadoInfo) {
                    return total + (salgadoInfo.price * salgado.quantidade); // Preço baseado na quantidade
                  }
                  return total; // Retorna o total se não encontrar o salgado
                }, 0);
                precoTotalItem += salgadosTotal; // Adiciona o total dos salgados
                itemTexto += `, Itens: ${item.salgados.map(salgado => `${salgado.nome} (${salgado.quantidade})`).join(', ')}`;
              } else {
                precoBase = item.produto.price || 0;
                precoTotalItem += precoBase * item.quantidade; // Inclui o preço do hamburguer ou pastel
              }

              // Adicionando a lógica para não incluir preço base e total se for salgado
              if (item.produto.type.toLowerCase() !== 'salgados') {
                itemTexto += ` - Preço Base: R$ ${(precoBase * item.quantidade).toFixed(2)} = Total Item: R$ ${precoTotalItem.toFixed(2)}`;
              }

              // Adicionando descrições e acompanhamentos
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

              mensagemTexto += itemTexto + "\n";
            });

            mensagemTexto += `${totalElement.innerText}`;

            // Adicionando o método de pagamento escolhido na mensagem
            const metodoPagamentoEscolhido = document.querySelector('input[name="metodoPagamento"]:checked');
            if (metodoPagamentoEscolhido) {
              const metodoPagamentoTexto = metodoPagamentoEscolhido.nextElementSibling.textContent.trim();
              mensagemTexto += `\nMétodo de Pagamento: ${metodoPagamentoTexto}\n`;
            } else {
              mensagemTexto += `Método de Pagamento: Não especificado\n`; // Caso nenhum esteja selecionado
            }

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
          metodoEntregaDiv.style.display = originalDisplayEntrega;
          metodoPagamentoDiv.style.display = originalDisplayPagamento;
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
  // Carrega os produtos do carrinho
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
      alert("Algo inesperado ocorreu, mas salvamos o seu último pedido.");
    } catch (error) {
      console.error('Erro ao carregar o carrinho do localStorage:', error);
      produtosCarrinho = []; // Reinicializa o carrinho em caso de erro
    }
  } else {
    produtosCarrinho = []; // Inicia um carrinho vazio se não houver dados
  }

  const qrCode = localStorage.getItem('qrCode');
  const txid = localStorage.getItem('txid');
  const expiracao = localStorage.getItem('expiracao');

  if (qrCode && txid && expiracao) {
    const tempoRestante = expiracao - Date.now();
    if (tempoRestante > 0) {
      // Se o QR Code ainda não expirou, exibe o QR Code na página
      exibirQRCode(qrCode, txid, expiracao); // Passa o tempo de expiração
    } else {
      console.log("QR Code expirado.");
      // Limpar os dados expirados
      localStorage.removeItem('qrCode');
      localStorage.removeItem('txid');
      localStorage.removeItem('expiracao');
    }
  } else {
    console.log("Não há QR Code armazenado ou dados de pagamento.");
  }


  // Se o carrinho estiver vazio, atualiza a exibição
  if (produtosCarrinho.length === 0) {
    document.querySelector('.contador-carrinho').innerText = "------"; // Exibe o total padrão
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Carrega o carrinho do localStorage ao iniciar
  loadCarrinhoFromLocalStorage();

  if (produtosCarrinho.length > 0) {
    mostrarPedidos(); // Exibe o carrinho apenas se houver itens
  }

  // Chama a função para desabilitar o pagamento em dinheiro ao carregar a página
  desabilitarPagamentoDinheiro();
});


// Adiciona um evento de clique a todos os elementos com a classe "scroll-icon"
document.querySelectorAll(".scroll-icon").forEach(icon => {
  icon.addEventListener("click", function (event) {
    event.preventDefault(); // Impede o comportamento padrão
    const id = this.getAttribute('data-target'); // Pega o ID da seção do atributo data-target
    const targetElement = document.querySelector(id); // Seleciona a seção de destino

    if (targetElement) {
      const to = targetElement.offsetTop; // Pega a posição do elemento
      window.scroll({
        top: to - 160, // Desloca a posição
        behavior: "smooth", // Faz a rolagem suave
      });
    }
  });
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

function scrollToFooter() {
  const footer = document.querySelector('footer');
  const footerPosition = footer.getBoundingClientRect().top + window.scrollY; // Posição do footer
  const headerHeight = document.querySelector('header').offsetHeight; // Altura do cabeçalho

  // Rolagem suave para a posição do footer, ajustada pela altura do cabeçalho
  window.scrollTo({
    top: footerPosition - headerHeight, // Ajusta a rolagem
    behavior: 'smooth'
  });
}
