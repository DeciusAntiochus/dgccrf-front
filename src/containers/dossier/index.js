import React from 'react';
import SwipeTabs from '../../components/swipeTabs.component';
import InfosComponent from './infos.container';
import VisitesComponent from './visites.container';

export default class MonDossier extends React.Component {
    render() {
        return (
            <SwipeTabs
                tabs={[
                    {
                        menuItem: 'Infos',
                        component: <InfosComponent />
                    },
                    {
                        menuItem: 'Visites',
                        component: <VisitesComponent />
                    },
                    {
                        menuItem: 'Documents',
                        component: ''
                    }
                ]} />
        )
    }
}