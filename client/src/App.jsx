import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PolicyPage from './tablePages/policyPage/PolicyPage';

axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.withCredentials = true;

const InsuranceSystem = () => {

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [refreshInfo, setRefreshInfo] = useState(false)
  const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    // Fetch users
    axios.get('/users')
      .then(response => setUsers(response.data))
      .catch(error => {
        console.error('Error fetching users:', error);
      });

    setRefreshInfo(false);

  }, [refreshInfo]);

  useEffect(() => {
    if (selectedUser) {
      const userId = selectedUser._id;
      fetchSelectedUser(userId);
    }
  }, [refreshInfo]);

  const handleProfileClick = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
    setOpen(true);
  };

  const fetchSelectedUser = async (userId) => {
    try {
      const response = await axios.get(`/users/${userId}`);
      setSelectedUser(response.data);
    } catch (error) {
      console.error('Error fetching selected user data:', error);
    }
  };

  // const handleCloseDrawer = () => {
  //   setSelectedUser(null);
  //   setOpen(false);
  // };

  return (
    <div>
      <div className="main-content">
        <PolicyPage users={users} onProfileClick={handleProfileClick} handleEditClick={handleEditClick} />
      </div>
    </div>
  );
};

export default InsuranceSystem;
