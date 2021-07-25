import { InputBase } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller } from "react-hook-form";

const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      border: "1px solid #99999942",
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
      },
    },
  }))(InputBase);


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    select: {

    },
    
}));

SelectField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    options: PropTypes.array,
    onChange: PropTypes.func,
    filters: PropTypes.object,
};

SelectField.defaultProps = {
    form: {},
    name: "",
    label: "",
    options: [],
    filters: {},
};

function SelectField(props) {
    const classes = useStyles();
    const { form, name, label, disabled, onChange, options } = props
    const [state, setState] = useState("");

    const handleChange = (event) => {
        const value = event.target.value;
        setState(value)
        if (onChange) {
            onChange(value);
        }
    };

    return (
        <div>
            <Controller
                control={form.control}
                name={name}
                render={({ field }) => (
                    <>
                        <FormControl className={classes.formControl} size="small" fullWidth>
                            <Select
                                {...field}
                                value={state}
                                disabled={disabled}
                                displayEmpty
                                variant="outlined"
                                onChange={(event) => handleChange(event)}
                                inputProps={{ 'aria-label': label }}
                                className={classes.select}
                                input={<BootstrapInput />}
                            >
                                <MenuItem value="">
                                    {label}
                                </MenuItem>
                                {options.map((option, index) => (
                                    <MenuItem key={index} value={option.value}>{option.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </>
                )}
            />
        </div>
    );
}

export default SelectField;