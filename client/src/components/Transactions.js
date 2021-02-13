import React, { Component } from 'react'
import Transaction from './Transaction'
import { Link } from 'react-router-dom'

class Transactions extends Component {

  render() {
    return (
      <div >
        <h1 id="home-title3">Transactions</h1>
        <p className="main-directory-text-2" style={{ 'color': 'gold' }}>Balance: 
        <span> </span>
          <span style={{ 'color': `${this.props.state.balance < 0 ? 'red' : 'green'}` }}>
            {this.props.state.balance}
          </span> $
        </p>
        {this.props.state.data.map(m => <Transaction transaction={m} deleteT={this.props.deleteTransaction} />)}
        <div className="backBox">
          <p className="back">Back</p>
          <Link to={"/"}>
            <img id="logo" src="https://www.freshbooks.com/wp-content/uploads/2018/08/icon-paidfaster.png" />
          </Link>
        </div>
      </div>
    )
  }
}

export default Transactions