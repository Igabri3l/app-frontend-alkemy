import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import './history.css'

export default class History extends Component {
    
    render() {
        return (
            <div>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <Link className='nav-link active' to='/history/todos'>Todos</Link>
                    </li>
                    <li className="nav-item">
                        <Link className='nav-link' to='/history/ingreso'>Ingreso</Link>
                    </li>
                    <li className="nav-item">
                        <Link className='nav-link'to='/history/egreso'>Egreso</Link>
                    </li>
                </ul>
            </div>
        )
    }
}
