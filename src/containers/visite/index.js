import React from 'react';
import TrameComponent from './trame';
import { Grid } from 'semantic-ui-react';

export default class Visite extends React.Component {
    render() {
        return (
            <Grid
                style={{ display: "flex" }}
                centered
                stretched
                verticalAlign="middle" >
                <TrameComponent />
            </Grid>
        )
    }
}