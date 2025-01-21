document.addEventListener("DOMContentLoaded", () => {
    fetch('https://seu-backend.herokuapp.com/api/produtos')
      .then(response => response.json())
      .then(produtos => {
        const container = document.getElementById('produtos-container');
        produtos.forEach(produto => {
          const produtoDiv = document.createElement('div');
          produtoDiv.classList.add('produto');
          produtoDiv.innerHTML = `
            <h3>${produto.nome}</h3>
            <p>Modelo: ${produto.modelo}</p>
            <p>${produto.descricao}</p>
            <p>Preço: R$${produto.preco}</p>
            <p>Estoque: ${produto.quantidade}</p>
          `;
          container.appendChild(produtoDiv);
        });
      })
      .catch(error => console.log('Erro ao carregar os produtos', error));
  });
  