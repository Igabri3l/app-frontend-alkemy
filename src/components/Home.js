import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import {format} from 'timeago.js'

export default class Home extends Component {
    state={
        records:[],
        balance:''
    }

    async componentDidMount() {
        let res = await axios.get('http://localhost:5000/api/registry')
        if(res.data.length >10){
            const limit = []
            for (let idx = 0; idx < 10; idx++) {
                limit[idx] = res.data[idx];
            }
            this.setState({records: limit})
        } else {
            this.setState({records: res.data})
        }
        let balance = await this.reloadBalance(res.data)

        this.setState({balance})
    }

    addAndRestBalance = (balance, tipo, monto) => {
        if(tipo === 'Ingreso'){
            console.log(balance)
            balance = balance + monto
            console.log(balance)
        }else if(tipo === 'Egreso'){
            balance = balance - monto
        }
        return balance
    }

    reloadBalance = async (records) => {
        let balance = 0
        for (let idx = 0; idx < records.length; idx++) {
            const record = records[idx];
            balance = await this.addAndRestBalance(balance, record.tipo, record.monto)
        }
        console.log(balance)
        return balance
    }

    getRecords = async () => {
        let res = await axios.get('http://localhost:5000/api/registry')
        this.setState({records: res.data})
        let balance = await this.reloadBalance(res.data)
        this.setState({balance})
    }

    DeleteRecords = async (id) => {
        await axios.delete('http://localhost:5000/api/registry/' +id)
        this.getRecords()
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-4 p-2 m-auto">
                        <div className="card">
                            <div className="card-header d-flex justify-content-between text-center">
                                <h5>
                                    Balance : {this.state.balance}
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                {
                    this.state.records.map(record => (
                        <div className="col-md-4 p-2" key={record._id}>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>
                                        Tipo: {record.tipo}
                                    </h5>
                                    <Link className="btn btn-secondary" to={"/edit/" + record._id}>
                                        Edit
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <p>
                                        Concepto: {record.concepto}
                                    </p>
                                    <p>
                                        Monto: {record.monto}
                                    </p>
                                    <p>
                                        {format(record.fecha)}
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-danger" onClick={() => this.DeleteRecords(record._id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div> 
                    ))
                }
            </div>

            </div>
        )
    }
}
