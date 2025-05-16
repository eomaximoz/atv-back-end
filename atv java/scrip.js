// Função para carregar os produtos do LocalStorage
function carregarProdutos() {
    let produtos = localStorage.getItem('produtos');
    if (produtos) {
      return JSON.parse(produtos);
    } else {
      return [];
    }
  }
  
  // Função para salvar os produtos no LocalStorage
  function salvarProdutos(produtos) {
    localStorage.setItem('produtos', JSON.stringify(produtos));
  }
  
  // Função para exibir os produtos na lista
  function exibirProdutos() {
    const listaProdutos = document.getElementById('listaProdutos');
    listaProdutos.innerHTML = ''; // Limpar a lista antes de renderizar
  
    const produtos = carregarProdutos();
    
    if (produtos.length === 0) {
      listaProdutos.innerHTML = '<li>Não há produtos cadastrados.</li>';
      return;
    }
  
    produtos.forEach(produto => {
      const li = document.createElement('li');
      li.textContent = `Produto: ${produto.nome}, Quantidade: ${produto.quantidade}, Preço: R$${produto.preco.toFixed(2)}`;
      listaProdutos.appendChild(li);
    });
  }
  
  // Função para adicionar um produto
  function adicionarProduto() {
    const nomeProduto = document.getElementById('nomeProduto').value;
    const quantidadeProduto = document.getElementById('quantidadeProduto').value;
    const precoProduto = document.getElementById('precoProduto').value;
  
    if (!nomeProduto || !quantidadeProduto || !precoProduto) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
  
    const novoProduto = {
      nome: nomeProduto,
      quantidade: parseInt(quantidadeProduto),
      preco: parseFloat(precoProduto)
    };
  
    const produtos = carregarProdutos();
    produtos.push(novoProduto);
    salvarProdutos(produtos);
  
    document.getElementById('nomeProduto').value = '';
    document.getElementById('quantidadeProduto').value = '';
    document.getElementById('categoriaProduto').value = '';
    document.getElementById('unidadeProduto').value = '';

  
    exibirProdutos();
  }
  
  // Função para buscar um produto
  function buscarProduto() {
    const nomeBusca = document.getElementById('buscaProduto').value.toLowerCase();
    const produtos = carregarProdutos();
    const produtosFiltrados = produtos.filter(produto =>
      produto.nome.toLowerCase().includes(nomeBusca)
    );
  
    const listaProdutos = document.getElementById('listaProdutos');
    listaProdutos.innerHTML = '';
  
    if (produtosFiltrados.length === 0) {
      listaProdutos.innerHTML = '<li>Nenhum produto encontrado.</li>';
    } else {
      produtosFiltrados.forEach(produto => {
        const li = document.createElement('li');
        li.textContent = `Produto: ${produto.nome}, Quantidade: ${produto.quantidade}, Preço: R$${produto.preco.toFixed(2)}`;
        listaProdutos.appendChild(li);
      });
    }
  }
  
  // Carregar os produtos ao iniciar a página
  window.onload = function() {
    exibirProdutos();
  };
  