// Variavel para nao repetir a funcao definirNumerosQuePodemSerSorteados toda vez que apertar o botao sortear (Para otimizar o processo)
var contador = 0
var numerosPossiveis = [];


// Funcao do Botao Sortear
function sortear(){
    // Pega os valores inseridos pelo usuário
    const quantidadeDeNumeros = parseInt(document.getElementById("quantidade").value);
    const de = parseInt(document.getElementById("de").value);
    const ate = parseInt(document.getElementById("ate").value);

    // Verifica se os valores inseridos são válidos
    if (quantidadeDeNumeros > (ate - de + 1) || quantidadeDeNumeros < 1 || de <= 0 || ate <= 0 || de > ate || isNaN(quantidadeDeNumeros) || isNaN(de) || isNaN(ate) || de == '' || ate == '' || quantidadeDeNumeros == ''){
        alert("Por favor, insira valores válidos.");
        return;
    } else{ // Se os valores inseridos são válidos
        // Se for o primeiro Click no Botao Sorter ele vai definir os numeros possiveis
        if (contador == 0){
            numerosPossiveis = definirNumerosQuePodemSerSorteados(de, ate);
        }
        // Tamanho do array de numeros possiveis
        const length = numerosPossiveis.length;
        // funcao que vai retornar a lista com os numeros sorteados
        numerosSorteadosFinal = sortearOsNumeros(numerosPossiveis,length,quantidadeDeNumeros)
        // Coloca os numeros sorteados no texto
        colocarNumerosSortedosNoTexto(numerosSorteadosFinal,quantidadeDeNumeros, de, ate);
        // Ativa o botao de Reiniciar
        ativarBotao("btn-reiniciar");
        contador++;
    }    
}   


// Funcao do botao reiniciar
function reiniciar(){
    // Limpa os campos
    limparCampos();
    // Volta o Texto para o Original 
    voltarTextoAoNormal();
    // Desativa o botao de reiniciar
    desativarBotao("btn-reiniciar");
}


// Funcao para Voltar o Texto ao Normal
function voltarTextoAoNormal(){
    const resultado = document.getElementById("resultado");
    resultado.querySelector(".texto__paragrafo").innerHTML = `Números sorteados:<br>nenhum até agora`;
}


// Funcao para limpar os campos
function limparCampos(){
    document.getElementById("quantidade").value = '';
    document.getElementById("de").value = '';
    document.getElementById("ate").value = '';
    contador = 0;
    numerosPossiveis = [];
}


// Lista com numero possiveis a serem sorteados
function definirNumerosQuePodemSerSorteados(de, ate){
    // Array que vai conter os numeros que podem ser sorteados
    const numerosPossiveis = [];    
    // Coloca em uma array os numeros que podem ser sorteados
    for (let i = de; i <= (ate); i++) {
        numerosPossiveis.push(i);
    }
    return numerosPossiveis; 
}


// Função que gera um indice aleatório
function indiceAleatorio(length){
    return parseInt(Math.random() * length);
}


//Funcao Para Evitar numeros repetidos
function verificaNumeroRepetido(numerosSorteadosFinais,indiceDoSorteado,lista){
    let indiceDoSorteadoNaoRepetido = indiceDoSorteado;
    if (numerosSorteadosFinais.includes(lista[indiceDoSorteado])){
        indiceDoSorteado = indiceAleatorio(lista.length);
        indiceDoSorteadoNaoRepetido = verificaNumeroRepetido(numerosSorteadosFinais,indiceDoSorteado,lista);
    }
    return indiceDoSorteadoNaoRepetido;
}


// Função que sorteia os números
function sortearOsNumeros(lista,length,quantidadeDeNumeros){
    // Array que vai conter os numeros sorteados
    const numerosSorteadosFinais = [];    
    // Coloca em uma array os numeros que podem ser sorteados
    for (let i = 0; i < quantidadeDeNumeros; i++) {
        // Gera um indice aleatório
        let indiceDoSorteado = indiceAleatorio(length);
        console.log(indiceDoSorteado);
        // Verifica se o numero sorteado já foi sorteado
        let indiceDoSorteadoNaoRepetido = verificaNumeroRepetido(numerosSorteadosFinais,indiceDoSorteado,lista);
        console.log(indiceDoSorteadoNaoRepetido);
        // Se não foi sorteado coloca ele na lista de numeros sorteados
        numerosSorteadosFinais.push(lista[indiceDoSorteadoNaoRepetido]);  
    console.log(numerosSorteadosFinais);     
    }
    return numerosSorteadosFinais;
}


// Funcao Para mudar o texto do Final
function colocarNumerosSortedosNoTexto(numerosSorteadosFinal,quantidadeDeNumeros,de,ate){
    // Pega o elemento que contem o texto
    const resultado = document.getElementById("resultado");
    // Coloca o texto com os numeros sorteados
    resultado.querySelector(".texto__paragrafo").innerHTML = `Para sortear outros números aperte em reiniciar!<br>${quantidadeDeNumeros} ${quantidadeDeNumeros > 1 ? 'números sorteados' : 'número sorteado'} entre ${de} e ${ate}:<br>${numerosSorteadosFinal.join(", ")}`;
}


// Funcao para ativar um botao
function ativarBotao(botao){
    const botaoSelecionado = document.getElementById(botao);
    botaoSelecionado.classList.replace("container__botao-desabilitado", "container__botao");
}


// Funcao para desativar um botao
function desativarBotao(botao){
    const botaoSelecionado = document.getElementById(botao);
    botaoSelecionado.classList.replace("container__botao", "container__botao-desabilitado");  
}



