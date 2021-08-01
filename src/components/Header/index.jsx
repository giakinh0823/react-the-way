import { Badge, Box, Button, IconButton, Popover } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { cartItemsCountSelector, showMiniCartSelector } from '../../features/cart/Selectors';
import ListCartMini from '../../features/cart/components/ListCartMini';
import { hideMiniCart } from '../../features/cart/CartSlice';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    Link: {
        textDecoration: "none",
        color: "black",
    },
    cart: {
        margin: theme.spacing(0, 2),
        color: "black",
        textDecoration: "none",
    }
}));

export default function Header() {
    const classes = useStyles();
    const quantityCart = useSelector(cartItemsCountSelector)
    const showMiniCart = useSelector(showMiniCartSelector)
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        const hideminiCartAction = hideMiniCart()
        dispatch(hideminiCartAction)
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        const button = document.getElementById('showMiniCart')
        if(showMiniCart){
            button.click();
        }
    },[showMiniCart])

    return (
        <div className={classes.root}>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    <NavLink to="/" className={classes.Link}>
                        Home
                    </NavLink>
                </Typography>
                <Button>
                    <NavLink to="/products" className={classes.Link}>
                        Products
                    </NavLink>
                </Button>
                <Box>
                    <IconButton aria-label="cart" aria-describedby={id} variant="contained" id={"showMiniCart"} onClick={handleClick}>
                        <Badge badgeContent={quantityCart} color="secondary">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <ListCartMini/>
                    </Popover>
                </Box>
            </Toolbar>
        </div>
    );
}