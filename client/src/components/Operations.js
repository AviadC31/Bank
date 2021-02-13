import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Operations extends Component {
  constructor() {
    super()
    this.state = {
      amount: '',
      vendor: '',
      category: '',
      activity: false
    }
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.name === '' ? target.checked : target.value
    const name = target.name
    this.setState({ [name]: value })
  }

  moneyTransfer = async (e) => {
    const s = this.state
    const transaction = {
      amount: e.target.id === 'add' ? s.amount : -s.amount,
      vendor: s.vendor,
      category: s.category
    }
    const transDetails = await axios.post(`http://18.193.224.15:7000/transaction-api`, transaction)
    let arr=[]
    arr =[...this.props.state.data]
    arr.push(transDetails.data)
    this.props.moneyTransfer(arr)
    this.setState({ activity: true })
  }

  render() {
    return (
      <div>
        <h1 id="home-title3">Operations</h1>
        <div className="inputsBox">
          <p className="main-directory-text-2">vendor:</p>
          <div className="cover">
            <input className="input"
              name="vendor"
              type="text"
              value={this.state.vendor}
              onChange={this.handleInputChange} />
          </div>
        </div>
        <div className="inputsBox">
          <p className="main-directory-text-2">category:</p>
          <div className="cover">
            <input className="input"
              name="category"
              type="text"
              value={this.state.category}
              onChange={this.handleInputChange} />
          </div>
        </div>
        <div className="inputsBox">
          <p className="main-directory-text-2">amount:</p>
          <div className="cover">
            <input id="amount"
              name="amount"
              type="Number"
              checked={this.state.amount}
              onChange={this.handleInputChange} />
          </div>
        </div>
        <div>
          <p className="main-directory-text-2" style={{ 'color': 'gold' }}>Balance:
          <span> </span>
            <span style={{ 'color': `${this.props.state.balance < 0 ? 'red' : 'green'}` }}>
              {this.props.state.balance}
            </span> $
          </p>
          <button id="add" onClick={this.moneyTransfer}>Deposit</button>
          <button id="dec" onClick={this.moneyTransfer}>Withdraw</button>
          <p className="main-directory-text-2">
            { this.state.activity ?
                <p>A new Operation detected, check{' '}
                  <Link to="/transactions">Transactions</Link>{' '}to view
                </p> 
              : null
            }
          </p>
        </div>
        <div className="backBox">
          <p className="back">Back</p>
          <Link to={"/"}>
            <img id="logo" src="https://www.freshbooks.com/wp-content/uploads/2018/08/icon-paidfaster.png" />
          </Link>
        </div>
      </div >

    )
  }
}
export default Operations