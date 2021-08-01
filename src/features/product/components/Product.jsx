import { Box, Button, CardContent, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { formatPrice } from '../../../utils';
import { useDispatch } from 'react-redux';
import { addToCart, showMiniCart } from '../../cart/CartSlice';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        cursor: "pointer"
    },
    item: {
        width: '100%',
    },
    title: {
        fontSize: 15,
    },
    text: {
        fontSize: "12px",
    },
    price: {
        marginTop: 5,
        fontSize: "14px",
        fontWeight: "600",
    },
    button: {
        marginTop: 10,
    }
}));


Product.propTypes = {
    product: PropTypes.object,
    category: PropTypes.object,
    service: PropTypes.object,
    sizes: PropTypes.array,
};

Product.defaultProps = {
    product: {},
    category: {},
    service: {},
    sizes: [],
};

function Product(props) {
    const { product, category, service, sizes } = props;
    const classes = useStyles();
    const history = useHistory();
    const handleClick = () => {
        history.push(`/products/${product.id}`)
    }

    const dispatch = useDispatch()

    const handleAddToCart = () => {
        const action = addToCart({
            id: product.id,
            product: product,
            quantity: 1, 
            size: "M",
        });
        const showMiniCartMini = showMiniCart(true)
        dispatch(action)
        dispatch(showMiniCartMini)
    }

    return (
        <Box className={classes.root}>
            <CardContent>
                <Box onClick={handleClick}>
                    <Box>
                        <img src={product.image} alt={product.title} width="100%" />
                    </Box>
                    <Typography className={classes.text}>
                        {service?.name}
                    </Typography>
                    <Typography variant="h6" component="h6" className={classes.title}>
                        {product.title}
                    </Typography>
                    <Typography className={classes.text}>
                        {product?.size.map((item, index) => (
                            <Box key={index} component={"span"} pr={1} fontSize={12}>
                                {sizes[sizes.findIndex((x) => x.id === item)]?.name}
                            </Box>
                        ))}
                    </Typography>
                    <Typography className={classes.text}>
                        {category?.name}
                    </Typography>
                    <Typography className={classes.price}>
                        {formatPrice(product?.price)}
                    </Typography>
                </Box>
                <Button size="small" className={classes.button} onClick={handleAddToCart}>By now</Button>
            </CardContent>
        </Box>
    );
}

export default Product;