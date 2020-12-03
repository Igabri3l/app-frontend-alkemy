import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
export default class Ingreso extends Component {
    state = {
        records: []
    }

    getRecords = async () => {
        const res = await axios.get('http://localhost:5000/api/registry')
        this.setState({records: res.data})
        
    }

    DeleteRecords = async (id) => {
        await axios.delete('http://localhost:5000/api/registry/' +id)
        this.getRecords()
    }

    async componentDidMount(){
        const res = await axios.get('http://localhost:5000/api/registry')
        this.setState({records: res.data})
    }

    render() {
        return (
            <div>
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
                                Fecha: {record.fecha}
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
            </div>
        )
    }
}
