import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

const StyledTabs = withStyles({
    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > span': {
            maxWidth: 40,
            width: '100%',
            backgroundColor: '#909090',
        },
    },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);


const useStyles = makeStyles((theme) => ({
    tabs: {

    },
}))

ProductServices.propTypes = {
    options: PropTypes.array,
    filters: PropTypes.object,
    onChange: PropTypes.func,
};


ProductServices.defaultProps = {
    options: [],
    filters: {},
};


function ProductServices(props) {

    const classes = useStyles()
    const { options, filters, onChange } = props
    const [value, setValue] = React.useState("");
  

    const handleChange = (event, value) => {
        setValue(value)
        if(value !==""){
            const newFilters = {
                ...filters,
                service: value,
                page:1,
            }
            onChange(newFilters)
        }else{
            const newFilters = {...filters, page: 1}
            delete newFilters.service
            onChange(newFilters)
        }
    }

    useEffect(() => {
        if (!Object.keys(filters).includes("service")) {
             
        }
    }, [filters])

    return (
        <div>
            <StyledTabs
                value={value}
                onChange={handleChange}
                className={classes.tabs}
                id={"service"}
            >
                <Tab label={"Tất cả"} value={""} />
                {options.map((option, index) => (
                    <Tab key={index} label={option.name} value={option.value} />
                ))}
            </StyledTabs>
        </div>
    );
}

export default ProductServices;