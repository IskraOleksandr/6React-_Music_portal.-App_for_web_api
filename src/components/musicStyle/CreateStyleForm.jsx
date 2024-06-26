﻿import React from "react";
import axios from 'axios';
import {Navigate} from "react-router-dom";


class CreateStyleForm extends React.Component {
    constructor(props) {
        super(props);
        let styleName = '';
        let styleNameIsValid = this.validateStyleName(styleName);

        this.state = {
            submitted:false,
            styleName: styleName,
            styleNameNameValid: styleNameIsValid,
        };

        this.onStyleNameChange = this.onStyleNameChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateStyleName(styleName) {
        return styleName.length > 2;
    }

    onStyleNameChange(e) {
        let val = e.target.value;
        let valid = this.validateStyleName(val);
        this.setState({styleName: val, styleNameValid: valid, showStyleNameError: true});
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.styleNameValid === true) {
            axios({
                url: "https://localhost:7179/api/musicStyles",
                method: "POST",
                headers: {"Content-Type": "application/json"},
                data: {
                    styleName: this.state.styleName
                }
            }).catch(function (error) {
                alert(error);
            });

            setInterval(() => this.setState({submitted: true}),1000);
        }
    }

    render() {
        let errorStyleNameMessage = this.state.styleNameValid ? "" : "Некорректное имя исполнителя";

        return (
            <div className="dv1v">
                <br/><br/><br/><br/>
                <h1 id="h1AdEdMusicStyle" className="h1_n">Добавление стиля</h1>

                <div className="div_l1 div_l2n1">
                    <form name="addStyleForm" onSubmit={this.handleSubmit}>
                        <div className="div_l2 div_l2n" style={{height: 'max-content'}}>
                            <br/>
                            <div className="div_l3n">
                                <div className="div_l4">
                                    <label className="label_l1">Название стиля:</label>
                                    <input type="text" onChange={this.onStyleNameChange} value={this.state.styleName}
                                           className="input1 "/>
                                </div>
                                {this.state.showStyleNameError && (<span className="span_error">{errorStyleNameMessage}</span>)}
                            </div>

                            <div className="div_subm">
                                <input className="input_subm" type="submit" value="Добавить"/>
                            </div>
                        </div>
                    </form>
                </div>
                {this.state.submitted && <Navigate to="/styles" />}
            </div>
        );
    }
}

export default CreateStyleForm;