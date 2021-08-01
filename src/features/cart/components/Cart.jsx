import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import ProductThumnail from '../../product/components/ProductThumnail';


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    image: {
        maxWidth: "100px",
        padding: "10px",
    },
    title: {
        fontSize: "16px",
    },
    label: {
        margin: "4px 0",
        fontSize: "14px",
    },
    price: {
        fontSize: "16px",
        fontWeight: "600",
        color: "rgba(0, 0, 0, 0.64)",
    }
}))


Cart.propTypes = {
    product: PropTypes.object,
    categorys: PropTypes.array,
    services: PropTypes.array,
    sizes: PropTypes.array,
};

Cart.defaultProps = {
    product: {},
    categorys: [],
    services: [],
    sizes: [],
}

function Cart(props) {
    const classes = useStyles()
    const { product, categorys, services } = props
    return (
        <div>
            <Box fullWidth className={classes.root}>
                <Box className={classes.image}>
                    <ProductThumnail product={product} />
                </Box>
                <Box>
                    <Typography className={classes.title}>{product.title}</Typography>
                    <Typography className={classes.label}>
                        Dịch vụ: {services[services.findIndex((x) => x.id === product.service)]?.name}
                    </Typography>
                    <Typography className={classes.label}>
                        Size: {product.size}
                    </Typography>
                    <Typography className={classes.label}>
                        Loại: {categorys[categorys.findIndex((x) => x.id === product.category)]?.name}
                    </Typography>
                </Box>
            </Box>
        </div>
    );
}

export default Cart;