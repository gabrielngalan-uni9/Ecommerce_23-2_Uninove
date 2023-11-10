document.addEventListener('DOMContentLoaded', function() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const botoesAdicionar = document.querySelectorAll('.adicionar-ao-carrinho');

  const produtoMain = document.getElementById('produto-main');
  if (produtoMain) {
    // Obter o ID do produto da URL
    const idProduto = new URLSearchParams(window.location.search).get('id');
    if (idProduto) {
        // Usar o ID para buscar e exibir os detalhes do produto
        exibirDetalhesProduto(idProduto);
    }
  }

  botoesAdicionar.forEach(botao => {
   botao.addEventListener('click', function() {
     const idProduto = botao.parentElement.dataset.id;
     adicionarAoCarrinho(idProduto);
   });
  });

  renderizarCarrinho();

  function adicionarAoCarrinho(id)
    {
      const itemIndex = carrinho.findIndex(produto => produto.id === id);
      if(itemIndex > -1)
      {
        carrinho[itemIndex].quantidade += 1;
      }
      else {
        carrinho.push({id, quantidade: 1});
      }

      localStorage.setItem('carrinho', JSON.stringify(carrinho));
      renderizarCarrinho();
    }

    function renderizarCarrinho() {
      const ulCarrinho = document.getElementById('itensCarrinho');
      if(!ulCarrinho) return;

      ulCarrinho.innerHTML = '';
      carrinho.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `Produto ${item.id} - Quantidade: ${item.quantidade}`;
        
        //Botão de Exclusão
        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = 'Excluir';
        botaoExcluir.onclick = function()
          {
            excluirDoCarrinho(index);//Adiciona a funcionalidade de exclusão
          };
        li.appendChild(botaoExcluir);
        ulCarrinho.appendChild(li);
    });
  }

  function excluirDoCarrinho(index)
    {
      carrinho.splice(index, 1); //Remove o item do carrinho
      localStorage.setItem('carrinho',JSON.stringify(carrinho));
      //Atualiza o local Storage
      renderizarCarrinho();//Atualiza a lista do carrinho na página
    }

  function exibirDetalhesProduto(id) {
    // Simulação de busca de produto com base no ID. Na prática, você usaria uma chamada AJAX ou Fetch aqui.
    let produtoExemplo;

    switch(id) {
        case "1":
            produtoExemplo = {
                id: id,
                nome: 'Produto Exemplo 1',
                preco: 'R$100',
                descricao: 'Descrição detalhada do produto 1.',
                imagem: 'url-da-imagem-produto-1'
            };
            break;
        case "2":
            produtoExemplo = {
                id: id,
                nome: 'Produto Exemplo 2',
                preco: 'R$150',
                descricao: 'Descrição detalhada do produto 2.',
                imagem: 'url-da-imagem-produto-2'
            };
            break;
        // Adicione mais cases conforme a quantidade de produtos.
        default:
            console.error("Produto não encontrado.");
            return;
    }

    // Compor a página com os detalhes do produto
    const html = `
        <article class="produto" data-id="${produtoExemplo.id}">
            <img src="${produtoExemplo.imagem}" alt="${produtoExemplo.nome}" class="img-produto">
            <h2>${produtoExemplo.nome}</h2>
            <p>${produtoExemplo.descricao}</p>
            <p>Preço: ${produtoExemplo.preco}</p>
            <button class="adicionar-ao-carrinho">Adicionar ao Carrinho</button>
        </article>
    `;
    produtoMain.innerHTML = html;
  }

  function filtrarProdutos(query) {
        // Filtra as seções e produtos baseados na query de busca
        const secoes = document.querySelectorAll('.secao-produtos');
        secoes.forEach(secao => {
            let secaoTemProdutoVisivel = false;
            const produtos = secao.querySelectorAll('.produto');
            produtos.forEach(produto => {
                const nomeProduto = produto.querySelector('h3').textContent.toLowerCase();
                const produtoVisivel = nomeProduto.includes(query);
                produto.style.display = produtoVisivel ? '' : 'none';
                if (produtoVisivel) secaoTemProdutoVisivel = true;
            });
            secao.style.display = secaoTemProdutoVisivel ? '' : 'none';
        });
    }
});
