// Login.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authentication';
import classnames from 'classnames';

class Login extends Component {

    constructor() {
        super();
        this.state = {
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
            email: this.state.email,
            password: this.state.password,
        }
        
        this.props.loginUser(user, this.props.history);
    }



    componentWillReceiveProps(nextProps) {

        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        const {errors} = this.state;
        const { isFetching } = this.props.authReducer;
        console.log(isFetching);
        return(
        <div className="container" style={{ marginTop: '50px', width: '700px'}}>
            <h4 style={{marginBottom: '40px'}}>
                {
                    this.props.authReducer.error.error !== undefined
                        ? <span className="alert alert-danger">{this.props.authReducer.error.error}</span>
                    : null
                }
            </h4>

            <h2 style={{marginBottom: '20px'}}>Login</h2>
            <form onSubmit={ this.handleSubmit }>

                <div className="form-group">
                    <input
                    type="email"
                    placeholder="Email"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.email
                    })}
                    name="email"
                    onChange={ this.handleInputChange }
                    value={ this.state.email }
                    />
                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
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
                    onChange={ this.handleInputChange }
                    value={ this.state.password }
                    />
                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    {console.log(this.props.authReducer)}

                    {
                        this.props.authReducer.error.password !== undefined
                            ? <span
                                className="alert alert-danger">{this.props.authReducer.error.password}</span>
                            : null
                    }

                </div>

                <div className="form-group">
                    <button type="submit" className="btn waves-effect waves-light" name="action" disabled={isFetching}>
                        { isFetching ? 'Processing ...' : 'Sign In ' } 
                    </button>
                </div>

                {/* <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Login User
                    </button>
                </div> */}
            </form>
        </div>
        )
    }
}

Login.propTypes = ({
    errors: PropTypes.object.isRequired,
});

const mapStateToProps = state => ({
    authReducer: state.authReducer
});

export  default connect(mapStateToProps, { loginUser })(Login)