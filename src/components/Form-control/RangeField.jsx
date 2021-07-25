import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { formatPrice } from '../../utils';


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
    },
    slider: {
        margin: "10px 0",
        color: "#334862",
        width: "80%",
    },
    label: {
        fontSize: "20px",
        fontWeight: "500",
        color: "#334862",
    },
    text: {
        fontWeight: "500",
        color: "#334862",
    }
}));

RangeField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    options: PropTypes.array,
    onChange: PropTypes.func,
    max: PropTypes.number,
    min: PropTypes.number,
    step: PropTypes.number,
    defaultValue: PropTypes.number,
    filters: PropTypes.object,
};

RangeField.defaultValue = {
    form: {},
    name:"",
    label:"",
    disabled: false,
    options: [],
    max: 0,
    min: 0,
    step: 0,
    defaultValue: 0,
    filters: {},
};



function RangeField(props) {
    const classes = useStyles();
    const { form, name, disabled, onChange, max, min, step, defaultValue, filters } = props
    const [value, setValue] = React.useState([min, defaultValue]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if(onChange) {
            onChange(newValue)
        }
    };

    useEffect(() => {
        if(!Object.keys(filters).includes('price__gte')){
            setValue([0, 1000000])
        }
    }, [filters])

    const getText = (value) => {
        return `${formatPrice(value)}`
    }

    return (
        <div className={classes.root}>
            <Controller
                control={form.control}
                name={name}
                render={({ field }) => (
                    <>
                        <Slider
                            className={classes.slider}
                            {...field}
                            value={value}
                            onChange={handleChange}
                            min={min}
                            max={max}
                            disabled={disabled}
                            // valueLabelDisplay="auto"
                            // aria-labelledby="discrete-slider-small-steps"
                            getAriaValueText={getText}
                            step={step}
                            marks
                        />
                    </>
                )}
            />
        </div>
    );
}

export default RangeField;