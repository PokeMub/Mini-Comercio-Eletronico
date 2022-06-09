const db = firebase.firestore();
const produtos = db.collection('compra');

const listaElemento = document.querySelector('#lista__produtos');



const criarItem = (produto) => {

    if(produto.unidades == 434430){

        return `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2.2.3">
        <div class="card text-center bg-light">
          <div class="card-header text-dark">
           R$ ${produto.preco} a Unidade
          </div>
          <div class="card-body">
            <h5 class="card-title text-dark">${produto.name}</h5>
          </div>
          <div class="card-footer">
            <div class="input-group">
              <input type="text" class="number form-control" id="IDDOPRODUTO" value="0">
              <span class="input-group-btn">
                <button disabled id="submit" type="button" class="btn btn-primary btn-comprar">
                <span>Sem Estoque</span>
              </button>
            </span>
          </div>
            <small class="text-danger">${produto.unidades} Unidades em estoque</small>
          </div>
        </div>
      </div>
`
    }else{

    return `
    <div class="container" id="container">
<div class="content">
  <div class="row">
    <div class="col-md-12 col-lg-8">
      <div class="items">
        <div class="product">
          <div class="info">
            <div class="product-details">
              <div class="row justify-content-md-center">
                <div class="col-md-6 product-detail">
                  <h5>Compras Efetuadas</h5>
                  <div class="product-info text-white">
                    <p><b>ID da Compra: </b><span id="product-description">${produto.iddecompra}</span><br>
                      <br>
                    <b>ID do Comprador: </b>${produto.id}<br>
                    <br>
                    <b>Produto Comprado: </b>${produto.description}<br>
                    <br>
                    <b>Quantidades Compradas: </b>${produto.quantidade}<br>
                    <br>
                    <b>Preço a Unidade:</b> R$ <span id="unit-price">${produto.price}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>
</div>
<h1></h1>
<br>

`
    }
}


const renderizarLista = (arrayProdutos) => {
    listaElemento.innerHTML = arrayProdutos.map((produto) => {

        return criarItem(produto)

    }).join(".")
}

produtos.get().then((querySnapshot) => {

  const arrayProdutos = querySnapshot.docs.map(item => item.data());
  renderizarLista(arrayProdutos);
   
});