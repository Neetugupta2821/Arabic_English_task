import React, { useState, useEffect, useRef } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Checkbox,
    IconButton,
    Menu,
    MenuItem,
    Button,
    Box,
    Collapse,
    Avatar,
    Select,
    MenuItem as MuiMenuItem,
    Chip,
    FormControl,
    TextField,
} from '@mui/material';
import {
    Add as AddIcon,
    MoreVert as MoreVertIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@mui/icons-material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Usertable = () => {
    const [rows, setRows] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState({});
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const [openSubtaskRows, setOpenSubtaskRows] = useState({});
    const [anchorEls, setAnchorEls] = useState({});
    const [availablePersons, setAvailablePersons] = useState([
        { name: 'Person 1', avatar: 'https://i.pravatar.cc/150?img=1' },
        { name: 'Person 2', avatar: 'https://i.pravatar.cc/150?img=2' },
        { name: 'Person 3', avatar: null },
        { name: 'Person 4', avatar: 'https://i.pravatar.cc/150?img=4' },
        { name: 'Person 5', avatar: 'https://i.pravatar.cc/150?img=5' },
    ]);

    const [selectedDropdownOptions, setSelectedDropdownOptions] = useState({});
    const [statusOptions, setStatusOptions] = useState(['Stuck', 'Working on It', 'Done', 'default']);
    const isInitialRender = useRef(true);

    useEffect(() => {
        if (isInitialRender.current) {
            const storedData = localStorage.getItem('userTableData');
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                const deserializedRows = parsedData.rows.map((row) => ({
                    ...row,
                    persons: row.persons.map((index) => availablePersons[index]),
                    subtasks: row.subtasks.map((subtask) => ({
                        ...subtask,
                        person: subtask.person !== null ? availablePersons[subtask.person] : null,
                    })),
                }));
                setRows(deserializedRows);
                setSelectedDropdownOptions(parsedData.selectedDropdownOptions || {});
            }
            isInitialRender.current = false;
        }
    }, []);

    useEffect(() => {
        if (!isInitialRender.current) {
            const serializedRows = rows.map((row) => ({
                ...row,
                persons: row.persons.map((person) => availablePersons.indexOf(person)),
                subtasks: row.subtasks.map((subtask) => ({
                    ...subtask,
                    person: subtask.person !== null ? availablePersons.indexOf(subtask.person) : null,
                })),
            }));
            localStorage.setItem(
                'userTableData',
                JSON.stringify({
                    rows: serializedRows,
                    selectedDropdownOptions: selectedDropdownOptions,
                })
            );
        }
    }, [rows, selectedDropdownOptions]);

    const handleDropdownOpen = (event, index) => {
        setAnchorEls({ ...anchorEls, [index]: event.currentTarget });
        setDropdownOpen({ ...dropdownOpen, [index]: true });
        setSelectedRowIndex(index);
    };

    const handleDropdownOptionChange = (option, index) => {
        const newSelectedOptions = { ...selectedDropdownOptions };
        if (!newSelectedOptions[index]) {
            newSelectedOptions[index] = [];
        }
        if (newSelectedOptions[index].includes(option)) {
            newSelectedOptions[index] = newSelectedOptions[index].filter((item) => item !== option);
        } else {
            newSelectedOptions[index] = [...newSelectedOptions[index], option];
        }
        setSelectedDropdownOptions(newSelectedOptions);
    };

    const handleDropdownClose = (index) => {
        setAnchorEls({ ...anchorEls, [index]: null });
        setDropdownOpen({ ...dropdownOpen, [index]: false });
        setSelectedRowIndex(null);
    };

    const handleCheckboxChange = (event, index) => {
        const newRows = [...rows];
        newRows[index].checked = event.target.checked;
        setRows(newRows);
    };

    const handleMenuClick = (event, index) => {
        setAnchorEl(event.currentTarget);
        setSelectedRowIndex(index);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedRowIndex(null);
    };

    const handleEditLabels = () => {
        console.log('Edit Labels clicked');
        handleMenuClose();
    };

    const handleAddRow = (e) => {
        e.preventDefault();
        const newRow = {
            checked: false,
            title: 'New ask new',
            persons: [],
            date: null,
            status: null,
            subtasks: [],
        };
        setRows([...rows, newRow]);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Stuck':
                return '#FFC107';
            case 'Working on It':
                return '#FF9800';
            case 'Done':
                return '#4CAF50';
            case 'default':
                return '#F44336';
            default:
                return 'transparent';
        }
    };

    const handleToggleSubtask = (index) => {
        setOpenSubtaskRows({
            ...openSubtaskRows,
            [index]: !openSubtaskRows[index],
        });
    };

    const getSubtaskCount = (subtasks) => {
        return subtasks ? subtasks.length : 0;
    };

    const handlePersonChange = (event, rowIndex) => {
        const { value } = event.target;
        const newRows = [...rows];
        newRows[rowIndex].persons = value.map((personIndex) => availablePersons[personIndex]);
        setRows(newRows);
    };

    const handleStatusChange = (event, index) => {
        const newRows = [...rows];
        newRows[index].status = event.target.value;
        setRows(newRows);
    };

    const handleDateChange = (date, index) => {
        const newRows = [...rows];
        newRows[index].date = date;
        setRows(newRows);
    };

    const handleAddSubtask = (rowIndex) => {
        const newRows = [...rows];
        newRows[rowIndex].subtasks.push({ title: 'New Subtask', person: null, status: null, text: '' });
        setRows(newRows);
    };

    const handleSubtaskPersonChange = (event, rowIndex, subIndex) => {
        const { value } = event.target;
        const newRows = [...rows];
        newRows[rowIndex].subtasks[subIndex].person = availablePersons[value];
        setRows(newRows);
    };

    const handleSubtaskStatusChange = (event, rowIndex, subIndex) => {
        const newRows = [...rows];
        newRows[rowIndex].subtasks[subIndex].status = event.target.value;
        setRows(newRows);
    };

    const handleSubtaskTextChange = (event, rowIndex, subIndex) => {
        const newRows = [...rows];
        newRows[rowIndex].subtasks[subIndex].text = event.target.value;
        setRows(newRows);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox" />
                            <TableCell>ask new</TableCell>
                            <TableCell>Person</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>status</TableCell>
                            <TableCell>Dropdown</TableCell>
                            <TableCell><AddCircleIcon /></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <React.Fragment key={index}>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox checked={row.checked} onChange={(event) => handleCheckboxChange(event, index)} />
                                    </TableCell>
                                    <TableCell>
                                        <Box display="flex" alignItems="center">
                                            <IconButton aria-label="expand row" size="small" onClick={() => handleToggleSubtask(index)}>
                                                {openSubtaskRows[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                            </IconButton>
                                            {row.title}({getSubtaskCount(row.subtasks)})
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <FormControl fullWidth>
                                            <Select
                                                multiple
                                                value={row.persons.map((person) => availablePersons.indexOf(person))}
                                                onChange={(event) => handlePersonChange(event, index)}
                                                renderValue={(selected) => (
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                        {selected.map((value) => (
                                                            <Chip
                                                                key={value}
                                                                avatar={availablePersons[value].avatar ? <Avatar src={availablePersons[value].avatar} /> : <Avatar>{availablePersons[value].name[0]}</Avatar>}
                                                                label={availablePersons[value].name}
                                                            />
                                                        ))}
                                                    </Box>
                                                )}
                                            >
                                                {availablePersons.map((person, personIndex) => (
                                                    <MuiMenuItem key={personIndex} value={personIndex}>
                                                        <Box display="flex" alignItems="center">
                                                            {person.avatar ? <Avatar src={person.avatar} sx={{ mr: 1 }} /> : <Avatar sx={{ mr: 1 }}>{person.name[0]}</Avatar>}
                                                            {person.name}
                                                        </Box>
                                                    </MuiMenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell>
                                        <DatePicker selected={row.date} onChange={(date) => handleDateChange(date, index)} />
                                    </TableCell>
                                    <TableCell>
                                        <FormControl fullWidth>
                                            <Select value={row.status || ''} onChange={(event) => handleStatusChange(event, index)}>
                                                {statusOptions.map((option) => (
                                                    <MenuItem key={option} value={option}>
                                                        <Chip label={option} style={{ backgroundColor: getStatusColor(option), color: 'white' }} />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={(event) => handleDropdownOpen(event, index)}>
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu
                                            anchorEl={anchorEls[index]}
                                            open={dropdownOpen[index] || false}
                                            onClose={() => handleDropdownClose(index)}
                                        >
                                            {['Week', 'Day', 'Months'].map((option) => (
                                                <MenuItem key={option} onClick={() => handleDropdownOptionChange(option, index)}>
                                                    <Checkbox checked={selectedDropdownOptions[index]?.includes(option) || false} />
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleAddSubtask(index)}>
                                            <AddIcon />
                                        </IconButton>
                                    </TableCell>
                                    {/* <TableCell>
                                        <IconButton aria-label="settings" onClick={(event) => handleMenuClick(event, index)}>
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl) && selectedRowIndex === index} onClose={handleMenuClose}>
                                            <MenuItem onClick={handleEditLabels}>Edit Labels</MenuItem>
                                        </Menu>
                                    </TableCell> */}
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                                        <Collapse in={openSubtaskRows[index]} timeout="auto" unmountOnExit>
                                            <Box sx={{ margin: 1 }}>
                                                <Table size="small" aria-label="purchases">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Subtask</TableCell>
                                                            <TableCell>Person</TableCell>
                                                            <TableCell>Status</TableCell>
                                                            <TableCell>Text</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {row.subtasks.map((subtask, subIndex) => (
                                                            <TableRow key={subIndex}>
                                                                  <TableCell>{subtask.title}</TableCell>
                                                                <TableCell>
                                                                    <FormControl fullWidth>
                                                                        <Select
                                                                            value={subtask.person !== null ? availablePersons.indexOf(subtask.person) : null}
                                                                            onChange={(event) => handleSubtaskPersonChange(event, index, subIndex)}
                                                                        >
                                                                            {availablePersons.map((person, personIndex) => (
                                                                                <MuiMenuItem key={personIndex} value={personIndex}>
                                                                                    <Box display="flex" alignItems="center">
                                                                                        {person.avatar ? <Avatar src={person.avatar} sx={{ mr: 1 }} /> : <Avatar sx={{ mr: 1 }}>{person.name[0]}</Avatar>}
                                                                                        {person.name}
                                                                                    </Box>
                                                                                </MuiMenuItem>
                                                                            ))}
                                                                        </Select>
                                                                    </FormControl>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <FormControl fullWidth>
                                                                        <Select value={subtask.status || ''} onChange={(event) => handleSubtaskStatusChange(event, index, subIndex)}>
                                                                            {statusOptions.map((option) => (
                                                                                <MenuItem key={option} value={option}>
                                                                                    <Chip label={option} style={{ backgroundColor: getStatusColor(option), color: 'white' }} />
                                                                                </MenuItem>
                                                                            ))}
                                                                        </Select>
                                                                    </FormControl>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <TextField
                                                                        value={subtask.text}
                                                                        onChange={(event) => handleSubtaskTextChange(event, index, subIndex)}
                                                                        variant="outlined"
                                                                        size="small"
                                                                    />
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" color="primary" onClick={handleAddRow}>
                Add Row
            </Button>
        </>
    );
};

export default Usertable;