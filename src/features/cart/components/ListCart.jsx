import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import React from 'react';
import { formatPrice } from '../../../utils';
import Cart from './Cart';


const useStyles = makeStyles({
    table: {

    },
    head: {
        fontSize: "16px",
        fontWeight: "600",
        color: "rgba(0, 0, 0, 0.64)",
    },
    info: {
        maxWidth: "470px",
    }
});

ListCart.propTypes = {
    product: PropTypes.array,
    categorys: PropTypes.array,
    services: PropTypes.array,
    sizes: PropTypes.array,
};

ListCart.defaultProps = {
    product: [],
    categorys: [],
    services: [],
    sizes: [],
}

function ListCart(props) {
    const { products, categorys, sizes, services } = props;
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <TableBody>
                <TableRow>
                    <TableCell align="center" className={classes.head}>Sản Phẩm</TableCell>
                    <TableCell align="center" className={classes.head}>Giá</TableCell>
                    <TableCell align="center" className={classes.head}>Số Lượng</TableCell>
                    <TableCell align="center" className={classes.head}>Tổng</TableCell>
                </TableRow>
                {products.map((product) => (
                    <TableRow key={product.id}>
                        <TableCell align="left" className={classes.info}>
                            <Cart product={product} categorys={categorys} services={services} sizes={sizes}/>
                        </TableCell>
                        <TableCell align="center">
                            {formatPrice(product.price)}
                        </TableCell>
                        <TableCell align="center">
                            {product.quantity}
                        </TableCell>
                        <TableCell align="center">
                            {formatPrice(product.price * product.quantity)}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </div>
    );
}

export default ListCart;