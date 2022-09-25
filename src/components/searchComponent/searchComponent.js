import { useState, useEffect } from "react";
import "./searchComponent.css";

function SearchComponent(props) {
  const { data, isEnable } = props;
  const [value, setValue] = useState("");
  const [list, setList] = useState(data);
  const [show, setShow] = useState(true);

  useEffect(() => {
    setList(list);
  }, [list, isEnable]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setValue(value);
    const newList = [];
    data.forEach((item) => {
      if (item.name.includes(value.toUpperCase())) {
        newList.push(item);
      }
    });
    setList(newList);
  };

  return (
    <div
      className="search-box"
      onBlur={function (e) {
        console.log();
        if (e.target.nodeName !== "INPUT") {
          alert("asdfasdf");
          setShow(false);
          setList([]);
          setValue("");
        }
      }}
    >
      <div>
        <input
          type="text"
          className="form-control"
          placeholder="Search symbol to add"
          value={value}
          onFocus={() => {
            setShow(true);
          }}
          onChange={handleInputChange}
          disabled={isEnable}
          style={{
            lineHeight: "1rem",
          }}
        />
        {list.length && show ? (
          <ul className="search-items">
            {list.map((item) => {
              return (
                <li key={item._id} className="search-item">
                  <label>
                    <input type="checkbox" className="search-item-checkbox" />
                    <span>{item.name}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

export default SearchComponent;
