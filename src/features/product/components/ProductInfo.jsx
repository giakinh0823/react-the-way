import { Avatar, Box, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { formatPrice } from '../../../utils';
import useCategorys from './Hooks/useCategorys';
import useServices from './Hooks/useServices';
import useSizes from './Hooks/useSizes';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3, 0),
    },
    header: {
        "& .small-line": {
            margin: theme.spacing(2, 0),
            width: "40px",
            height: "2px",
            backgroundColor: theme.palette.grey[400],
        }
    },
    price: {
        fontSize: theme.typography.h4.fontSize,
        fontWeight: "400",
    },
    white: {
        color: "black",
        backgroundColor: "#fff",
        border: "1px solid #888",
        padding: "4px",
    },
    boxSize: {
        display: "flex",
        alignItems: "center",
        marginTop: theme.spacing(2),
    },
    boxItem: {
        margin: theme.spacing(0.5),
        cursor: "pointer",
    },
    size: {
        fontSize: "19px",
        marginRight: theme.spacing(2),
    },
    BoxInfor: {
        display: "flex",
        flexDirection: "column",
    },
    label: {
        fontSize: "16px",
        fontWeight: "400",
        marginBottom: theme.spacing(1),
    }

}))


ProductInfo.propTypes = {
    product: PropTypes.object,
};
ProductInfo.defaultProps = {
    product: {},
}

function ProductInfo(props) {
    const { product, loading } = props;
    const { sizes } = useSizes()
    const { services } = useServices()
    const { categorys } = useCategorys()
    const classes = useStyles();
    const getSize = (id) => {
        const size = sizes.filter(item => item.id === id)[0]?.name
        return size;
    }

    const getService = (id) => {
        const service = services.filter(item => item.id === id)[0]?.name
        return service;
    }

    const getcategory = (id) => {
        const category = categorys.filter(item => item.id === id)[0]?.name
        return category;
    }
    return (
        <Box className={classes.root}>
            <Box className={classes.header}>
                <Typography component="h5" variant="h4" >{product.title}</Typography>
                <div className="small-line"></div>
            </Box>
            <Box className={classes.BoxInfor}>
                <Box component="span" className={classes.label}>
                    {getService(product.service)} / {getcategory(product.category)}
                </Box>
                <Box component="span" className={classes.price}>
                    {formatPrice(product.price)}
                </Box>
            </Box>
            <Box className={classes.boxSize}>
                <Box component="span" className={classes.size}>
                    Size
                </Box>
                {!loading && product.size.map((item) => (
                    <Box key={item} component="span" className={classes.boxItem}>
                        <Avatar className={classes.white}>{getSize(item)}</Avatar>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default ProductInfo;