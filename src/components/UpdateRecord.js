import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default class UpdateRecord extends Component {
    state = {
        concepto:'',
        monto:'',
        fecha: new Date()
    }
    async componentDidMount() {
        
        const res = await axios.get('http://localhost:5000/api/registry/'+this.props.match.params.id )
        console.log(res.data)
        this.setState({
            monto: res.data.monto,
            concepto: res.data.concepto,
            fecha: new Date(res.data.fecha),
            _id: this.props.match.params.id
            })
    }
    onSubmit = async (e) => {
        e.preventDefault()

        const newRecord = {
            concepto: this.state.concepto,
            monto: this.state.monto,
            fecha: this.state.fecha
        }
        const res = await axios.put('http://localhost:5000/api/registry/'+this.state._id, newRecord)
        console.log(newRecord, res)

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
                    <h4>Edit a Record</h4>
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
