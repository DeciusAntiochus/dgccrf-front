import React from 'react';
import SwipeTabs from '../../components/swipeTabs.component';
import InfosComponent from './infos.container';
import VisitesComponent from './visites.container';
import { PropTypes } from 'prop-types';
import { changeNameOfPage } from '../navbar/actions';
import { connect } from 'react-redux';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    changeNameOfPage: newName => dispatch(changeNameOfPage(newName))
  };
}

class MonDossier extends React.Component {
  componentDidMount() {
    this.props.changeNameOfPage('Dossier *Nom du dossier*');
  }
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
        ]}
      />
    );
  }
}

MonDossier.propTypes = {
  changeNameOfPage: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MonDossier);
