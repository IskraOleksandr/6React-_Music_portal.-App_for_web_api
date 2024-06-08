import React from "react";
import axios from "axios";
import {Navigate} from "react-router-dom";

class CreateUserForm extends React.Component {
    constructor(props) {
        super(props);
        let firstName = '';
        let firstNameIsValid = this.validateFirstName(firstName);

        let lastName = '';
        let lastNameIsValid = this.validateLastName(lastName);

        let login = '';
        let loginIsValid = this.validateLogin(login);

        let email = '';
        let emailIsValid = this.validateEmail(email);

        let password = '';
        let passwordIsValid = this.validatePassword(password);

        let passwordConfirm = '';
        let passwordConfirmIsValid = this.validatePasswordConfirm(passwordConfirm);

        let level = 0;

        this.state = {
            submitted:false,
            firstName: firstName,
            lastName: lastName,
            login: login,
            email: email,
            password: password,
            passwordConfirm: passwordConfirm,
            level: level,

            firstNameValid: firstNameIsValid,
            lastNameValid: lastNameIsValid,
            loginValid: loginIsValid,
            emailValid: emailIsValid,
            passwordValid: passwordIsValid,
            passwordConfirmValid: passwordConfirmIsValid,
        };

        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
        this.onLoginChange = this.onLoginChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);

        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onPasswordConfirmChange = this.onPasswordConfirmChange.bind(this);
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

    validatePassword(password) {
        return password.length > 4;
    }

    validatePasswordConfirm(passwordConfirm) {
        return passwordConfirm.length > 4;
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

    onPasswordChange(e) {
        let val = e.target.value;
        let valid = this.validatePassword(val);
        this.setState({password: val, passwordValid: valid, showPasswordError: true});
    }

    onPasswordConfirmChange(e) {
        let val = e.target.value;
        let valid = this.validatePasswordConfirm(val);
        this.setState({passwordConfirm: val, passwordConfirmValid: valid, showPasswordConfirmError: true});
    }


    handleSubmit(e) {
        e.preventDefault();
        if ( this.state.firstNameValid === true && this.state.lastNameValid &&
            this.state.loginValid === true && this.state.emailValid === true &&
            this.state.passwordValid === true && this.state.passwordConfirmValid === true
        ) {
            axios({
                url: "https://localhost:7179/api/users",
                method: "POST",
                headers: {"Content-Type": "application/json"},
                data: {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    login: this.state.login,
                    email: this.state.email,
                    password: this.state.password,
                    passwordConfirm: this.state.passwordConfirm,
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
        let errorPasswordMessage = this.state.passwordValid ? "" : "Некорректная длина пароля";
        let errorConfirmPasswordMessage = this.state.passwordConfirmValid ? "" : "Пароли не совпадают";

        return (
            <div className="dv1v" style={{height: '560px'}}>
                <br/><br/><br/><br/>
                <h1 className="h1_n">Добавление пользователя </h1>
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
                                    <label htmlFor="Password" className="label_l1">Пароль:</label>
                                    <input value={this.state.password} onChange={this.onPasswordChange}
                                           name="adPassword" id="Password" className="input1 " type="password"/>
                                </div>
                                {this.state.showPasswordError && (
                                    <span className="span_error">{errorPasswordMessage}</span>)}
                            </div>

                            <div className="div_l3n">
                                <div className="div_l4">
                                    <label htmlFor="PasswordConfirm" className="label_l1">Подтверджение пароля:</label>
                                    <input value={this.state.passwordConfirm} onChange={this.onPasswordConfirmChange}
                                           name="adPasswordConfirm" id="PasswordConfirm" className="input1 "
                                           type="password"/>
                                </div>
                                {this.state.showPasswordConfirmError && (
                                    <span className="span_error">{errorConfirmPasswordMessage}</span>)}
                            </div>

                            <input id="Level" type="hidden" value={this.state.level}/>

                            <div className="div_subm">
                                <input id="Register_Btn" className="input_subm" type="submit" value="Добавить"/>
                            </div>
                        </div>
                    </form>
                </div>
                {this.state.submitted && <Navigate to="/users" />}
            </div>
        );
    }
}

export default CreateUserForm;