// Register.js

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {registerUser} from '../actions/authentication';
import classnames from 'classnames';

class Register extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            email: '',
            password: '',
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }

        this.props.registerUser(user, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        const {errors} = this.state;
        return (
            <div className="container" style={{marginTop: '50px', width: '700px'}}>
                {
                    this.props.authReducer.message !== undefined
                        ? <span className="alert alert-success">{this.props.authReducer.message}</span>
                        : null
                }
                <h2 style={{marginBottom: '40px'}}>Registration</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Username"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.name
                            })}
                            name="username"
                            onChange={this.handleInputChange}
                            value={this.state.username}
                        />
                        {
                            this.props.authReducer.error.username !== undefined
                                ? <span
                                    className="alert alert-danger">{this.props.authReducer.error.username}</span>
                                : null
                        }
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.email
                            })}
                            name="email"
                            onChange={this.handleInputChange}
                            value={this.state.email}
                        />
                        {
                            this.props.authReducer.error.email !== undefined
                                ? <span
                                    className="alert alert-danger">{this.props.authReducer.error.email}</span>
                                : null
                        }
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.password
                            })}
                            name="password"
                            onChange={this.handleInputChange}
                            value={this.state.password}
                        />
                        {
                            this.props.authReducer.error.password !== undefined
                                ? <span
                                    className="alert alert-danger">{this.props.authReducer.error.password}</span>
                                : null
                        }
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Register User
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    authReducer: state.authReducer
});

export default connect(mapStateToProps, {registerUser})(withRouter(Register))