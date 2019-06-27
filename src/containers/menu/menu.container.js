import React from 'react';
import { Grid } from 'semantic-ui-react';
import MenuButtonComponent from '../../components/menuButton.component';
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

class MenuComponent extends React.Component {
  componentDidMount() {
    this.props.changeNameOfPage('Menu');
    this.props.changeBackUrl('Menu');
  }
  render() {
    return (
      <div style={{ height: '100%' }}>
        <Grid style={{ height: '100%' }} verticalAlign="middle" columns="equal">
          <Grid.Row>
            <Grid.Column></Grid.Column>
            <Grid.Column computer={6} tablet={8} mobile={16}>
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
            <Grid.Column></Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

MenuComponent.propTypes = {
  changeNameOfPage: PropTypes.func.isRequired,
  changeBackUrl: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuComponent);
