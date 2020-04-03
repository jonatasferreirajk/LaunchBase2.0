//Cálculo IMC

const nome = "Dalto";
const peso = 70;
const altura = 1.76;

const imc = peso / (altura * altura);

if(imc >= 30){
    console.log(nome + ' você está acima do peso!');
}else{
    console.log(nome + ' você não está acima do peso!');
}

//Cálculo de aposentadoria
const nome2 = 'Zeza';
const sexo = 'F';
const idade = 54;
const contribuicao = 30;

if(sexo == 'M' || contribuicao >= 35){
    if((idade + contribuicao) >= 95){
        console.log(nome2 + ' você pode se aposentar!');
    }else{
        console.log(nome2 + ' você ainda não pode se aposentar!');
    }
}else if(sexo == 'F' || contribuicao >= 30){
    if((idade + contribuicao) >= 85){
        console.log(nome2 + ' você pode se aposentar!');
    }else{
        console.log(nome2 + ' você ainda não pode se aposentar!');
    }
}