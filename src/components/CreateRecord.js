import React, { Component } from 'react'
import axios from 'axios';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default class CreateRecord extends Component {

    state = {
        concepto:'',
        monto:'',
        fecha: new Date(),
        tipo:''
    }

    componentDidMount() {
        this.setState({tipo: 'Ingreso'})
    }

    onSubmit = async (e) => {
        e.preventDefault()

        const newRecord = {
            concepto: this.state.concepto,
            monto: this.state.monto,
            fecha: this.state.fecha,
            tipo: this.state.tipo
        }

        console.log(newRecord)
        const res = await axios.post('http://localhost:5000/api/registry', newRecord)
        console.log(res)

        window.location.href="/"
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeDate = (date) => {
        this.setState({fecha : date})
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Create a Record</h4>
                    <br/>
                    <div className="form-group">
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Concepto"
                            name="concepto"
                            onChange={this.onInputChange}
                            required
                            value={this.state.concepto}
                        />
                    </div>

                    <div className="form-group">
                        <input 
                            type="number"
                            className="form-control"
                            placeholder="Monto"
                            name="monto"
                            onChange={this.onInputChange}
                            required
                            value={this.state.monto}
                        />
                    </div>
                    
                    <div className="form-group">
                        <DatePicker
                            className='form-control'
                            selected={this.state.fecha}
                            onChange={this.onChangeDate}
                        />
                    </div>

                    <div className="form-group">
                        <select
                            className="form-control"
                            name="tipo"
                            onChange={this.onInputChange}
                            value={this.state.tipo}
                        >
                            <option key="ingreso" value="Ingreso" >Ingreso</option>
                            <option key="egreso" value="Egreso">Egreso</option>
                        </select>
                    </div>

                    <form onSubmit={this.onSubmit}>
                        <button type="submit" className="btn btn-primary">
                            save
                        </button>
                    </form> 
                </div>
                
            </div>
        )
    }
}
