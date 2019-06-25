import React from 'react';
import { Grid } from 'semantic-ui-react';
import MenuButtonComponent from '../../components/menuButton.component';
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

class MenuComponent extends React.Component {
  componentDidMount() {
    this.props.changeNameOfPage('Menu');
  }
  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: '100vh' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <MenuButtonComponent
            link="/mes-dossiers"
            name="Mes Dossiers"
            color="teal"
            icon="file"
          />
          <MenuButtonComponent
            link="/entreprises"
            name="Entreprises"
            color="blue"
            icon="building outline"
          />
          <MenuButtonComponent
            link="/preferences"
            name="Préférences"
            color="violet"
            icon="setting"
          />
        </Grid.Column>
      </Grid>
    );
  }
}

MenuComponent.propTypes = {
  changeNameOfPage: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuComponent);
