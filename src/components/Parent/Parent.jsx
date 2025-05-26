import React, { useEffect, useState } from "react";
import Users from "../Users/Users";
import AddUser from "../AddUser/AddUser";

export default function Parent() {
  const [users, setUsers] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genericToast, setGenericToast] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    age: "",
    email: "",
    isFemale: ""
  });
  const [addButton, setAddButton] = useState("Add User");
  const [editingUserId, setEditingUserId] = useState(null);

  // Update filteredArray whenever users or searchTerm changes
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredArray(users);
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      setFilteredArray(
        users.filter(
          (user) =>
            user.name.toLowerCase().includes(lowerSearch) ||
            user.email.toLowerCase().includes(lowerSearch)
        )
      );
    }
  }, [users, searchTerm]);

  // Only update searchTerm on input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const emptyFields = () => {
    setUserInfo({
      name: "",
      age: "",
      email: "",
      isFemale: ""
    });
  };

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (genericToast) {
      const timer = setTimeout(() => {
        setGenericToast("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [genericToast]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInfo.name || !userInfo.email || !userInfo.age) {
      setGenericToast("Please fill out all fields.");
      return;
    }

    if (addButton === "Add User") {
      addUserData(userInfo);
      emptyFields();
      setGenericToast("User added successfully");
    } else {
      setUsers(
        users.map((user) =>
          user.id === editingUserId ? { ...userInfo, id: editingUserId } : user
        )
      );
      emptyFields();
      setGenericToast("User updated successfully");
      setEditingUserId(null);
      setAddButton("Add User");
    }
  };

  const addUserData = (data) => {
    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    setUsers([...users, { ...data, id: newId }]);
  };

  const deleteUserData = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const updateUserData = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    if (userToEdit) {
      setEditingUserId(id);
      setUserInfo(userToEdit);
      setAddButton("Update User");
    }
  };

  return (
    <div className="py-2 w-lg-50 container mx-auto">
      <AddUser
        addButton={addButton}
        userInfo={userInfo}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <Users
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        genericToast={genericToast}
        updateUserData={updateUserData}
        deleteUserData={deleteUserData}
        users={searchTerm ? filteredArray : users}
      />
    </div>
  );
}
