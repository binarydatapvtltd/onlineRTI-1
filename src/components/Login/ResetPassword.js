import React, {Component} from 'react';
import {Modal, Form} from "react-bootstrap";
import FormField from "../common/FormField";
import FormSubmit from "../common/FormSubmit";
import { Field, reduxForm, SubmissionError } from 'redux-form';
import {Notify} from '../common/Notify';
import Http from '../../lib/Http';
import {Required} from '../common/validate';

class ResetPassword extends Component {
	constructor() {
		super();
		this.formSubmit = this.formSubmit.bind(this);
		this.state = {
			success:'',
			toggleDialog: false
		}
	}
	componentDidMount() {
		console.log('ResetPassword');
		this.setState({toggleDialog: true});
	}
	hideDialog() {
		this.setState({toggleDialog: false});	
	}
	handleExited() {
		const {dispatch, reset} = this.props;
		dispatch(reset('ResetPasswordForm'));
	}
	render () {
		const {handleSubmit, error, submitting, invalid} = this.props;
		const {toggleDialog} = this.state;
		return (
			<Modal className="login-popup" show={toggleDialog} onHide={() => this.hideDialog()} onExited={() => this.handleExited()}>
		    	<Modal.Header closeButton>
		        	<Modal.Title>Reset Password</Modal.Title>
		        </Modal.Header>
		        <Form onSubmit={handleSubmit(this.formSubmit)}>
		        	<Notify message={error} />
			        <Modal.Body>
			            <Field
			            	type="password"
			            	label="New Password"
			            	name="password"
			            	placeholder="Enter new password"
			            	theme="custom"
			            	doValidateWithStackedForm={true}
			            	component={FormField}
			            />
			            <Field
			            	type="password"
			            	label="Confirm Password"
			            	name="confirm_password"
			            	placeholder="Enter new password"
			            	theme="custom"
			            	doValidateWithStackedForm={true}
			            	component={FormField}
			            	validate={Required}
			            />
						
			        </Modal.Body>
			        <Modal.Footer>
			        	<FormSubmit 
			      			error={error} invalid={invalid} 
			      			submitting={submitting} 
			      			className="btn-info btn-block" 
			      			buttonSaveLoading="Processing..." 
			      			buttonSave="Reset Password"/>
			        </Modal.Footer>
			    </Form>    
		    </Modal>
		); 
	}	   
	formSubmit(user) {
		const { dispatch, reset, hideDialog, salt } = this.props;
		console.log(salt);
		const request = {
			salt,
			password: user.password
		}
		return new Promise((resolve, reject) => {
		  	Http.post('reset-password', request)
		  	.then(res => {
				this.setState({success: res.message});
				dispatch(reset('ResetPasswordForm'));
				setTimeout(() => {
					this.setState({success:''});
					hideDialog();
				}, 5000);
			})
			.catch(errors => reject(new SubmissionError({_error: errors.message})) )
		});
	}
}
const ResetPasswordForm = reduxForm({
  	form: 'ResetPasswordForm',
  	validate: (values) => {
  	  	const errors = {};
  	  	if(!values.password) {
      		errors.password = 'New Password is required';
    	}else if( !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/i.test(values.password) ) {
    		errors.password = 'Password must be at least 8 characters long and should contain at least one digit, one lower case and one upper case character';
    	}else if(values.confirm_password && values.password !== values.confirm_password) {
    		errors.password = 'Password and confirm password must match';	
    	}
  	  	
  	  	if(!values.confirm_password) {
  	    	errors.confirm_password = 'Password and confirm password must match';
  	    }
  	  	return errors;
  	}
})(ResetPassword);
export default ResetPasswordForm;