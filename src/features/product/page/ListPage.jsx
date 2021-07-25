import { Box, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import productApi from '../../../api/productApi';
import FilterViews from '../components/filters/FilterViews';
import ProductServices from '../components/filters/ProductServices';
import ProductSort from '../components/filters/ProductSort';
import useCategorys from '../components/Hooks/useCategorys';
import useServices from '../components/Hooks/useServices';
import useSizes from '../components/Hooks/useSizes';
import ListProduct from '../components/ListProduct';
import ProductFilter from '../components/ProductFilter';
import ProductSkeleton from '../components/Views/ProductSkeleton';

const useStyles = makeStyles((theme) => ({
    root: {
    },
    section: {
    },
    pagination: {
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "center",
    },
    sort: {
        maxWidth: "200px",
        margin: "0 0 0 auto",
    },
    filter: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    notFound: {
        color: "rgba(0, 0, 0, 0.54)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: theme.spacing(20),
        "& p": {
            fontSize: "28px",
            fontWeight: "200",
        }
    }
}))

ListPage.propTypes = {

};

function ListPage(props) {

    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState({});
    const {categorys} = useCategorys()
    const {services} = useServices()
    const optionsServices = services.map(item => ({ value: item.id, name: item.name }))
    const {sizes} = useSizes();
    const location = useLocation();
    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search);
        return { ...params}
    }, [location.search])
    const history = useHistory()
    const [filters, setFilters] = useState({
        ...queryParams,
    });


    useEffect(() => {
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(queryParams),
        })
    }, [history, queryParams])

    useEffect(() => {
        ; (async () => {
            try {
                const response = await productApi.getAll(queryParams);
                setPage({
                    total: response.data.count,
                    maxItem: response.maxItem,
                })
                setProducts(response.data.results)
            } catch (error) {
                console.log(error.message)
            }
            setLoading(false)
        })()
    }, [filters, queryParams])

    const handlePageChange = (e, page) => {
        setLoading(true)
        const newFilters = {
            ...queryParams,
            page: page,
        }
        setFilters(newFilters)
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(newFilters),
        })
    }

    const hanleSortProduct = (value) => {
        setLoading(true)
        const newFilters = {
            ...queryParams,
            ordering: value,
        }
        setFilters(newFilters)
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(newFilters),
        })
    }

    const handleFilter = (filters) => {
        setLoading(true)
        setFilters(filters)
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters),
        })
    }

    return (
        <Container maxWidth="lg" className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={3} >
                    <Paper elevation={0} className={classes.section}>
                        <ProductFilter categorys={categorys} filters={queryParams} services={services} onChange={handleFilter} sizes={sizes} />
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                    <Paper elevation={0} className={classes.section}>
                        <ProductServices filters={queryParams} options={optionsServices} onChange={handleFilter} />
                        <Box className={classes.filter}>
                            <FilterViews categorys={categorys} services={services} filters={queryParams} sizes={sizes} onChange={handleFilter} />
                            <ProductSort className={classes.sort} onChange={hanleSortProduct} />
                        </Box>
                        {loading ? <ProductSkeleton length={16} /> :
                            <Box>
                                {products.length !== 0 ? <Box>
                                    <ListProduct products={products} sizes={sizes} categorys={categorys} services={services} />
                                    <Box className={classes.pagination}>
                                        <Pagination
                                            count={Math.ceil(page.total / page.maxItem)}
                                            color="primary"
                                            page={Number(queryParams.page)}
                                            onChange={(e, page) => handlePageChange(e, page)}
                                        />
                                    </Box>
                                </Box> : <Box className={classes.notFound}>
                                    <Typography>Không tìm thấy sản phẩm!</Typography>
                                </Box>
                            }
                            </Box>
                        }
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ListPage;