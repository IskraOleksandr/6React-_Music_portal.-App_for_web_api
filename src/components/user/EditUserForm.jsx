import React from "react";
import withRouter from '../withRouter';
import axios from "axios";
import {Navigate} from "react-router-dom";

class EditUserForm extends React.Component {
    constructor(props) {
        super(props);
        console.log('Props:', this.props);
        console.log('Props:', this.props.params.id);

        let userId = this.props.params.id;

        let firstName = '';
        let firstNameIsValid = this.validateFirstName(firstName);

        let lastName = '';
        let lastNameIsValid = this.validateLastName(lastName);

        let login = '';
        let loginIsValid = this.validateLogin(login);

        let email = '';
        let emailIsValid = this.validateEmail(email);

        let level = 0;
        let levelIsValid = this.validateLevel(level);

        this.state = {
            submitted:false,
            userId: userId,
            firstName: firstName,
            lastName: lastName,
            login: login,
            email: email,
            level: level,

            firstNameValid: firstNameIsValid,
            lastNameValid: lastNameIsValid,
            loginValid: loginIsValid,
            emailValid: emailIsValid,
            levelValid: levelIsValid,
        };

        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
        this.onLoginChange = this.onLoginChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);

        this.onLevelChange = this.onLevelChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }


    validateFirstName(firstName) {
        return firstName.length > 2;
    }

    validateLastName(lastName) {
        return lastName.length > 2;
    }

    validateLogin(login) {
        return login.length > 2;
    }

    validateEmail(email) {
        return email.length > 2;
    }

    validateLevel(level) {
        return level < 3 && level >= 0;
    }

    onLastNameChange(e) {
        let val = e.target.value;
        let valid = this.validateLastName(val);
        this.setState({lastName: val, lastNameValid: valid, showLastNameError: true});
    }

    onFirstNameChange(e) {
        let val = e.target.value;
        let valid = this.validateFirstName(val);
        this.setState({firstName: val, firstNameValid: valid, showFirstNameError: true});
    }

    onLoginChange(e) {
        let val = e.target.value;
        let valid = this.validateLogin(val);
        this.setState({login: val, loginValid: valid, showLoginError: true});
    }

    onEmailChange(e) {
        let val = e.target.value;
        let valid = this.validateEmail(val);
        this.setState({email: val, emailValid: valid, showEmailError: true});
    }

    onLevelChange(e) {
        let val = e.target.value;
        let valid = this.validateLevel(val);
        this.setState({level: val, levelValid: valid, showLevelError: true});
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
               firstNameValid: true,
               lastName: response.data.lastName,
               lastNameValid: true,
               login: response.data.login,
               loginValid: true,
               email: response.data.email,
               emailValid: true,
               level: response.data.level,
               levelValid: true,
           });
        }).catch(function (error) {
            alert(error);
        });
    }

    const
    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.firstNameValid === true && this.state.lastNameValid &&
            this.state.loginValid === true && this.state.emailValid === true &&
            this.state.levelValid === true) {
            axios({
                url: "https://localhost:7179/api/users",
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                data: {
                    id: this.state.userId,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    login: this.state.login,
                    email: this.state.email,
                    level: this.state.level,
                }
            }).catch(function (error) {
                alert(error);
            });

            setInterval(() => this.setState({submitted: true}),1000);
        }
    }

    render() {
        let errorFirstNameMessage = this.state.firstNameValid ? "" : "Некорректное имя";
        let errorLastNameMessage = this.state.lastNameValid ? "" : "Некорректная фамилия";
        let errorLoginMessage = this.state.loginValid ? "" : "Некорректная длина Логина";
        let errorEmailMessage = this.state.emailValid ? "" : "Не коректный email";
        let errorLevelMessage = this.state.levelValid ? "" : "Некорректный уровень доступа";

        return (
            <div className="dv1v" style={{height: '560px'}}>
                <br/><br/><br/><br/>
                <h1 className="h1_n">Редактирование пользователя </h1>
                <div className="div_l1 div_l2n1">
                    <form name="addUserForm" onSubmit={this.handleSubmit}>
                        <div className="div_l2 div_l2n" style={{height: 'max-content'}}>

                            <div className="div_l3">
                                <div className="div_l4">
                                    <label htmlFor="FirstName" className="label_l1">Имя:</label>
                                    <input value={this.state.firstName} onChange={this.onFirstNameChange}
                                           name="adFirstName" id="FirstName" className="input1 " type="text"/>
                                </div>
                                {this.state.showFirstNameError && (
                                    <span className="span_error">{errorFirstNameMessage}</span>)}
                            </div>

                            <div className="div_l3n">
                                <div className="div_l4">
                                    <label htmlFor="LastName" className="label_l1">Фамилия:</label>
                                    <input value={this.state.lastName} onChange={this.onLastNameChange}
                                           name="adLastName" id="LastName" className="input1 " type="text"/>
                                </div>
                                {this.state.showLastNameError && (
                                    <span className="span_error">{errorLastNameMessage}</span>)}
                            </div>

                            <div className="div_l3n">
                                <div className="div_l4">
                                    <label htmlFor="Login" className="label_l1">Логин:</label>
                                    <input value={this.state.login} onChange={this.onLoginChange} name="adLogin"
                                           id="Login" className="input1 " type="text"/>
                                </div>
                                {this.state.showLoginError && (<span className="span_error">{errorLoginMessage}</span>)}
                            </div>

                            <div className="div_l3n">
                                <div className="div_l4">
                                    <label htmlFor="Email" className="label_l1">Email:</label>
                                    <input value={this.state.email} onChange={this.onEmailChange} name="adEmail"
                                           id="Email" className="input1 " type="email"/>
                                </div>
                                {this.state.showEmailError && (<span className="span_error">{errorEmailMessage}</span>)}
                            </div>

                            <div className="div_l3n">
                                <div className="div_l4">
                                    <label htmlFor="us_edit_level" className="label_l1">Уровень доступа:</label>
                                    <input value={this.state.level} onChange={this.onLevelChange} className="input1 " type="number" min="0" max="2"
                                           placeholder="0"/>
                                </div>
                                {this.state.showLevelError && (<span className="span_error">{errorLevelMessage}</span>)}
                            </div>


                            <div className="div_subm">
                                <input id="Register_Btn" className="input_subm" type="submit" value="Изменить"/>
                            </div>
                        </div>
                    </form>
                </div>
                {this.state.submitted && <Navigate to="/users" />}
            </div>
        );
    }
}

export default withRouter(EditUserForm);