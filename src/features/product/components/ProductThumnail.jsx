import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

ProductThumnail.propTypes = {
    product: PropTypes.object,
};

ProductThumnail.defaultProps = {
    product: {},
}


function ProductThumnail(props) {
    const { product } = props
    const thumbnailUrl = product.image;
    return (
        <Box>
            <img src={thumbnailUrl} alt={product.name} width={"100%"}/>
        </Box>
    );
}

export default ProductThumnail;