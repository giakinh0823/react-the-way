import { Box, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { formatPrice } from '../../../utils';
import ProductThumnail from '../../product/components/ProductThumnail';


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    image: {
        maxWidth: "60px",
        padding: "10px",
    },
    title: {
        fontSize: "14px",
    },
    label: {
        fontSize: "12px",
    },
    price: {
        fontSize: "14px",
        fontWeight: "500",
    }
}))

CartMini.propTypes = {
    product: PropTypes.object,
    categorys: PropTypes.array,
    services: PropTypes.array,
    sizes: PropTypes.array,
};

CartMini.defaultProps = {
    product: {},
    categorys: [],
    services: [],
    sizes: [],
}

function CartMini(props) {
    const classes = useStyles()
    const { product, categorys } = props
    return (
        <Box fullWidth className={classes.root}>
            <Box className={classes.image}>
                <ProductThumnail product={product} />
            </Box>
            <Box>
                <Typography className={classes.title}>{product.title}</Typography>
                <Typography className={classes.label}>
                    {categorys[categorys.findIndex((x) => x.id === product.category)]?.name}
                </Typography>
                <Typography className={classes.price}>
                    Giá: {formatPrice(product.price)}
                </Typography>
                <Typography className={classes.price}>
                    số lượng: {product.quantity} size: {product.size}
                </Typography>
            </Box>
        </Box>
    );
}

export default CartMini;