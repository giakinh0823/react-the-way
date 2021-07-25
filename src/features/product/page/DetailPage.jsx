import { Container, Grid } from '@material-ui/core';
import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import useProductDetail from '../components/Hooks/useProductDetail';
import ProductInfo from '../components/ProductInfo';
import ProductThumnail from '../components/ProductThumnail';



function DetailPage(props) {
    const match = useRouteMatch();
    const {product, loading} = useProductDetail(match.params.productId)
    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item md={5}>
                    <ProductThumnail product={product}/>
                </Grid>
                <Grid item md={7}>
                    <ProductInfo product={product} loading={loading}/>
                </Grid>
            </Grid>

        </Container>
    );
}

export default DetailPage;