import React from "react";
import withRouter from '../withRouter';
import axios from 'axios';

class DeleteSingerForm extends React.Component {
    constructor(props) {
        super(props);
        console.log('Props:', this.props);
        console.log('Props:', this.props.params.id);

        let singerId = this.props.params.id;
        let singerName = '';

        this.state = {
            singerId: singerId,
            singerName: singerName,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios({
            url: "https://localhost:7179/api/singers/" + this.state.singerId,
            method: "GET",
            headers: {"Content-Type": "application/json"},
        }).then((response) => {
            console.log('hhh' + response.data.styleName);
            this.setState({
                singerId: response.data.id,
                singerName: response.data.singerName,
            });
        }).catch(function (error) {
            alert(error);
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        axios({
            url: "https://localhost:7179/api/singers/" + this.state.singerId,
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
        }).then(function (response) {
        }).catch(function (error) {
            alert(error);
        });
    }

    render() {
        return (
            <div className="dv1v">
                <h1 className="h1_n">Удаление исполнителя</h1>
                <div className="div_l1 div_l2n1">

                    <div className="div_l2 div_l2n" style={{height: 'max-content'}}>
                        <br/>
                        <div className="div_l3n">
                            <div className="div_l4">
                                <h3>Вы действительно желаете удалить исполнителя?</h3>
                                <label className="label_l1" style={{'font-weight': 'bold'}}>Название исполнителя</label><br/>
                                <label className="label_l1 label_l2">{this.state.singerName}</label>
                            </div>
                        </div>
                        <br/><br/>
                        <form onSubmit={this.handleSubmit}>
                            <input type="hidden" value={this.state.singerId}/>
                            <div className="div_subm">
                                <input className="input_subm_del" type="submit" value="Удалить"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(DeleteSingerForm);