import React from 'react';
import Table from '@mui/joy/Table';
import Checkbox from '@mui/joy/Checkbox';
import Chip from '@mui/joy/Chip';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ResizableTableCell from '../../tableUtils/ResizableTableCell';
import RowMenu from '../../tableUtils/RowMenu';

const PolicyTableCells = ({
    users, selected, setSelected, order, setOrder,
    onProfileClick, handleEditClick,
    stableSort, paginatedTenants,
    getComparator
}) => (
    <Table
        aria-labelledby="tableTitle"
        stickyHeader
        hoverRow
        noWrap={false}
        sx={{
            '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
            '--Table-headerUnderlineThickness': '1px',
            '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
            '--TableCell-paddingY': '4px',
            '--TableCell-paddingX': '8px',
            '& tr > *:last-child': {
                position: 'sticky',
                right: 0,
                bgcolor: 'var(--TableCell-headBackground)',
            }
        }}
    >
        <thead>
            <tr>
                <th style={{ width: 48, textAlign: 'center', padding: '12px 6px', borderRight: '1px solid rgba(0, 0, 0, 0.1)' }}>
                    <Checkbox
                        size="sm"
                        indeterminate={
                            selected.length > 0 && selected.length !== users.length
                        }
                        checked={selected.length === users.length}
                        onChange={(event) => {
                            setSelected(
                                event.target.checked ? users.map((user) => user._id) : [],
                            );
                        }}
                        color={
                            selected.length > 0 || selected.length === users.length
                                ? 'primary'
                                : undefined
                        }
                        sx={{ verticalAlign: 'text-bottom' }}
                    />
                </th>
                <ResizableTableCell>
                    <Link
                        underline="none"
                        color="primary"
                        component="button"
                        onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                        fontWeight="lg"
                        endDecorator={<ArrowDropDownIcon />}
                        sx={{
                            '& svg': {
                                transition: '0.2s',
                                transform:
                                    order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                            },
                        }}
                    >
                        User
                    </Link>
                </ResizableTableCell>
                {<ResizableTableCell>Policy</ResizableTableCell>}
                {<ResizableTableCell>Current company</ResizableTableCell>}
                {<ResizableTableCell>Address</ResizableTableCell>}
                <th aria-label="last" style={{ width: 48, textAlign: 'center', padding: '12px 6px', borderLeft: '1px solid rgba(0, 0, 0, 0.1)' }} />
            </tr>
        </thead>
        <tbody>
            {stableSort(paginatedTenants, getComparator(order, 'id')).map((user) => {
                const isItemSelected = selected.indexOf(user._id) !== -1;
                return (
                    <tr key={user._id}>
                        <td className="table-cell" style={{ textAlign: 'center' }}>
                            <Checkbox
                                size="sm"
                                checked={isItemSelected}
                                onChange={(event) => {
                                    if (event.target.checked) {
                                        setSelected((prevSelected) => [...prevSelected, user._id]);
                                    } else {
                                        setSelected((prevSelected) =>
                                            prevSelected.filter((id) => id !== user._id),
                                        );
                                    }
                                }}
                                color={isItemSelected ? 'primary' : undefined}
                                sx={{ verticalAlign: 'text-bottom' }}
                            />
                        </td>
                        <td className="table-cell">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <div>
                                    <Typography
                                        fontWeight="lg"
                                        level="body3"
                                        textColor="text.primary"
                                    >
                                        <Link
                                            href="#"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                onProfileClick(user);
                                            }}
                                        >
                                            {`${user.firstName} ${user.lastName}`}
                                        </Link>
                                    </Typography>
                                </div>
                            </Box>
                        </td>
                        <td className="table-cell">{user.policy}</td>
                        <td className="table-cell">{user.currentCompany}</td>
                        <td className="table-cell">{`${user.address?.flat ? `${user.address.flat}, ` : ''}${user.address?.street ? `${user.address.street}, ` : ''}${user.address?.city ? `${user.address.city}, ` : ''}${user.address?.state ? `${user.address.state}, ` : ''}${user.address?.postcode || ''}`}</td>
                        <td style={{ textAlign: 'center', borderLeft: '1px solid rgba(0, 0, 0, 0.1)', zIndex: '2' }}>
                            <RowMenu
                                onEdit={() => handleEditClick(user)}
                                onProfile={() => onProfileClick(user)}
                            />
                        </td>
                    </tr>
                );
            })}
        </tbody>
    </Table>
);

export default PolicyTableCells;
