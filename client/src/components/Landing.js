import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Timer from './Timer'
import GlobusGif from '../globus.gif'

class Landing extends Component {
    constructor() {
        super()
        this.state = {
            showTime: true
        }
    }

    render() {
        let timer = this.state.showTime ? <Timer /> : null
        return (
            <div>
                <h1 id="home-title1">Global Bank</h1>
                <div id="home-container1">
                    <span className="main-directory-text">Transactions
                        <Link  to="/transactions">
                            <img id="TransIcon" src="https://image.flaticon.com/icons/svg/138/138281.svg" />
                        </Link>
                        <img id="clickIcon" src="https://sermorelin-peptide.com/wp-content/uploads/2017/10/left.gif" />
                    </span>
                    <span className="main-directory-text">Operations
                        <Link to="/operations">
                            <img id="OperaIcon" src="https://image.flaticon.com/icons/svg/138/138287.svg" />
                            <img id="clickIcon" src="https://sermorelin-peptide.com/wp-content/uploads/2017/10/left.gif" />
                        </Link>
                    </span>
                    <span className="main-directory-text">Statistics
                        <Link  to="/statistics">
                            <img id="StatisIcon" src="https://image.flaticon.com/icons/svg/786/786797.svg" />
                            <img id="clickIcon" src="https://sermorelin-peptide.com/wp-content/uploads/2017/10/left.gif" />
                        </Link>
                    </span>
                </div>
                <img id="icon" src={GlobusGif} />
                <div id="time">
                    <p>{moment().format('ll') + " "},</p>
                    <p>{timer}</p>
                </div>
            </div>
        )
    }
}

export default Landing