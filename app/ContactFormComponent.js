import redux from 'redux'
import React, { Component, PropTypes } from 'react'

class ContactForm extends Component {
	mySubmit(values) {
		this.props.onSave(values).then(() => {
			this.props.resetForm()
		})
	}

	render() {
		const { fields: { firstName } } = this.props;
		const submitClassName = "glyphicon glyphicon-" + (this.props.submitting ? "refresh glyphicon-spin" : 'ok')

		return (
			<form onSubmit={this.props.handleSubmit(this.mySubmit.bind(this))}>
				<h1>Contact Form</h1>
				<label>First name</label>
				{' '}
				<input {...firstName}/>
				{' '}
				{firstName.touched && firstName.error && <span className='help-block'>{firstName.error}</span>}
				<p></p>
				<button type="submit">
					<i className={submitClassName}/> Submit
				</button>
			</form>
		)
	}
}

ContactForm.propTypes = {
	onSave: PropTypes.func.isRequired,

	fields: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	resetForm: PropTypes.func.isRequired,
	submitting: PropTypes.bool.isRequired
}

export default ContactForm
