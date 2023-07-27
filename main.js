// Criar a tela
function setup() {
    canvas = createCanvas(400, 400);
    // colocar a tela no centro
    canvas.center();
    // definir a cor de fundo da tela em white
    background("white");


    // esta função é acionada quando o usuário clica na tela e libera no clique do mouse.
    canvas.mouseReleased(classifyCanvas);
    // inicializaremos os dispositivos disponíveis
    synth = window.speechSynthesis;
}


// carregar o modelo doodlenet e chamamos a função ml5.imageClassifier() para
// verificar se o modelo foi carregado
function preload() {
    // imageClassifier é uma função predefinida de ml5.js que é usada para acionar a
    // função de classificação de imagem ml5.js
    classifier = ml5.imageClassifier('DoodleNet');
}










// Limpar a tela
function clearCanvas() {
    background("white");
}




function draw() {
    // definir a espessura do traço para desenhar qualquer imagem
    strokeWeight(2);
    // definir a cor padrão do traço como preto
    stroke(1);


    if(mouseIsPressed) {
        // função line(), que é usada para desenhar linhas na tela
        line(pmouseX, pmouseY, mouseX, mouseY);
        // pmouseX e pmouseY contém as coordenadas anteriores;
        // mouseX e mouseY são as novas coordenadas
    }
}




function classifyCanvas() {
// classifier ● é a variável que contém o modelo doodlenet.
//  classify é uma função predefinida de ml5.js que é usada para comparar imagens com o
// modelo e obter os resultados
    classifier.classify(canvas, gotResult);
}






// gotResult- Esta função é chamada quando a previsão é feita, e dentro da qual
// conseguimos acessar o resultado da previsão. Isso manterá o resultado da
// comparação


// quando definimos a função gotResult, precisamos passar o erro e os results dentro
// da função
function gotResult(error, results) {


//     verificamos se houve algum erro. Se sim, então precisamos consolar o erro,
// senão teremos que consolar os resultados e ver quais são.
    if(error) {
        console.error(error);
    }
    console.log(results);
    document.getElementById('label').innerHTML = 'Label: ' + results[0].label;


//     função math.round() é usada para arredondar o valor para o
// inteiro mais próximo. E então concatenamos o sinal ‘%’ ao valor
    document.getElementById('confidence').innerHTML = 'Precisão: ' + Math.round(results[0].confidence * 100) + '%';




// ● utterThis: é uma variável na qual armazenamos o texto convertido em fala.
// ● SpeechSynthesisUtterance: é a função de uma API que converte texto em fala.
// ● Estamos usando uma palavra-chave new (nova) porque, para cada próximo texto,
// queríamos convertê-lo em fala.
// ● result: contém o texto que é o nome do objeto desenhado -> results[0].label.
// ● replace('_', ' '): é para remover o underline das palavras
    utterThis = new SpeechSynthesisUtterance(results[0].label);


// ● synth - aqui armazenamos a API no ponto 1.
// ● speak() - função speak() é uma função predefinida da API.
// ● utterThis - contém o valor convertido de texto em fala que queremos que o sistema fale.
    synth.speak(utterThis);
}
