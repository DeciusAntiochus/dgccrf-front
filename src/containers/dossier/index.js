import React from 'react';
import SwipeTabs from '../../components/swipeTabs.component';
import InfosComponent from './infos.container';
import VisitesComponent from './visites.container';
import { PropTypes } from 'prop-types';
import { changeNameOfPage, changeBackUrl } from '../navbar/actions';
import { connect } from 'react-redux';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    changeNameOfPage: newName => dispatch(changeNameOfPage(newName)),
    changeBackUrl: newBackUrl => dispatch(changeBackUrl(newBackUrl))
  };
}

class MonDossier extends React.Component {
  componentDidMount() {
    this.props.changeNameOfPage('Dossier *Nom du dossier*');
    this.props.changeBackUrl('/mes-dossierss');
  }
  render() {
    return (
      <SwipeTabs
        tabs={[
          {
            menuItem: 'Infos',
            component: <InfosComponent {...this.props} />
          },
          {
            menuItem: 'Visites',
            component: <VisitesComponent {...this.props} />
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
  changeNameOfPage: PropTypes.func.isRequired,
  changeBackUrl: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MonDossier);
