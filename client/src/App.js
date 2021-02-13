import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Statistics from './components/Statistics'
import Transactions from './components/Transactions'
import Operations from './components/Operations'
import Landing from './components/Landing'
import MenuItem from './components/MenuItem'
import MenuButton from './components/MenuButton'
import Menu from './components/Menu'
import axios from 'axios'
import './App.css'

export class App extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      balance: 0,
      menuOpen: false
    }
  }

  componentDidMount = async () => {
    const transactions = await axios.get(`http://18.193.224.15:7000/transactions-api`)
    this.setState({ data: transactions.data })
    this.updateBalance()
  }

  updateBalance = () => {
    let balance = 0
    this.state.data.forEach(t => balance += parseInt(t.amount))
    this.setState({ balance })
  }

  moneyTransfer = (arr) => {
    this.setState({ data: arr }, () => {
      this.updateBalance()
    })
  }

  handleMenuClick() {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  handleLinkClick() {
    this.setState({ menuOpen: false })
  }

  deleteTransaction =  (id) =>{
    const index = this.state.data.findIndex(t => t._id === id)
    let data = [...this.state.data]
    data.splice(index,1)
    this.setState({ data })
    this.updateBalance()
  } 
  
  render() {
    const state = this.state

    const menu = ['Home', 'Transactions', 'Operations', 'Statistics']
    const menuItems = menu.map((val, index) => {
      return (
        <MenuItem
          key={index}
          delay={`${index * 0.1}s`}
          onClick={() => this.handleLinkClick()}>{val}
        </MenuItem>)
    })


    return (
      <Router>
        <div>
          <div className="container" >
            <MenuButton open={state.menuOpen} onClick={() => this.handleMenuClick()} color='white' />
            <div className="navText">Log In</div>
            <div className="navText" >Register</div>
          </div>
          <Menu open={state.menuOpen}>
            <Link to={"/"}>{menuItems[0]}</Link>
            <Link to={"/transactions"}>{menuItems[1]}</Link>
            <Link to={"/operations"}>{menuItems[2]}</Link>
            <Link to={"/statistics"}>{menuItems[3]}</Link>
          </Menu>
          <div className="navBody"></div>
        </div>
        {state.data.length >= 0 ?
          <div className="App">
            <div id="home-background">
              <div>
                <Route path="/" exact component={Landing} />
                <Route path="/transactions" exact render={() => <Transactions state={state} deleteTransaction={this.deleteTransaction} />} />
                <Route path="/operations" exact render={() => <Operations state={state} moneyTransfer={this.moneyTransfer} />} />
                <Route path="/statistics" exact render={() => <Statistics state={state} />} />
              </div>
            </div>
          </div> : null}
      </ Router>
    )
  }
}
export default App 
