import { Avatar, BottomNavigation, BottomNavigationAction, Box, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { formatPrice } from '../../../utils';
import useCategorys from './Hooks/useCategorys';
import useServices from './Hooks/useServices';
import useSizes from './Hooks/useSizes';
import QuantityCartForm from './QuantityCartForm';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../cart/CartSlice';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3, 0),
    },
    header: {
        "& .small-line": {
            margin: theme.spacing(2, 0),
            width: "40px",
            height: "2px",
            backgroundColor: theme.palette.grey[400],
        }
    },
    price: {
        marginTop: theme.spacing(1),
        fontSize: theme.typography.h4.fontSize,
        fontWeight: "400",
    },
    white: {
        color: "black",
        backgroundColor: "#fff",    
    },
    boxSize: {
        display: "flex",
        alignItems: "center",
        marginTop: theme.spacing(3),
    },
    boxItem: {
        cursor: "pointer",
    },
    size: {
        fontSize: "19px",
        marginRight: theme.spacing(2),
    },
    BoxInfor: {
        display: "flex",
        flexDirection: "column",
    },
    label: {
        fontSize: "16px",
        fontWeight: "400",
        marginBottom: theme.spacing(1),
    },
    bottomNavigation: {
        "& span":{
            margin: 0,
        },
        "& button":{
            minWidth: "56px",
            // backgroundColor: "#000",
            width: "fit-content",
            padding: 0,
            margin: "0 5px",
            borderRadius: "100%",
            border: "1px solid #888",
        },
        "& > .Mui-selected": {
            padding: 0,
            border: "2px solid #888",
        },
    }
}))


ProductInfo.propTypes = {
    product: PropTypes.object,
};
ProductInfo.defaultProps = {
    product: {},
}

function ProductInfo(props) {
    const { product, loading } = props;
    const { sizes } = useSizes()
    const { services } = useServices()
    const { categorys } = useCategorys()
    const [size, setSize] = useState("")
    const classes = useStyles();
    const dispatch = useDispatch();

    const form = useForm({
        defaultValues: {
            size: "",
        }
    })

    const getSize = (id) => {
        const size = sizes.filter(item => item.id === id)[0]?.name
        return size;
    }

    const getService = (id) => {
        const service = services.filter(item => item.id === id)[0]?.name
        return service;
    }

    const getcategory = (id) => {
        const category = categorys.filter(item => item.id === id)[0]?.name
        return category;
    }

    const handleAddToCartSubmit = (formValues) => {
        const {quantity} = formValues
        const action = addToCart({
            id: product.id,
            product: product,
            quantity: quantity, 
        });
        console.log(action)
        dispatch(action)
    }


    return (
        <Box className={classes.root}>
            <Box className={classes.header}>
                <Typography component="h5" variant="h4" >{product.title}</Typography>
                <div className="small-line"></div>
            </Box>
            <Box className={classes.BoxInfor}>
                <Box component="span" className={classes.label}>
                    {getService(product.service)} / {getcategory(product.category)}
                </Box>
                <Box component="span" className={classes.price}>
                    {formatPrice(product.price)}
                </Box>
            </Box>
            <Box className={classes.boxSize}>
                <Box component="span" className={classes.size}>
                    Size
                </Box>
                <BottomNavigation className={classes.bottomNavigation}
                    value={size}
                    onChange={(event, newValue) => {
                        setSize(newValue);
                    }}
                    showLabels
                >
                    {!loading && product.size.map((item) => (
                        <BottomNavigationAction key={item} value={item} label={
                            <Box component="span" className={classes.boxItem}>
                                <Avatar className={classes.white}>{getSize(item)}</Avatar>
                            </Box>
                        } />
                    ))}
                </BottomNavigation>
            </Box>
            <Box>
                <QuantityCartForm onSubmit={handleAddToCartSubmit}/>
            </Box>
        </Box>
    );
}

export default ProductInfo;