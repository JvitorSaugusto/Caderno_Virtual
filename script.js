document.addEventListener('DOMContentLoaded',()=>{/*Faz com que o código só seja executado após todo conteudo html e css ser carregado */

const pincel = {
    //no inicio os valores estão false e null, pois n temos movimento do mouse/pincel assim que o site se inicia.
    ativo: false,
    movendo: false,
    pos:{x:0,y:0},
    posAnterior: null
}

const tela = document.querySelector('#tela')
const contexto = tela.getContext('2d') /*Quando desenhamos pelo JS não desnehamos na tela e sim no contexto, aqui estamos criando este contexto*/

tela.width =364; /*Garantindo que a tela saiba as medidas do JS */
tela.height =700;

//contexto.lineWidth = ;  ALTERA TAMANHO
//contexto.strokeStyle = ;  ALTERA COR

const desenharLinha = (linha)=> {

contexto.beginPath(); /*Inicio do desenho/inico do seu caminho*/
contexto.moveTo(linha.posAnterior.x, linha.posAnterior.y); /*Movimento do seu cursor enquanto desenha */
contexto.lineTo(linha.pos.x, linha.pos.y) /*Até onde sua linha vai */
contexto.stroke(); /*Aparecer o desenho */
}

tela.onmousedown = (evento)=>{console.log('Mouse pressionado'); pincel.ativo = true}; //pincel ativa ao clicar e segurar
tela.onmouseup = (evento)=>{console.log('Mouse solto');  pincel.ativo = false}; //desativa ao soltar o mouse

tela.onmousemove = (evento) => {
    console.log('Mouse movido');
    pincel.pos.x = evento.clientX
    pincel.pos.y = evento.clientY
    pincel.movendo = true;
}

//tela esta na frente do comando pois só queremos q esses eventos  ocorram nela e em mais nada. Evento client.x mapeia a posição em x, assim atualizando o pincel.

const ciclo = () =>{
    if (pincel.ativo && pincel.movendo && pincel.posAnterior) {
        desenharLinha({pos:pincel.pos, posAnterior: pincel.posAnterior})
        pincel.movendo = false;
    }
    pincel.posAnterior = {x: pincel.pos.x, y: pincel.pos.y}

    setTimeout(ciclo, 10);

} 
//verificando se o pincel esta ativo, se movendo e a posição anterior do mesmo, depois chamando o desenharLinha e passar um obj com pos e posAnterior usando os pinceis, e sempre q parar de mover o pincel, o pincel.movendo vai para false. Toda vez após esse ciclo meu pincel.posAnterior vai receber x e y da posição dos pinceis

ciclo ()
//desenharLinha({pos: {x:350, y:250},posAnterior: {x:10, y:10}})
})