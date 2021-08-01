import React from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles, TableBody, TableCell, TableRow } from '@material-ui/core';
import { cartItemsTotalSelector } from '../Selectors';
import { useSelector } from 'react-redux';
import { formatPrice } from '../../../utils';

const useStyles = makeStyles((theme) => ({
    table: {
    },
    row: {

    },
    column: {
    },
    head: {
        minWidth: "120px",
        with: "100%",
        fontSize: "16px",
        fontWeight: "600",
        color: "rgba(0, 0, 0, 0.64)",
    },
    total: {
        fontWeight: "600",
        fontSize: "18px",
        color: "rgba(0, 0, 0, 0.64)",
    },
    btn: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
    }
}))

CheckoutCart.propTypes = {
    products: PropTypes.array,
};

CheckoutCart.defaultProps = {
    products: [],
};


function CheckoutCart(props) {

    const classes = useStyles();
    // const { products } = props
    const total = useSelector(cartItemsTotalSelector)

    return (
        <div>
            <TableBody className={classes.table}>
                <TableRow className={classes.row}>
                    <TableCell align="left" className={classes.head}>Cộng giỏ hàng</TableCell>
                    <TableCell align="right" className={classes.head}></TableCell>
                </TableRow>
                <TableRow className={classes.row}>
                    <TableCell align="left">Tạm tính</TableCell>
                    <TableCell align="right">{formatPrice(total)}</TableCell>
                </TableRow>
                <TableRow className={classes.row}>
                    <TableCell align="left">Shipper</TableCell>
                    <TableCell align="right">{formatPrice(35000)}</TableCell>
                </TableRow>
                <TableRow className={classes.row}>
                    <TableCell align="left">Giao hàng</TableCell>
                    <TableCell align="right">Tùy chọn giao hàng sẽ được cập nhật trong quá trình thanh toán.</TableCell>
                </TableRow>
                <TableRow className={classes.row}>
                    <TableCell align="left" className={classes.total}>Tổng</TableCell>
                    <TableCell align="right" className={classes.total}>{formatPrice(total + 35000)}</TableCell>
                </TableRow>
            </TableBody>
            <Button fullWidth>
                Thanh Toán
            </Button>
        </div>
    );
}

export default CheckoutCart;