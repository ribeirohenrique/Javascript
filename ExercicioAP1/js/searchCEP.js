//Instanciando o Botão
let btnCEP = document.querySelector('button');

//Ocultando labels
end.innerHTML = "";
labelFrete.innerHTML = "";
labelTotal.innerHTML = "";

//Obtendo a ação realização no click do botão
btnCEP.addEventListener('click', function () {

  let cep = document.querySelector('#cep').value;
  let valor = parseFloat( document.querySelector('#valor').value);
  let api = `https://viacep.com.br/ws/${cep}/json/`;
  let request = new XMLHttpRequest();
  request.open('GET', api);

  request.onload = function () {
    console.dir(JSON.parse(request.responseText));
    console.log(JSON.parse(request.responseText).localidade);
    console.log(JSON.parse(request.responseText).uf)
    console.log("por:" + por);

    //Transforma o JSON retornado em um objeto do JavaScript
    let address = JSON.parse(request.responseText);
    let por = 0.0;
    
    let cep = document.querySelector('#cep');
    cep.innerHTML = address.cep;

    let street = document.querySelector('#street');
    street.innerHTML = address.logradouro;

    let district = document.querySelector('#district');
    district.innerHTML = address.bairro;

    let city = document.querySelector('#city');
    city.innerHTML = address.localidade;

    let uf = document.querySelector('#uf');
    uf.innerHTML = address.uf;

    let msg = document.querySelector('#msg');
    let frete = document.querySelector('#valorFrete');
    let total = document.querySelector('#valorTotal');

    por = getState(address.uf);

    //Calcula o frete    
    if(!(isNaN(valor))){
      var valorFrete = valor * por;
      labelFrete.innerHTML = "<b>Valor do Frete:</b>";
      frete.innerHTML = "R$ " + valorFrete.toFixed(2);

      var valorTotal = valor + (valor * por);
      labelTotal.innerHTML = "<b>Valor Total:</b>";
      total.innerHTML = "R$ " + valorTotal.toFixed(2);

      //Imprime valores dos labels
      msg.innerHTML = "";
      end.innerHTML = "<b>Endereço:</b>";

    }else{
      msg.innerHTML = "Informe o valor da mercadoria no campo VALOR";
      frete.innerHTML = "";
      total.innerHTML = "";
      street.innerHTML = "";
      district.innerHTML = "";
      city.innerHTML = "";
      uf.innerHTML = "";
      cep.innerHTML = "";
      end.innerHTML = "";
      labelFrete.innerHTML = "";
      labelTotal.innerHTML = "";
      valorTotal.innerHTML = "";
      valorFrete.innerHTML = "";
    }
}

  request.send();
  
});

//$("#cep").mask("00.000-000");
//$("#valor").mask("R$00,00");

//Base para retorno dos valores por UF
function getState(estado){
  switch(estado){
    case "RO":
      return 1.4;
    case "AC":
      return 1.45;
    case "AM":
      return 1.3;
    case "RR":
      return 1.4;
    case "PA":
      return 1.45;
    case "AP":
      return 1.45;
    case "TO":
      return 0.85;
    case "MA":
      return 1.45;
    case "PI":
      return 1.4;
    case "CE":
      return 1.0;
    case "RN":
      return 1.4;
    case "PB":
      return 0.95;
    case "PE":
      return 0.95;
    case "AL":
      return 0.9;
    case "SE":
      return 0.85;
    case "BA":
      return 0.9;
    case "MG":
      return 0.8;
    case "ES":
      return 0.7;
    case "RJ":
      return 0.6;
    case "PR":
      return 0.4;
    case "SC":
      return 0.5;
    case "RS":
      return 0.6;
    case "MS":
      return 0.6;
    case "MT":
      return 0.65;
    case "GO":
      return 0.55;
    case "DF":
      return 0.55;
    case "SP":
      return 0.3;      
    default:
      return 0.0;
  }
}