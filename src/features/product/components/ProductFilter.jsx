import { Box, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import RangeField from '../../../components/Form-control/RangeField';
import SelectField from '../../../components/Form-control/SelectField';
import { formatPrice } from '../../../utils';
import FilterByCategory from './filters/FilterByCategory';


ProductFilter.propTypes = {
    categorys: PropTypes.array,
    filters: PropTypes.object,
    onChange: PropTypes.func,
    services: PropTypes.array,
    sizes: PropTypes.array,
};

ProductFilter.defaultProps = {
    categorys: [],
    filters: {},
    services: [],
    sizes: [],
};

const useStyles = makeStyles((theme) => ({
    root: {

    },
    price: {
        textAlign: "left",
    },
    size: {
        marginTop: theme.spacing(2),
        width: "85%",
        marginLeft: theme.spacing(2),
    },
    label: {
        fontSize: "18px",
        fontWeight: "500",
        marginLeft: theme.spacing(3),
        color: "rgba(0, 0, 0, 0.54)",
    },
    text : {
        fontSize: "16px",
        marginLeft: theme.spacing(3),
        color: "rgba(0, 0, 0, 0.54)",
    }
}))

function ProductFilter(props) {
    const classes = useStyles()
    const { categorys, filters, onChange, sizes } = props;

    const form = useForm({
        defaultValues: {
            price: [],
            service: "",
        },
    })

    const handleFilterCategory = (categoryId) => {
        const newFilters = {
            ...filters,
            category: categoryId,
            page: 1,
        }
        onChange(newFilters)
    }

    const handleFilterByPrice = (values) => {
        const newFilters = {
            ...filters,
            price__gte: values[0],
            price__lte: values[1],
        }
        onChange(newFilters)
    }

    const handleFilterBySize = (value) => {
        if(value !== ""){
            const newFilters = {
                ...filters,
                size: value,
                page: 1,
            }
            onChange(newFilters)
        }else{
            const newFilters = {
                ...filters,
                page: 1,
            }
            delete newFilters.size
            onChange(newFilters)
        }
    }

    const options = sizes ? sizes.map(item => ({ value: item.id, name: item.name })): []

    return (
        <div>
            <Box className={classes.root}>
                <Box>
                    <FilterByCategory categorys={categorys} onChange={handleFilterCategory} />
                </Box>
                <Box className={classes.price}>
                    <Typography className={classes.label}>Lọc Theo Giá</Typography>
                    <RangeField
                        form={form}
                        label={"Lọc theo giá"}
                        name={"price"}
                        min={0}
                        max={1000000}
                        step={100000}
                        defaultValue={1000000}
                        onChange={handleFilterByPrice}
                        filters={filters}
                    />
                    <Typography className={classes.text}>
                        {`Giá: ${filters.price__gte ? formatPrice(filters.price__gte) : formatPrice(0)} - ${filters.price__lte ? formatPrice(filters.price__lte) : formatPrice(1000000)}`}
                    </Typography>
                </Box>
                <Box className={classes.size}>
                    <SelectField
                        form={form}
                        label={"Size"}
                        name={"sizes"}
                        filters={filters}
                        onChange={handleFilterBySize}
                        options={options}
                    />
                </Box>
            </Box>
        </div>
    );
}

export default ProductFilter;