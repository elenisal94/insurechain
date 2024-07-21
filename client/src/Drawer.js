import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import Button from '@mui/joy/Button';
import DialogTitle from '@mui/joy/DialogTitle';
import Input from "@mui/joy/Input";
import DialogContent from '@mui/joy/DialogContent';
import ModalClose from '@mui/joy/ModalClose';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import CircularProgress from '@mui/joy/CircularProgress';
import { useMediaQuery, useTheme } from '@mui/material';

export default function DrawerFilters({ isEditing, setIsEditing, selectedUser, open, onClose, setRefreshInfo }) {
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => console.log(data);

    const [userData, setUserData] = useState(selectedUser || {});
    const [flat, setFlat] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [postcode, setPostcode] = useState('');

    useEffect(() => {
        setUserData(selectedUser || {});
        if (selectedUser?.address) {
            const { flat, street, city, postcode } = selectedUser.address;
            setFlat(flat || '');
            setStreet(street || '');
            setCity(city || '');
            setPostcode(postcode || '');
        }
    }, [selectedUser]);

    const handleEditButtonClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('address.')) {
            const fieldName = name.split('.')[1];
            switch (fieldName) {
                case 'flat':
                    setFlat(value);
                    break;
                case 'street':
                    setStreet(value);
                    break;
                case 'city':
                    setCity(value);
                    break;
                case 'postcode':
                    setPostcode(value);
                    break;
                default:
                    break;
            }
        } else {
            setUserData(prevData => ({ ...prevData, [name]: value }));
        }
    };

    const handleBackButtonClick = () => {
        setIsEditing(false);
    };

    const finalSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const updatedAddress = { flat, street, city, postcode };
            const updatedData = { ...userData, address: updatedAddress };
            await axios.put(`http://localhost:3001/api/users/${userData._id}`, updatedData);
            setUserData(updatedData);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
            setIsEditing(false);
            setRefreshInfo(true);
        }
    };

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    // Sample policy history
    const policyHistory = [
        { company: "Acme Insurance", startDate: "2022-01-15", endDate: "2023-01-15" },
        { company: "Global Insurance Co.", startDate: "2021-01-10", endDate: "2022-01-10" },
        { company: "SecureLife Ltd.", startDate: "2020-01-05", endDate: "2021-01-05" },
    ];

    return (
        <Drawer
            size={isSmallScreen ? 'lg' : 'md'}
            variant="plain"
            anchor={isSmallScreen ? 'bottom' : 'right'}
            open={open}
            onClose={onClose}
            hideBackdrop={false}
            slotProps={{
                content: {
                    sx: {
                        bgcolor: 'transparent',
                        p: { md: 3, sm: 0 },
                        boxShadow: 'none',
                        height: isSmallScreen ? '85vh' : '100%',
                    },
                },
            }}
            ModalProps={{
                style: {
                    pointerEvents: 'none',
                },
            }}
        >
            <Sheet
                variant="outlined"
                sx={{
                    borderRadius: 'md',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    height: '100%',
                    overflow: 'auto',
                }}
            >
                <ModalClose />
                <DialogTitle>User information</DialogTitle>
                <DialogContent>
                    {selectedUser && (
                        !isEditing ? (
                            <FormControl orientation="horizontal">
                                <Box sx={{ flex: 1, pr: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                        <FormLabel sx={{ typography: 'title-sm' }}>Name</FormLabel>
                                        <FormHelperText sx={{ typography: 'body-sm' }}>
                                            {userData?.firstName} {userData?.lastName}
                                        </FormHelperText>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                        <FormLabel sx={{ typography: 'title-sm' }}>Policy name</FormLabel>
                                        <FormHelperText sx={{ typography: 'body-sm' }}>
                                            {userData?.policy}
                                        </FormHelperText>
                                    </Box>
                                    <Divider />
                                    <Typography level="title-md" fontWeight="bold" sx={{ mt: 2 }}>
                                        Policy History
                                    </Typography>
                                    {policyHistory.length > 0 ? (
                                        <Box>
                                            {policyHistory.map((policy, index) => (
                                                <Box key={index} sx={{ mb: 2 }}>
                                                    <FormControl>
                                                        <FormLabel sx={{ typography: 'title-sm' }}>
                                                            Company
                                                        </FormLabel>
                                                        <FormHelperText sx={{ typography: 'body-sm' }}>
                                                            {policy.company}
                                                        </FormHelperText>
                                                    </FormControl>
                                                    <FormControl>
                                                        <FormLabel sx={{ typography: 'title-sm' }}>
                                                            Start Date
                                                        </FormLabel>
                                                        <FormHelperText sx={{ typography: 'body-sm' }}>
                                                            {new Date(policy.startDate).toLocaleDateString()}
                                                        </FormHelperText>
                                                    </FormControl>
                                                    <FormControl>
                                                        <FormLabel sx={{ typography: 'title-sm' }}>
                                                            End Date
                                                        </FormLabel>
                                                        <FormHelperText sx={{ typography: 'body-sm' }}>
                                                            {new Date(policy.endDate).toLocaleDateString()}
                                                        </FormHelperText>
                                                    </FormControl>
                                                </Box>
                                            ))}
                                        </Box>
                                    ) : (
                                        <Typography>No policy history available.</Typography>
                                    )}
                                </Box>
                            </FormControl>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {/* Form fields for editing */}
                                <FormControl>
                                    <FormLabel>First Name</FormLabel>
                                    <Input
                                        name="firstName"
                                        variant="outlined"
                                        value={userData?.firstName || ""}
                                        onChange={handleInputChange}
                                        fullWidth
                                        sx={{ marginBottom: 1 }}
                                        placeholder="First name"
                                    />
                                </FormControl>
                                {errors[`firstName-${selectedUser?._id}`] && <span>This field is required</span>}
                                <FormControl>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input
                                        name="lastName"
                                        variant="outlined"
                                        value={userData?.lastName}
                                        onChange={handleInputChange}
                                        fullWidth
                                        sx={{ marginBottom: 1 }}
                                    />
                                </FormControl>
                                <FormControl required>
                                    <FormLabel>Policy Name</FormLabel>
                                    <Input
                                        name="email"
                                        value={userData?.policy}
                                        onChange={handleInputChange}
                                        fullWidth
                                        sx={{ marginBottom: 1 }}
                                    />
                                </FormControl>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    useFlexGap
                                    spacing={1}
                                >
                                    <Button
                                        variant="outlined"
                                        color="neutral"
                                        onClick={handleBackButtonClick}>
                                        Back
                                    </Button>
                                    <Button type="submit" color="success" variant="soft">
                                        {isLoading ? <CircularProgress size={24} /> : "Save Changes"}
                                    </Button>
                                </Stack>
                            </form>
                        )
                    )}
                </DialogContent>
            </Sheet>
        </Drawer>
    );
}
