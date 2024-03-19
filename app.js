
//let titulo = document.querySelector('h1')   //selecionando a tag do html
//titulo.innerHTML = 'jogo do Número Secreto';

//let paragrafo = document.querySelector('p')
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

//let numeroSecreto = gerarNumeroAleatorio();
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let tentaivas = 1;
let numeroSecreto = 7;


function exibirTextoNaTela(tag, texto)
{
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    ResponsiveVoice.speak(texto, 'brazilian Portuguese femele', {rate: 1.2});
}

function exibirMensagemInicial()
{
    exibirTextoNaTela('h1', 'jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute()  //Essa função realiza toda a trativa em relação ao numero secreto  
{
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto)
    {
        exibirTextoNaTela('h1', 'Acertou!');

        let palavraTentativa = tentaivas > 1? 'tentivas' : 'tentiva';
        let mensagemTentativas = `Voce descobriu o número secreto com ${tentaivas} ${palavraTentativa}!`;

        exibirTextoNaTela('p', mensagemTentativas);

        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else
    {
        if (chute > numeroSecreto)
        {
            exibirTextoNaTela('p', 'O número secreto é menor');
        }
        else
        {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
       tentaivas++;
       limparCampo();
       
    }
}

function gerarNumeroAleatorio() //Essa função gera o numero secreto trocando a cada nova tentativa 
{
   let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
   let qunatidadeElementosNaLista = listaDeNumerosSorteados.length;

   if(qunatidadeElementosNaLista == numeroLimite)
   {
        listaDeNumerosSorteados = [];
   }

   if(listaDeNumerosSorteados.includes(numeroEscolhido))
   {
        return gerarNumeroAleatorio();
   }
   else 
   {
     listaDeNumerosSorteados.push(numeroEscolhido);
     return numeroEscolhido;
   }
}


function limparCampo()
{
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo()
{
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentaivas = 1;
    exibirMensagemInicial();  
    document.getElementById('reiniciar').setAttribute('disabled',true);
}