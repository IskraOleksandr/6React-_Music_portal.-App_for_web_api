import React from "react";
import axios from 'axios';
import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

class StyleForm extends React.Component {
    constructor(props) {
        super(props);

        //Для цього потрібен функціональний компонент
        //const params = useParams();
        //const tourId = params.id;

        const myParam = this.props.location.state.id;
        console.log(myParam+'i');

        let isAddStyle = props.addStyle;

        let style_name = props.style_name;
        let styleNameIsValid = this.validateStyleName(style_name);

        let styleId = props.style_id;
        console.log(styleId+'id');

        this.state = {
            addStyle: isAddStyle, styleName: style_name,
            id: styleId, styleNameValid: styleNameIsValid,
        };
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    validateStyleName(styleName) {
        return styleName.length > 2;
    }

    onChange(e) {
        let val = e.target.value;
        let valid = this.validateStyleName(val);
        this.setState({styleName: val, styleNameValid: valid});
    }


    handleSubmit(e) {
        e.preventDefault();

        if (
            this.state.styleNameValid === true &&
            this.state.id != null
        ) {
            if (this.props.addStyle == 'true') {
                axios({
                    url: "https://localhost:7179/api/musicStyles",
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    data: {styleName: this.state.styleName}
                }).then(function (response) {
                    //          this.state.styleName = '';
                    //          this.state.styleId = '';
                }).catch(function (error) {
                    alert(error);
                });

            } else {
                axios({
                    url: "https://localhost:7179/api/musicStyles",
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    data: {
                        id: this.state.id,
                        styleName: this.state.styleName,
                    }
                }).then(function (response) {
                    //          this.state.styleName = '';
                    //          this.state.styleId = '';
                }).catch(function (error) {
                    alert(error);
                });

            }
        }
    }

    render() {
        //let full_nameColor = this.state.styleNameIsValid === true ? "✔" : "Поле стиля должно быть установлено";
        //let LoginColor = this.state.LoginValid === true ? "green" : "red";

        return (
            <div>
                <div className="dv1v">
                    <h1 id="h1AdEdMusicStyle" className="h1_n">Add style</h1>

                    <div className="div_l1 div_l2n1">
                        <form name="addStyleForm" onSubmit={this.handleSubmit}>
                            <div className="div_l2 div_l2n" style={{height: 'max-content'}}>
                                <input value={this.state.id} type="hidden" id="admusicStyleId"/>
                                <br/>
                                <div className="div_l3n">
                                    <div className="div_l4">
                                        <label className="label_l1">Style name</label>
                                        <input type="text" onChange={(e) => this.onChange(e)}
                                               value={this.state.styleName} className="input1 " placeholder="bb"/>
                                    </div>
                                    <span className="span_error"></span>
                                </div>

                                <div className="div_subm">
                                    <input id="addMusicStyle_Btn" className="input_subm" type="submit"
                                           value="Добавить"/>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>);
    }
}

export default StyleForm;