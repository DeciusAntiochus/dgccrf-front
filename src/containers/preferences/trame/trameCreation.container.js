import React from 'react';
import {
  Container,
  Button,
  Input,
  Icon,
  List,
  Segment
} from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import {
  changeNameOfPage,
  changeBackUrl,
  changeActivePage
} from '../../navbar/actions';
import { connect } from 'react-redux';
import { Tabs, Tab } from '@material-ui/core';
import TrameComponent from './trame';

import styled from 'styled-components';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const MyContainer = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
`;

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
      taskList: [],
      index: 0,
      id: 0
    };
    this.validateName = this.validateName.bind(this);
    this.changeType = this.changeType.bind(this);
  }
  componentDidMount() {
    this.props.changeNameOfPage();
    this.props.changeBackUrl();
    this.props.changeActivePage();
  }

  validateName(task, name) {
    let taskList = this.state.taskList;
    taskList = taskList.filter(t => {
      if (t == task) {
        t.title = name;
      }

      return t;
    });

    this.setState({ taskList });
  }

  changeType(task, type) {
    let taskList = this.state.taskList;
    taskList = taskList.filter(t => {
      if (t == task) {
        t.type = type;
      }

      return t;
    });

    this.setState({ taskList });
  }

  addTask() {
    //de 3 types: basic, text, ou document.
    this.setState({
      taskList: [
        ...this.state.taskList,
        {
          title: 'Nouvelle tâche',
          type: 'basic',
          innerContent: null,
          index: this.state.index,
          id: this.state.id
        }
      ],
      index: this.state.index + 1,
      id: this.state.id + 1
    });
  }

  onDragEnd = result => {
    console.log(result);
    let taskList = this.state.taskList;
    taskList = taskList.filter(task => {
      if (task.index === result.source.index) {
        task.index = result.destination.index;
      } else if (task.index === result.destination.index) {
        task.index = result.source.index;
      }
      return task;
    });
    this.setState({ taskList });
  };

  render() {
    return (
      <div
        className="hidescrollbar"
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',

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
                overflow: 'hidden',
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
                  justifyContent: 'center',
                  padding: 20
                }}
              >
                <div>
                  <Button color="teal" icon onClick={() => this.addTask()}>
                    <Icon name="plus" color="white"></Icon>
                  </Button>
                </div>

                {/* <Tabs
                  value={this.state.activeIndex}
                  fullWidth
                  onChange={this.handleChange}
                >
                  <Tab label="Avant" />
                  <Tab label="Pendant" />
                  <Tab label="Après" />
                </Tabs> */}
              </div>
              <div
                style={{
                  flex: 10,
                  overflowY: 'auto',
                  marginTop: 80,

                  width: '100%'
                }}
                className="hidescrollbar"
              >
                <DragDropContext onDragEnd={this.onDragEnd}>
                  <Droppable droppableId="droppable">
                    {provided => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        <TrameComponent
                          validateName={this.validateName}
                          taskList={this.state.taskList}
                          changeType={this.changeType}
                        />
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
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
