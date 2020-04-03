//Intro
const user = {
    name: "Dalto",
    transactions: [],
    balance: 0
};

//Adicionar Transições
function createTransaction(transaction){
    user.transactions.push(transaction);

    if(transaction.type === 'credit'){
        user.balance = user.balance + transaction.value;
    }else{
        user.balance = user.balance - transaction.value;
    }
}

//Relatórios
function getHigherTransactionByType(type){
    let higherTransaction;
    let higherValue = 0;
    for(let transaction of user.transactions){
        if(transaction.type == type && transaction.value > higherValue){
            higherValue = transaction.value;
            higherTransaction = transaction;
        }
    }
    return higherTransaction;
}

function getAverageTransactionValue(){
    let sum = 0;
    for(let transaction of user.transactions){
        sum = sum + transaction.value;
    }
    return sum / user.transactions.length;
}

function getTransactionsCount(){
    let count = {
        credit: 0,
        debit: 0
    }
    for(let transaction of user.transactions){
        if(transaction.type === 'credit'){
            count.credit++;
        }else{
            count.debit++;
        }
    }
    return count;
}

//Testando
createTransaction({type: 'credit', value: 100});
createTransaction({type: 'credit', value: 150});
createTransaction({type: 'debit', value: 50});
createTransaction({type: 'debit', value: 30});

console.log(`O saldo da conta de ${user.name} é ${user.balance}.`);
console.log('A maior transação', getHigherTransactionByType('credit'));
console.log('A maior transação', getHigherTransactionByType('debit'));
console.log('O valor médio de total as transações é: ', getAverageTransactionValue());
console.log('O total de transações feitas é: ', getTransactionsCount());