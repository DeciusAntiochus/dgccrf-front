import React from 'react';
import { Container } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import {
  changeNameOfPage,
  changeBackUrl,
  changeActivePage
} from '../navbar/actions';
import { connect } from 'react-redux';
import { Tabs, Tab } from '@material-ui/core';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    changeNameOfPage: () => dispatch(changeNameOfPage('Création de trame')),
    changeBackUrl: () => dispatch(changeBackUrl('/nouvelle-visite')),
    changeActivePage: () =>
      dispatch(changeActivePage('mesDossiers', '/creation-trame'))
  };
}

class TrameCreationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: []
    };
  }
  componentDidMount() {
    this.props.changeNameOfPage();
    this.props.changeBackUrl();
    this.props.changeActivePage();
  }

  render() {
    return (
      <div
        className="hidescrollbar"
        style={{
          display: 'flex',
          height: '100%',

          backgroundColor: '#f2f2f2',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            width: '100%',
            justifyContent: 'center',
            textAlign: 'center'
          }}
        >
          <Container style={{ height: '100%' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflow: 'auto',
                height: '100%'
              }}
            >
              <div
                style={{
                  position: 'fixed',
                  zIndex: 10,
                  width: '100%',
                  backgroundColor: '#f2f2f2',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Tabs
                  value={this.state.activeIndex}
                  fullWidth
                  onChange={this.handleChange}
                >
                  <Tab label="Avant" />
                  <Tab label="Pendant" />
                  <Tab label="Après" />
                </Tabs>
              </div>
              <div
                style={{
                  flex: 10,
                  overflowY: 'auto',
                  marginTop: 80,
                  paddingBottom: 105
                }}
                className="hidescrollbar"
              ></div>
            </div>
          </Container>
        </div>
      </div>
    );
  }
}

TrameCreationComponent.propTypes = {
  changeNameOfPage: PropTypes.func.isRequired,
  changeBackUrl: PropTypes.func.isRequired,
  changeActivePage: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrameCreationComponent);
