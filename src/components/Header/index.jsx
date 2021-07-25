import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
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
                {/* <Button> */}
                <NavLink to="/carts" className={classes.cart}>
                    <ShoppingCartIcon fontSize="small" />
                </NavLink>
                {/* </Button> */}
            </Toolbar>
        </div>
    );
}