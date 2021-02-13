import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Doughnut from 'react-chartjs-2'
import axios from 'axios'

class Statistics extends Component {
    constructor() {
        super()
        this.state = {
            statistics: [],
            labels: [],
            datasets: [
                {
                    label: 'Rainfall',
                    backgroundColor: [],
                    hoverBackgroundColor: [],
                    borderWidth: 1,
                    data: []
                }
            ]
        }
    }

    componentDidMount = async () => {
        const state = {
            statistics: await axios.get(`http://18.193.224.15:7000/statistics-api`),
            labels: [],
            datasets: [
                {
                    label: 'Rainfall',
                    backgroundColor: [],
                    hoverBackgroundColor: [],
                    borderWidth: 0,
                    data: []
                }
            ]
        }
        let i = state.statistics.data.length
        const letters = '0123456789ABCDEF'
        while (i) {
            let color = '#'
            for (let j = 0; j < 6; j++) color += letters[Math.floor(Math.random() * 16)]
            state.datasets[0].backgroundColor.push(color)
            state.datasets[0].hoverBackgroundColor.push(color)
            i--
        }
        state.statistics.data.filter(a=>a.total<0).map(a => state.datasets[0].data.push(a.total))
        state.statistics.data.filter(a=>a.total<0).map(v => state.labels.push(v._id))
        this.setState(state)
    }

    render() {

        return (
            <div>
                <h1 id="home-title3">Statistics</h1>
                <div>
                    {this.state.statistics.data ? this.state.statistics.data.filter(a=>a.total<0).map(t =>
                        <div className="statisticsBox" >
                            <p className="main-directory-text-3"
                                style={{ 'color': `${this.state.datasets[0].backgroundColor[this.state.statistics.data.indexOf(t)]}` }}>{t._id}:
                            </p>
                            <p className="main-directory-text-3"
                                style={{ 'color': `${this.state.datasets[0].backgroundColor[this.state.statistics.data.indexOf(t)]}` }}>{t.total} $
                            </p>
                        </div>) : null}
                </div>
                <div >
                    <p></p>
                    <div>
                        <Doughnut
                            data={this.state}
                            options={{
                                legend: {
                                    display: false,
                                    position: 'left',
                                    labels: {
                                        fontColor: 'white',
                                    }
                                },
                                responsive: true
                            }}
                        />
                    </div>
                </div>
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

export default Statistics