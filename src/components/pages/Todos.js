import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Moment from 'moment'

export default class Todos extends Component {
    state = {
        records: []
    }

    async componentDidMount(){
        const res = await axios.get('http://localhost:5000/api/registry')
        this.setState({records: res.data})
    }

    getRecords = async () => {
        const res = await axios.get('http://localhost:5000/api/registry')
        this.setState({records: res.data})
        
    }

    DeleteRecords = async (id) => {
        await axios.delete('http://localhost:5000/api/registry/' +id)
        this.getRecords()
    }

    

    render() {
        return (
            <ul className="list-group list-group-flush">
                {this.state.records.map(record => (
                    <li key={record._id} className="list-group-item">
                        <div className="navbar">
                            <p>
                                Concepto: {record.concepto}
                            </p>
                            <p>
                                Monto: {record.monto}
                            </p>
                            <p>
                                Fecha: {
                                    Moment(record.fecha).format('MMMM Do, YYYY')
                                }
                            </p>
                            <p>
                                Tipo: {record.tipo}
                            </p>
                            <div className="buttons">
                                <Link className="btn btn-secondary" to={"/edit/" + record._id}>
                                    Edit
                                </Link>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <button className="btn btn-danger" onClick={() => this.DeleteRecords(record._id)}>
                                    Delete
                                </button>
                            </div>
                            
                        </div>
                    </li>
                ))}
            </ul>
        )
    }
}
