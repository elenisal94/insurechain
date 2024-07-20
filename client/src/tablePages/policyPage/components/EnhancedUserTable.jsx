import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Sheet from '@mui/joy/Sheet';
import IconButton from '@mui/joy/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import '../../tableUtils/TableStyles.css';
import SearchInput from '../../tableUtils/SearchInput'
import FiltersModal from '../../tableUtils/FiltersModal'
import PolicyTableCells from './PolicyTableCells'
import Pagination from '../../tableUtils/Pagination'

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}


export default function EnhancedUserTable({ users, onProfileClick, handleEditClick }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [order, setOrder] = useState('desc');
    const [selected, setSelected] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;


    const handleClearSearch = () => {
        setSearchQuery('');
    };

    const clearStatusFilter = (setStatusFilter) => {
        setStatusFilter([]);
        setCurrentPage(1);
    };


    const filteredUsers = users.filter((user) => {
        const fullName = `${user.firstName ?? ''} ${user.lastName ?? ''}`.toLowerCase();
        const query = searchQuery.toLowerCase();
        const matchesQuery = (
            fullName.includes(query) ||
            user.email?.toLowerCase().includes(query) ||
            user.phone?.toLowerCase().includes(query) ||
            (user.address &&
                (user.address.flat + ' ' + user.address.street + ' ' + user.address.city + ' ' + user.address.postcode)
                    .toLowerCase()
                    .includes(query)
            ));

        return matchesQuery;
    });

    const totalItems = filteredUsers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const paginatedTenants = stableSort(filteredUsers, getComparator(order, 'id')).slice(startIndex, endIndex);


    return (
        <>
            <Sheet
                className="SearchAndFilters-mobile"
                sx={{
                    display: { xs: 'flex', sm: 'none' },
                    my: 1,
                    gap: 1,
                }}
            >
                <SearchInput
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    handleClearSearch={handleClearSearch}
                />
                <FiltersModal open={open} setOpen={setOpen} />
            </Sheet>
            <Box
                className="SearchAndFilters-tabletUp"
                sx={{
                    borderRadius: 'sm',
                    py: 2,
                    display: { xs: 'none', sm: 'flex' },
                    flexWrap: 'wrap',
                    gap: 1.5,
                    '& > *': {
                        minWidth: { xs: '120px', md: '160px' },
                    },
                }}
            >
                <FormControl sx={{ flex: 1 }} size="sm">
                    <FormLabel>Search for user or policy</FormLabel>
                    <Input size="sm" placeholder="Search" startDecorator={<SearchIcon />} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                        endDecorator={
                            searchQuery && (
                                <IconButton onClick={handleClearSearch}>
                                    <ClearIcon />
                                </IconButton>
                            )
                        } />
                </FormControl>
            </Box>
            <Sheet
                className="TenantTableContainer"
                variant="outlined"
                sx={{
                    '--TableRow-stripeBackground': 'rgba(0 0 0 / 0.04)',
                    '--TableRow-hoverBackground': 'rgba(0 0 0 / 0.08)',
                    display: 'block',
                    width: '100%',
                    borderRadius: 'sm',
                    flexShrink: 1,
                    overflowX: 'auto',
                    minHeight: 0,
                    '@media (max-width: 600px)': {
                        display: 'block',
                    },
                }}
            >
                <PolicyTableCells
                    users={users}
                    selected={selected}
                    setSelected={setSelected}
                    onProfileClick={onProfileClick}
                    handleEditClick={handleEditClick}
                    stableSort={stableSort}
                    order={order}
                    setOrder={setOrder}
                    paginatedTenants={paginatedTenants}
                    getComparator={getComparator}
                />
            </Sheet>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePreviousPage={handlePreviousPage}
                handleNextPage={handleNextPage}
                startIndex={startIndex}
                endIndex={endIndex}
                totalItems={totalItems}
            />
        </>
    );
}
