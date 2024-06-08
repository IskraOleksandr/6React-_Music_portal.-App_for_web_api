import React from "react";
import withRouter from '../withRouter';
import axios from 'axios';
import {Navigate} from "react-router-dom";

class DeleteStyleForm extends React.Component {
    constructor(props) {
        super(props);
        console.log('Props:', this.props);
        console.log('Props:', this.props.params.id);

        let styleId = this.props.params.id;
        let styleName = '';

        this.state = {
            submitted:false,
            styleId: styleId,
            styleName: styleName,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios({
            url: "https://localhost:7179/api/musicStyles/" + this.state.styleId,
            method: "GET",
            headers: {"Content-Type": "application/json"},
        }).then((response) => {
            this.setState({
                styleId: response.data.id,
                styleName: response.data.styleName,
            });
        }).catch(function (error) {
            alert(error);
        });
    }


    handleSubmit(e) {
        e.preventDefault();
        axios({
            url: "https://localhost:7179/api/musicStyles/" + this.state.styleId,
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
        }).catch(function (error) {
            alert(error);
        });

        setInterval(() => this.setState({submitted: true}),1000);
    }

    render() {
        return (
            <div className="dv1v">
                <br/><br/><br/>
                <h1 className="h1_n">Удаление стиля</h1>
                <div className="div_l1 div_l2n1">

                    <div className="div_l2 div_l2n" style={{height: 'max-content'}}>
                        <br/>
                        <div className="div_l3n">
                            <div className="div_l4">
                                <h3>Вы действительно желаете удалить стиль?</h3>
                                <label className="label_l1" style={{'font-weight': 'bold'}}>Название стиля</label><br/>
                                <label className="label_l1 label_l2">{this.state.styleName}</label>
                            </div>
                        </div>
                        <br/><br/>
                        <form onSubmit={this.handleSubmit}>
                            <input type="hidden" value={this.state.styleId}/>
                            <div className="div_subm">
                                <input className="input_subm_del" type="submit" value="Удалить"/>
                            </div>
                        </form>
                    </div>
                </div>
                {this.state.submitted && <Navigate to="/styles" />}
            </div>
        );
    }
}

export default withRouter(DeleteStyleForm);