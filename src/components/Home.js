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

        res = await axios.get('http://localhost:5000/api/userdata')
        this.setState({balance: res.data[0].balance})
    }

    getRecords = async () => {
        let res = await axios.get('http://localhost:5000/api/registry')
        this.setState({records: res.data})
        res = await axios.get('http://localhost:5000/api/userdata')
        console.log(res.data[0])
        this.setState({balance: res.data[0].balance})
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
