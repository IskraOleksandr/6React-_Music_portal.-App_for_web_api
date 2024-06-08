import React from "react";
import withRouter from '../withRouter';
import axios from "axios";
import {Navigate} from "react-router-dom";

class EditSingerForm extends React.Component {
    constructor(props) {
        super(props);
        console.log('Props:', this.props);
        console.log('Props:', this.props.params.id);
        let singerId = this.props.params.id;

        let singerName = '';
        let singerNameIsValid = this.validateSingerName(singerName);

        this.state = {
            submitted:false,
            singerId: singerId,
            singerName: singerName,
            singerNameValid: singerNameIsValid,
        };

        this.onSingerNameChange = this.onSingerNameChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        axios({
            url: "https://localhost:7179/api/singers/" + this.state.singerId,
            method: "GET",
            headers: {"Content-Type": "application/json"},
        }).then((response) => {
            this.setState({
                singerId: response.data.id,
                singerName: response.data.singerName,
                singerNameValid:true,
            });
        }).catch(function (error) {
            alert(error);
        });
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
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                data: {
                    id:this.state.singerId,
                    singerName: this.state.singerName
                }
            }).then(function (response) {

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
                <h1 id="h1AdEdMusicStyle" className="h1_n">Редактирование исполнителя</h1>

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
                                <input className="input_subm" type="submit" value="Изменить"/>
                            </div>
                        </div>
                    </form>
                </div>
                {this.state.submitted && <Navigate to="/singers" />}
            </div>
        );
    }
}

export default withRouter(EditSingerForm);