import React from "react";
import UserTableChild from "./UserTableChild";
function UserTable({ activePageData }) {
  return (
    <table className="table">
      <tbody>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Website</th>
        </tr>
        {activePageData.length > 0 &&
          activePageData.map((item, index) => (
            <UserTableChild item={item} key={index + 1} />
          ))}
      </tbody>
    </table>
  );
}

export default UserTable;
