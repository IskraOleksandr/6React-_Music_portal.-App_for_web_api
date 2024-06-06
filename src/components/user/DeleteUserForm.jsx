import React from "react";
import withRouter from '../withRouter';
import axios from 'axios';

class DeleteUserForm extends React.Component {
    constructor(props) {
        super(props);
        console.log('Props:', this.props);
        console.log('Props:', this.props.params.id);

        let userId = this.props.params.id;
        let firstName = '';
        let lastName = '';

        let login = '';
        let email = '';
        let level = 0;

        this.state = {
            userId: userId,
            firstName: firstName,
            lastName: lastName,
            login: login,
            email: email,
            level: level,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios({
            url: "https://localhost:7179/api/users/" + this.state.userId,
            method: "GET",
            headers: {"Content-Type": "application/json"},
        }).then((response) => {
            console.log('hhh' + response.data);
            this.setState({
                userId: response.data.id,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                login: response.data.login,
                email: response.data.email,
                level: response.data.level,
            });
        }).catch(function (error) {
            alert(error);
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        axios({
            url: "https://localhost:7179/api/users/" + this.state.userId,
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

                <h1 className="h1_n">Удаление пользователя</h1>

                <div className="div_l1 div_l2n1">

                    <div className="div_l2 div_l2n" style={{height: 'max-content'}}>
                        <br/>
                        <div className="div_l3n">
                            <div className="div_l4">
                                <h3>Вы действительно желаете удалить пользователя?</h3>
                            </div>
                        </div>
                        <div className="div_l3">
                            <div className="div_l4">
                                <label className="label_l1m">Имя</label>
                                <p className="p1_n ">{this.state.firstName}</p>
                            </div>
                        </div>

                        <div className="div_l3n">
                            <div className="div_l4">
                                <label className="label_l1m">Фамилия:</label>
                                <p className="p1_n ">{this.state.lastName}</p>
                            </div>
                        </div>

                        <div className="div_l3n">
                            <div className="div_l4">
                                <label className="label_l1m">Логин:</label>
                                <p  className="p1_n ">{this.state.login}</p>
                            </div>
                        </div>

                        <div className="div_l3n">
                            <div className="div_l4">
                                <label className="label_l1m">Email</label>
                                <p className="p1_n ">{this.state.email}</p>
                            </div>
                        </div>

                        <div className="div_l3n">
                            <div className="div_l4">
                                <label className="label_l1m">Уровень доступа: </label>
                                <p className="p1_n ">{this.state.level}</p>
                            </div>
                        </div>

                        <form name="delUserForm" onSubmit={this.handleSubmit}>
                            <input name="us_del_Id" type="hidden" value={this.state.userId}/>
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

export default withRouter(DeleteUserForm);