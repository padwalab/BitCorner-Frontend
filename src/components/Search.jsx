import React, { useState } from "react";

const Search = () => {
  const [keys, setKeys] = useState("");
  const [keys2, setKeys2] = useState(0);
  const [keys3, setKeys3] = useState();

  const onChangeKeys = (e) => {
    let f = e.target.value;
    setKeys(f);
  };

  const onChangeKeys2 = (e) => {
    let f = e.target.value;
    setKeys2(f);
  };
  const onChangeKeys3 = (e) => {
    let f = e.target.value;
    setKeys2(f);
  };

  return (
    <div>
      <input
        placeholder="Search"
        onChange={onChangeKeys}
        type="text"
        data-testid="searchKeys"
      />
      <input
        placeholder="Search"
        onChange={onChangeKeys2}
        type="number"
        data-testid="searchKeys2"
      />
      <input
        placeholder="Search"
        onChange={onChangeKeys3}
        type="url"
        data-testid="searchKeys3"
      />
    </div>
  );
};

export default Search;
