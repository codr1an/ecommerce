import React, { useState, useEffect } from "react";
import "./UserManagement.css";
import MenuBar from "../Home/MenuBar/MenuBar";
import { useNavigate } from "react-router-dom";
import { message } from "react-message-popup";

const UserManagement = () => {
  const [users, setUsers] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8080/api/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        navigate("/home");
      }
    };

    fetchUsers();
  }, []);

  if (!users) {
    return <div>Loading...</div>;
  }

  const handleEdit = (userId) => {
    navigate(`/edit-user/${userId}`);
    console.log(`Update user with ID: ${userId}`);
  };

  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/api/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
      message.success("User deleted succesfully", 2000);
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error("Something went wrong, please try again", 2000);
    }
  };

  return (
    <div className="front-page">
      <MenuBar />
      <div className="user-page">
        <h1>User Management</h1>

        <div className="user-container">
          <table border="1" className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>
                    <button
                      className="update-button"
                      onClick={() => handleEdit(user.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
