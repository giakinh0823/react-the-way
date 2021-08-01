import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { formatPrice } from '../../../utils';
import useCategorys from '../../product/components/Hooks/useCategorys';
import useServices from '../../product/components/Hooks/useServices';
import useSizes from '../../product/components/Hooks/useSizes';
import { cartItemsSelector, cartItemsTotalSelector } from '../Selectors';
import CartMini from './CartMini';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "360px",
        padding: "10px 20px 0",
    },
    boxList: {
        maxHeight: "400px",
        overflowY: "auto",
        '&::-webkit-scrollbar': {
            width: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '1px solid slategrey'
        }
    },
    list: {
        listStyle: "none",
        padding: 0,
        margin: 0,
        width: "100%",
    },
    item: {
        borderRadius: "4px",
        margin: "10px 0",
        cursor: "pointer",
        "&:hover":{
            backgroundColor: "rgba(0, 0, 0, 0.03)",
        }
    },
    Link: {
        textDecoration: "none",
        color: "black",
    },
    total: {
        textAlign: "center",
        padding: "10px 0",
        borderTop: "1px solid rgba(0, 0, 0, 0.34)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.34)",
    },
    textPrice: {
        fontSize: "18px",
        fontWeight: "600",
        color: "rgba(0, 0, 0, 0.64)",

    },
    boxButton: {
        display: "flex",
        justifyContent: "center",
        padding: "10px 0",
    }
}))

ListCartMini.propTypes = {

};

function ListCartMini(props) {
    const classes = useStyles()
    const cars = useSelector(cartItemsSelector)
    const totalCartMini = useSelector(cartItemsTotalSelector)
    const { categorys } = useCategorys()
    const { services } = useServices()
    const { sizes } = useSizes()
    const products = cars.map(item => ({ ...item.product, size: item.size, quantity: item.quantity }))
    return (
        <Box className={classes.root}>
            <Box component="div" className={classes.boxList}>
                <ul className={classes.list}>
                    {products.map(product => (
                        <li key={product.id} className={classes.item}>
                            <CartMini product={product} categorys={categorys} services={services} sizes={sizes} />
                        </li>
                    ))}
                </ul>
            </Box>
            <Box className={classes.total}>
                <Typography className={classes.textPrice}>Tổng: {formatPrice(totalCartMini)}</Typography>
            </Box>
            <Box className={classes.boxButton} fullwidth>
                <Button fullwidth>
                    <NavLink to="/carts" className={classes.Link}>
                        Đi đến giỏ hàng
                    </NavLink>
                </Button>
            </Box>
        </Box>
    );
}

export default ListCartMini;