import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import UserTable from "./components/UserTable";
import SearchedItems from "./components/SearchedItems";
import Buttons from "./components/Buttons";
import UserDetails from "./components/UserDetails";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Redirect,
} from "react-router-dom";

function App() {
  const history = useHistory();
  const [employeesData, setEmployeesData] = useState([]);
  const [currentButton, setCurrentButton] = useState(1);
  const [activePageData, setActivePageData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchByName, setSearchByName] = useState([]);
  const [item, setItem] = useState([]);

  const pageSize = 10;
  const buttonSize = 10;
  const LAST_BUTTON = 50;
  const [buttons, setButtons] = useState(
    Array(buttonSize)
      .fill(1)
      .map((item, index) => item + index)
  );

  useEffect(() => {
    axios
      .get(
        "https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json"
      )
      .then((response) => {
        setEmployeesData(response.data);
      });
  }, []);
  useEffect(() => {
    setActivePageData(
      employeesData.slice(currentButton * 10 - 10, currentButton * 10)
    );
  }, [employeesData]);
  useEffect(() => {
    setActivePageData(
      employeesData.slice(currentButton * 10 - 10, currentButton * 10)
    );
  }, [currentButton]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchByName(
      employeesData.filter((item) => {
        return (
          item.first_name.toLowerCase().includes(value.toLowerCase()) ||
          item.last_name.toLowerCase().includes(value.toLowerCase())
        );
      })
    );
    setSearchValue(value);
  };
  const handleClearSearch = () => {
    setSearchValue("");
  };
  const handleButtonClick = (item) => {
    setCurrentButton(item);

    const firstButton = buttons[0];
    const lastButton = buttons[buttons.length - 1];
    if (item <= 1) {
      return;
    }
    if (item >= LAST_BUTTON) {
      return;
    }
    if (
      lastButton === LAST_BUTTON - pageSize / 2 + 1 &&
      item >= LAST_BUTTON - pageSize + 1
    ) {
      setButtons(
        Array(buttonSize)
          .fill(41)
          .map((item, index) => {
            return item + index;
          })
      );
      return;
    }
    if (firstButton === pageSize / 2 && item <= pageSize) {
      setButtons(
        Array(buttonSize)
          .fill(1)
          .map((item, index) => {
            return item + index;
          })
      );
      return;
    }
    if (item === firstButton) {
      setButtons(
        Array(buttonSize)
          .fill(firstButton - buttonSize + 1)
          .map((item, index) => {
            return item + index;
          })
      );
    }
    if (item === lastButton) {
      setButtons(
        Array(buttonSize)
          .fill(lastButton)
          .map((item, index) => {
            return item + index;
          })
      );
    }
  };
  const handlePrevClick = (currentButton) => {
    const firstButton = buttons[0];
    const lastButton = buttons[buttons.length - 1];
    if (currentButton === 1) {
      return;
    }
    setCurrentButton(currentButton - 1);

    if (currentButton - 1 <= pageSize) {
      setButtons(
        Array(buttonSize)
          .fill(1)
          .map((item, index) => {
            return item + index;
          })
      );
      return;
    }
    if (currentButton - 1 === firstButton) {
      setButtons(
        Array(buttonSize)
          .fill(firstButton - buttonSize + 1)
          .map((item, index) => {
            return item + index;
          })
      );
    } else if (currentButton === firstButton) {
      setButtons(
        Array(buttonSize)
          .fill(firstButton - buttonSize + 1)
          .map((item, index) => {
            return item + index;
          })
      );
    }
  };
  const handleNextClick = (currentButton) => {
    const firstButton = buttons[0];
    const lastButton = buttons[buttons.length - 1];
    if (currentButton === LAST_BUTTON) {
      return;
    }
    setCurrentButton(currentButton + 1);

    if (currentButton + 1 >= LAST_BUTTON - pageSize + 1) {
      setButtons(
        Array(buttonSize)
          .fill(41)
          .map((item, index) => {
            return item + index;
          })
      );
      return;
    }
    if (currentButton + 1 === lastButton) {
      setButtons(
        Array(buttonSize)
          .fill(lastButton)
          .map((item, index) => {
            return item + index;
          })
      );
    } else if (currentButton === lastButton) {
      setButtons(
        Array(buttonSize)
          .fill(lastButton)
          .map((item, index) => {
            return item + index;
          })
      );
    }
  };

  const table = () => {
    return (
      <>
        <UserTable
          activePageData={activePageData.length > 0 && activePageData}
        />
        <div className="buttons">
          <button
            onClick={() => handlePrevClick(currentButton)}
            className={currentButton === 1 ? "inactive" : ""}
          >
            PREV
          </button>
          {buttons.map((item) => (
            <Buttons
              item={item}
              key={item}
              currentButton={currentButton}
              handleButtonClick={handleButtonClick}
            />
          ))}
          <button
            onClick={() => handleNextClick(currentButton)}
            className={currentButton === 50 ? "inactive" : ""}
          >
            NEXT
          </button>
        </div>
        <p className="current-button-info">Page {currentButton} of 50</p>
      </>
    );
  };
  const userDetails = () => {
    return <UserDetails item={item} />;
  };
  const loading = () => {
    return <h1>loading</h1>;
  };
  return (
    // <Router>
    //   <Switch>
    //     <Route path="/" exact component={MainComponent} />
    //     <Route path="/user-details" component={UserDetails} />
    //   </Switch>
    // </Router>
    <Router>
      <div className="App">
        <div className="navbar">
          <h1 className="title">User Table Page</h1>
          <div className="search-container">
            <input
              type="text"
              name="search"
              id="search"
              onChange={handleSearch}
              value={searchValue}
              placeholder={"Search by first or last name"}
            />
            {searchValue.length > 0 ? (
              <i className="fas fa-times" onClick={handleClearSearch}></i>
            ) : (
              <i className="fas fa-search"></i>
            )}

            {searchValue.length > 0 && (
              <div className="searched-items-container">
                {searchByName.map((item) => {
                  return (
                    <SearchedItems
                      item={item}
                      setItem={setItem}
                      key={item.id}
                      setSearchValue={setSearchValue}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <Switch>
          <Route path="/users/:id" component={userDetails} />
          <Route path="/users" exact component={table} />
          <Route path="/" render={() => <Redirect to="/users" />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
