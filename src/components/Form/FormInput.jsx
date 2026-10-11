const FormInput = ({ label, type, name, def }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        defaultValue={def}
        className="input input-bordered w-full"
      />
    </div>
  );
};
export default FormInput;
