import "./Select.scss";

const Select = ({ options, onChange }) => {
  const optionsJSX = options.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));

  return (
    <div className="select">
      <label htmlFor="select-filter">Select Filter</label>
      <select name="select-filter" id="select-filter" onChange={onChange}>
        {optionsJSX}
      </select>
    </div>
  );
};

export default Select;
