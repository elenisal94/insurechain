import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PolicyPage from './tablePages/policyPage/PolicyPage';
import mockData from './mockData';
import DrawerFilters from './Drawer';  // Adjust the path

const InsuranceSystem = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [refreshInfo, setRefreshInfo] = useState(false);

  useEffect(() => {
    // Set mock data to state
    setUsers(mockData);
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetchSelectedUser(selectedUser._id);
    }
  }, [refreshInfo]);

  const handleProfileClick = (user) => {
    setSelectedUser(user);
    setOpenDrawer(true);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
    setOpenDrawer(true);
  };

  const fetchSelectedUser = async (userId) => {
    try {
      const response = await axios.get(`/users/${userId}`);
      setSelectedUser(response.data);
    } catch (error) {
      console.error('Error fetching selected user data:', error);
    }
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setSelectedUser(null);
    setIsEditing(false);
  };

  return (
    <div>
      <div className="main-content">
        <PolicyPage users={users} onProfileClick={handleProfileClick} handleEditClick={handleEditClick} />
      </div>
      <DrawerFilters
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        selectedUser={selectedUser}
        open={openDrawer}
        onClose={handleCloseDrawer}
        setRefreshInfo={setRefreshInfo}
      />
    </div>
  );
};

export default InsuranceSystem;
