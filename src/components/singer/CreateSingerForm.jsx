import React from "react";
import axios from "axios";
import {Navigate} from "react-router-dom";

class CreateSingerForm extends React.Component {
    constructor(props) {
        super(props);
        let singerName = '';
        let singerNameIsValid = this.validateSingerName(singerName);

        this.state = {
            submitted:false,
            singerName: singerName,
            singerNameValid: singerNameIsValid,
        };

        this.onSingerNameChange = this.onSingerNameChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    validateSingerName(singerName) {
        return singerName.length > 2;
    }

    onSingerNameChange(e) {
        let val = e.target.value;
        let valid = this.validateSingerName(val);
        this.setState({singerName: val, singerNameValid: valid, showSingerNameError: true});
    }


    handleSubmit(e) {
        e.preventDefault();
        if (this.state.singerNameValid === true) {
            axios({
                url: "https://localhost:7179/api/singers",
                method: "POST",
                headers: {"Content-Type": "application/json"},
                data: {
                    singerName: this.state.singerName
                }
            }).catch(function (error) {
                alert(error);
            });

            setInterval(() => this.setState({submitted: true}),1000);
        }
    }

    render() {
        let errorSingerNameMessage = this.state.singerNameValid ? "" : "Некорректное имя исполнителя";

        return (
        <div className="dv1v">
            <br/><br/><br/><br/>
            <h1 id="h1AdEdMusicStyle" className="h1_n">Добавить исполнителя</h1>

            <div className="div_l1 div_l2n1">
                <form name="addStyleForm" onSubmit={this.handleSubmit}>
                    <div className="div_l2 div_l2n" style={{height: 'max-content'}}>
                        <br/>
                        <div className="div_l3n">
                            <div className="div_l4">
                                <label className="label_l1">Имя исполнителя:</label>
                                <input type="text" onChange={this.onSingerNameChange} value={this.state.singerName}
                                       className="input1 "/>
                            </div>
                            {this.state.showSingerNameError && (<span className="span_error">{errorSingerNameMessage}</span>)}
                        </div>

                        <div className="div_subm">
                            <input className="input_subm" type="submit" value="Добавить"/>
                        </div>
                    </div>
                </form>
            </div>
            {this.state.submitted && <Navigate to="/singers" />}
        </div>
        );
    }
}

export default CreateSingerForm;