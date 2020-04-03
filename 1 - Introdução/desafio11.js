//Construção e Impressão de objetos
const empresa = {
    nome: 'RocketSeat',
    Cor: 'Roxo',
    Foco: 'Programação',
    Endereço: {
        Rua: 'Rua Guilherme Gembala',
        Número: 260
    }
}

console.log(`A empresa ${empresa.nome} está localizada em ${empresa.Endereço.Rua}, 
${empresa.Endereço.Número}`);

//Vetores e objetos
const programador = {
    nome: 'Dalto',
    idade: 56,
    tecnologias: [
        {nome: 'JavaScript', especialidade: 'Web/Mobile'},
        {nome: 'Java', especialidade: 'Desktop'},
        {nome: 'C++', especialidade: 'Desktop'}
    ]
}

console.log(`O usuário ${programador.nome} tem ${programador.idade} anos e usa a tecnologia 
${programador.tecnologias[0].nome} com especialidade em ${programador.tecnologias[0].especialidade}.`);