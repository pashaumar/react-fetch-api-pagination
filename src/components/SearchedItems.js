import React from "react";
import { Link } from "react-router-dom";

function SearchedItems({ item, setItem, setSearchValue }) {
  const handleClick = () => {
    // console.log(item);
    setSearchValue("");
    localStorage.setItem("items", JSON.stringify(item));
    let ITEM = localStorage.getItem("items");
    ITEM = JSON.parse(ITEM);
    setItem(ITEM);
    console.log(ITEM);
  };
  return (
    <Link to={`/users/${item.id}`}>
      <p className="searched-items" onClick={handleClick}>
        {item.first_name} {item.last_name}
      </p>
    </Link>
  );
}

export default SearchedItems;
