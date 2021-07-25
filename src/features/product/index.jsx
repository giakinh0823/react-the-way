import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DetailPage from './page/DetailPage';
import ListPage from './page/ListPage';

ProductFeature.propTypes = {

};

function ProductFeature(props) {
    return (
        <div>
            <Switch>
                <Route path="/products" component={ListPage} exact/>
                <Route path="/products/:productId" component={DetailPage} />
            </Switch>
        </div>
    );
}

export default ProductFeature;