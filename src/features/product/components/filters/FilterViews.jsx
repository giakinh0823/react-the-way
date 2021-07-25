import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, makeStyles } from '@material-ui/core';
import { formatPrice } from '../../../../utils';


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexFlow: "row wrap",
        alignItems: "center",
        margin: theme.spacing(2, 0),
        listStyle: "none",
        padding: 0,
        "& > li": {
            margin: 0,
            padding: theme.spacing(1),
        }
    },

}))

FilterViews.propTypes = {
    categorys: PropTypes.array,
    filters: PropTypes.object,
    onChange: PropTypes.func,
    servers: PropTypes.array,
    sizes: PropTypes.array,
};

FilterViews.defaultProps = {
    categorys: [],
    filters: {},
    services: {},
    sizes: [],
};
const FILTER_LIST = [
    {
        id: 1,
        getLabel: (filters, categorys) => {
            const category = categorys ? categorys.filter(item => item.id.toString() === filters["category"]) : ["Danh mục"]
            return category[0]?.name || "Danh mục"
        },
        isActive: () => true,
        isVisible: (filters) => Object.keys(filters).includes('category'),
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = { ...filters }
            delete newFilters["category"]
            return newFilters;
        },
        onToggle: (filters) => true,
    },
    {
        id: 2,
        getLabel: (filters) => {
            return `Từ ${formatPrice(filters?.price__gte)} đến ${formatPrice(filters?.price__lte)}`
        },
        isActive: () => true,
        isVisible: (filters) => {
            if (Object.keys(filters).includes('price__gte') && Object.keys(filters).includes('price__lte') && (filters.price__gte !== 0 || filters.price__lte !== 1000000)) {
                return true;
            } else {
                return false;
            }
        },
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = { ...filters }
            delete newFilters.price__gte
            delete newFilters.price__lte
            return newFilters;
        },
        onToggle: (filters) => true,
    },
    {
        id: 3,
        getLabel: (filters, sizes) => {
            const size = sizes ? sizes.filter(item => item.id.toString() === filters["size"]) : [{ name: "Size" }]
            return `Size ${size[0]?.name}` || "Size"
        },
        isActive: () => true,
        isVisible: (filters) => {
            if (Object.keys(filters).includes('size') && filters.size !== "") {
                return true;
            } else {
                return false;
            }
        },
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = { ...filters }
            delete newFilters.size
            return newFilters;
        },
        onToggle: (filters) => true,
    },
]


function FilterViews(props) {
    const classes = useStyles();
    const { filters, categorys, onChange, sizes } = props;

    const visibleFilters = useMemo(() => {
        return FILTER_LIST.filter((x) => x.isVisible(filters))
    }, [filters])

    return (
        <div>
            <Box component="ul" className={classes.root}>
                {visibleFilters.map(item => (
                    <li key={item.id}>
                        <Chip
                            label={item.id === 1 ? item.getLabel(filters, categorys) : item.id === 3 ? item.getLabel(filters, sizes) : item.getLabel(filters)}
                            clickable={!item.isRemovable}
                            onClick={item.isRemovable ? null : () => {
                                if (onChange) {
                                    const newFilters = item.onToggle(filters);
                                    onChange(newFilters);
                                }
                            }}
                            onDelete={item.isRemovable ? () => {
                                if (onChange) {
                                    const newFilters = item.onRemove(filters);
                                    onChange(newFilters);
                                }
                            } : null}
                        />
                    </li>
                ))}
            </Box>
        </div>
    );
}

export default FilterViews;