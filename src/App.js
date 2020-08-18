import React, { Component } from 'react';
import Total from './components/total/Total';
import History from './components/history/History';
import Operation from './components/operation/Operation';

class App extends Component {

  state={
    transactions: [],
    description: '',
    amount: '',
    resultIncome: 0,
    resultExpenses: 0,
    totalBalance: 0,
  }


  addTransaction = add =>{

    const transactions = [...this.state.transactions];

    const transaction = {
      id: `cmr${(+new Date()).toString(16)}`,
      description: this.state.description,
      amount: this.state.amount,
      add
    }
    
    transactions.push(transaction);

    this.setState({
      transactions,
      description: '',
      amount: '',
    }, this.getTotalBalance);
  }

  addAmount = e => {
    this.setState({amount: parseFloat(e.target.value)});
  }
  addDescription = e =>{
    this.setState({description: e.target.value});
  }

  getIncome = () => this.state.transactions
    .reduce((acc,item) => item.add ? acc + item.amount : acc, 0);
  
  getExpenses = () => this.state.transactions
  .reduce((acc,item) => !item.add ? acc + item.amount : acc, 0);

  getTotalBalance() {
    const resultIncome= this.getIncome();
    const resultExpenses= this.getExpenses();
    
    const totalBalance= resultIncome - resultExpenses;

    this.setState({
      resultIncome,
      resultExpenses,
      totalBalance,
    });
  }

 


  render(){
    return (
      <>
        <header>
          <h1>Кошелек</h1>
          <h2>Калькулятор расходов</h2>
        </header>
  
        <main>
          <div className="container">
            <Total
              resultExpenses={this.state.resultExpenses}
              resultIncome={this.state.resultIncome}
              totalBalance={this.state.totalBalance}
            />
            <History 
              transactions={this.state.transactions}
            />
            <Operation 
              addTransaction={this.addTransaction} 
              addAmount={this.addAmount}
              addDescription={this.addDescription}
              description={this.state.description}
              amount={this.state.amount}
            />
          </div>
        </main>
  
      </>
    );
  }
}

export default App;

/*
transactions.reduce((total, arg) => total + parseInt(arg.add ? 0 :arg.amount)
*/