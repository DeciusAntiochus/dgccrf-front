import React from 'react';
import TrameComponent from './trame.container';
import SwipeTabs from '../../../components/swipeTabs.component';

export default class Trame extends React.Component {
    render() {
        return (

            <SwipeTabs
                tabs={[
                    {
                        menuItem: 'Avant',
                        component: <TrameComponent />
                    },
                    {
                        menuItem: 'Pendant',
                        component: <TrameComponent />
                    },
                    {
                        menuItem: 'Après',
                        component: <TrameComponent />
                    }
                ]} />
        )
    }
}