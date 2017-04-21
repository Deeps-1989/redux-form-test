import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { sendActivationEmail, resetAuthError } from "../../actions";

export const renderField = ({
  input,
  label,
  type,
  meta: { touched, error }
}) => (
  <fieldset className="form-group">
    <div className={touched && error ? "has-danger" : ""}>
      <p>Resend Confirmation Instructions</p>
      <input
        {...input}
        placeholder={label}
        type={type}
        className="form-control"
      />
      {touched && error && <span className="error">{error}</span>}
    </div>
  </fieldset>
);

export class Confirmation extends Component {
  componentWillUnmount() {
    this.props.resetAuthError();
  }

  handleFormSubmit({ email }) {
    this.props.sendActivationEmail({ email });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        {this.renderAlert()}
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field
            label="Email"
            name="email"
            component={renderField}
            type="text"
          />
          <button type="submit" className="btn btn-primary">Resend</button>
        </form>
      </div>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = "Please enter an email";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)
  ) {
    errors.email = "Please enter a valid email address";
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

Confirmation = reduxForm({
  form: "confirmation",
  validate
})(Confirmation);

Confirmation = connect(mapStateToProps, {
  sendActivationEmail,
  resetAuthError
})(Confirmation);

export default Confirmation;
