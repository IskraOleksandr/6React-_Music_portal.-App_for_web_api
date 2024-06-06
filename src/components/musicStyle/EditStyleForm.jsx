import React from "react";
import withRouter from '../withRouter';
import axios from 'axios';

class EditStyleForm extends React.Component {
    constructor(props) {
        super(props);
        console.log('Props:', this.props);
        console.log('Props:', this.props.params.id);

        let styleId = this.props.params.id;

        let styleName = '';
        let styleNameIsValid = this.validateStyleName(styleName);

        this.state = {
            styleId: styleId,
            styleName: styleName,
            styleNameValid: styleNameIsValid,
        };

        this.onStyleNameChange = this.onStyleNameChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        axios({
            url: "https://localhost:7179/api/musicStyles/" + this.state.styleId,
            method: "GET",
            headers: {"Content-Type": "application/json"},
        }).then((response) => {
            console.log('hhh' + response.data.styleName);
            this.setState({
                styleId: response.data.id,
                styleName: response.data.styleName,
                styleNameValid:true,
            });
        }).catch(function (error) {
            alert(error);
        });
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
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                data: {
                    id:this.state.styleId,
                    styleName: this.state.styleName
                }
            }).then(function (response) {

            }).catch(function (error) {
                alert(error);
            });
        }
    }

    render() {
        let errorStyleNameMessage = this.state.styleNameValid ? "" : "Некорректное имя исполнителя";

        return (
            <div className="dv1v">
                <h1 id="h1AdEdMusicStyle" className="h1_n">Edit singer</h1>

                <div className="div_l1 div_l2n1">
                    <form name="addStyleForm" onSubmit={this.handleSubmit}>
                        <div className="div_l2 div_l2n" style={{height: 'max-content'}}>
                            <br/>
                            <div className="div_l3n">
                                <div className="div_l4">
                                    <label className="label_l1">Style name</label>
                                    <input type="text" onChange={this.onStyleNameChange} value={this.state.styleName}
                                           className="input1 "/>
                                </div>
                                {this.state.showStyleNameError && (<span className="span_error">{errorStyleNameMessage}</span>)}
                            </div>

                            <div className="div_subm">
                                <input className="input_subm" type="submit" value="Изменить"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default withRouter(EditStyleForm);