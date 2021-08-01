import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ListPage from './page/ListPage';


CartFeature.propTypes = {
    
};

function CartFeature(props) {
    return (
        <div>
            <Switch>
                <Route path="/carts" component={ListPage}/>
            </Switch>
        </div>
    );
}

export default CartFeature;