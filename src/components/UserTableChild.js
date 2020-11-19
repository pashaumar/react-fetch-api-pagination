import React, { useEffect } from "react";

function UserTableChild({ item }) {
  return (
    <tr>
      <td>{item.first_name}</td>
      <td>{item.last_name}</td>
      <td>{item.email}</td>
      <td>
        <a href={item.web} target="_blank">
          {item.web}
        </a>
      </td>
    </tr>
  );
}

export default UserTableChild;
