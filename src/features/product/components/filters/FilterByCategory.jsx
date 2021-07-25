import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        color: "#334862",
        marginBottom: theme.spacing(2),
    },
    header: {
        // textAlign: "center",
        fontSize: "22px",
        fontWeight: "500",
        color: "rgba(0, 0, 0, 0.54)",
        marginLeft: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
    menu: {
        padding: 0,
        margin: 0,
        listStyle: "none",
        transition: "all .3s",
        '& > li': {
            marginTop: theme.spacing(1),
            color: "#334862",
            '&:hover': {
                color: theme.palette.primary.main,
                cursor: 'pointer',
            },
        },
    },
    button: {
        display: "flex",
        justifyContent: "start",
    },
    name: {
        color: "rgba(0, 0, 0, 0.54)",
    }
}))

FilterByCategory.propTypes = {
    onChange: PropTypes.func,
    categorys: PropTypes.array,
};

FilterByCategory.defaultProps = {
    categorys: [],
}

function FilterByCategory(props) {

    const { categorys, onChange } = props
    const classes = useStyles()

    const handleCatogoryClick = (category) => {
        if (onChange) {
            onChange(category.id)
        }
    }

    return (
        <div>
            <Box className={classes.root}>
                <Typography variant="body2" className={classes.header}>Danh mục sản phẩm</Typography>
                <ul className={classes.menu}>
                    <li onClick={() => handleCatogoryClick({})}>
                        <Button className={classes.button}  fullWidth>
                            <Typography variant="body2" className={classes.name}>Tất cả sản phẩm</Typography>
                        </Button>
                    </li>
                    {categorys.map((category) => (
                        <li key={category.id} onClick={() => handleCatogoryClick(category)}>
                            <Button className={classes.button} fullWidth>
                                <Typography variant="body2" className={classes.name}> {category.name}</Typography>
                            </Button>
                        </li>
                    ))}
                </ul>
            </Box>
        </div>
    );
}

export default FilterByCategory
