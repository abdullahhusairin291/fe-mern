const FormSelect = ({ label, name, list, def }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <select
        name={name}
        defaultValue={def}
        className="select select-bordered w-full"
      >
        <option value="">All</option>
        {list.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};
export default FormSelect;
