import "./Select.scss";
import { v4 as uuidv4 } from "uuid";

const Select = ({ options, onChange }) => {
  const optionsJSX = options.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));

  const id = uuidv4();

  return (
    <div className="select">
      <label className="select-label" htmlFor={`select-filter-${id}`}>
        Select Filter
      </label>
      <select
        className="select-filter"
        name="select-filter"
        id={`select-filter-${id}`}
        onChange={onChange}
      >
        {optionsJSX}
      </select>
    </div>
  );
};

export default Select;
