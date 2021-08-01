import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import useCategorys from '../../product/components/Hooks/useCategorys';
import useServices from '../../product/components/Hooks/useServices';
import useSizes from '../../product/components/Hooks/useSizes';
import CheckoutCart from '../components/CheckoutCart';
import ListCart from '../components/ListCart';
import { cartItemsSelector } from '../Selectors';

const useStyles = makeStyles((theme) => ({
    header: {
        textAlign: "center",
        fontWeight: "100",
        color: "rgba(0, 0, 0, 0.64)",
        marginTop: "10px",
        marginBottom: "40px",
    }
}))

ListPage.propTypes = {

};

function ListPage(props) {
    const classes = useStyles()
    const cars = useSelector(cartItemsSelector)
    const { categorys } = useCategorys()
    const { services } = useServices()
    const { sizes } = useSizes()
    const products = cars.map(item => ({...item.product, quantity: item.quantity, size: item.size}))
    return (
        <div>
            <Container maxWidth={"lg"}>
                <Typography variant="h3" className={classes.header}>Giỏ hàng</Typography>
                <Grid container>
                    <Grid item md={8}>
                        <ListCart products={products} categorys={categorys} services={services} sizes={sizes}/>
                    </Grid>
                    <Grid item md={4}>
                        <CheckoutCart products={products}/>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default ListPage;