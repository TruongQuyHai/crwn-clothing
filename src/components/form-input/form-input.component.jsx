import "./form-input.styles.scss";

const FormInput = ({ label, id, ...otherProps }) => {
  return (
    <div className="group">
      <input className="form-input" id={id} {...otherProps} />
      {label && (
        <label
          className={`${
            otherProps.value.length ? "shrink" : ""
          } form-input-label`}
          htmlFor={id}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
