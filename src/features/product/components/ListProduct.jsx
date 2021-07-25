import { Grid, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import Product from './Product';


const useStyles = makeStyles((theme) => ({
    root: {
    },

}))

ListProduct.propTypes = {
    products: PropTypes.array,
    categorys: PropTypes.array,
    services: PropTypes.array,
    sizes: PropTypes.array,
};

ListProduct.defaultProps = {
    products: [],
    categorys: [],
    services: [],
    sizes: [],
};

function ListProduct(props) {
    const classes = useStyles()
    const { products, categorys, services, sizes } = props 
    return (
        <div>
            <Grid container className={classes.root}>
                {products && products.map((product) => {
                    const indexCategory = categorys.findIndex(item => item.id === product?.category)
                    const indexService = services.findIndex(item => item.id === product?.service)
                    return (
                        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                            <Product product={product} sizes={sizes}
                                category={indexCategory !== -1 ? categorys[indexCategory] : {}}
                                service={indexService !== -1 ? services[indexService] : {}}
                            />
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    );
}

export default ListProduct;