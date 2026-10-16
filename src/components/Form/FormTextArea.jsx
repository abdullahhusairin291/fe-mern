const FormTextArea = ({ label, name, defaultValue = "", rows = 4 }) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{label}</legend>
      <textarea
        className="textarea w-full"
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        required
      />
    </fieldset>
  );
};

export default FormTextArea;
