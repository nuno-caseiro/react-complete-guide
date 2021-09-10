import useInput from "../hooks/use-input";

const isNotEmpty = value => value.trim() !== ""
const isEmail = value => value.includes('@')

const BasicForm = (props) => {
  const {
    value: firstNameEntered,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: firstNameReset,
  } = useInput(isNotEmpty);

  const {
    value: lastNameEntered,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: lastNameReset,
  } = useInput(isNotEmpty);

  const {
    value: emailEntered,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput(isEmail);

  let formIsValid = false;

  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  const formSubmissionHandler = () => {
    if (!formIsValid) {
      return;
    }

    firstNameReset();
    lastNameReset();
    emailReset();
  };

  const classes = firstNameHasError ? 'form-control invalid': 'form-control'

  return (
    <form>
      <div className="control-group">
        <div className={classes}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            value={firstNameEntered}
            onChange={firstNameHandler}
            onBlur={firstNameBlurHandler}
          />
          {firstNameHasError && <p className="error-text">The first name is invalid</p>}
        </div>
        <div className={classes}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastNameEntered}
            onChange={lastNameHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameHasError && <p className="error-text">The Last name is invalid</p>}
        </div>
      </div>
      <div className={classes}>
          <label htmlFor="name">Email Name</label>
          <input
            type="text"
            id="name"
            value={emailEntered}
            onChange={emailHandler}
            onBlur={emailBlurHandler}
          />
          {emailHasError && <p className="error-text">The Email name is invalid</p>}
        </div>
      <div className="form-actions">
        <button onClick={formSubmissionHandler} disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
