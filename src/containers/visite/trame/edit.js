import React from 'react';
import { Container, Button, Icon, Input, Responsive } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';

import TrameComponent from '../../preferences/trame/trame';

import PouchDBServices from '../../../services/index';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

class EditComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: this.props.trame.trame,
      index: this.props.trame.trame.length,
      id: this.props.trame.trame.length,
      isLoading: true,
      _id: this.props.trame._id,
      _rev: this.props.visite._rev
    };
    this.validateName = this.validateName.bind(this);
    this.changeType = this.changeType.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.addDocument = this.addDocument.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
  }

  async saveTrame() {
    if (window.confirm('Voulez-vous sauvegarder cette trame?')) {
      try {
        const answer = await PouchDBServices.services.visite.updateTrame(
          this.props.visite,
          this.state._rev,
          {
            ...this.props.trame,
            trame: this.state.taskList
          }
        );

        this.props.closeEdit();
      } catch (e) {
        console.log(e);
      }
    }
  }

  deleteTask(task) {
    this.setState({
      taskList: this.state.taskList.filter(t => {
        return t != task;
      })
    });
  }

  addDocument(task, file) {
    this.setState({
      taskList: this.state.taskList.filter(t => {
        if (t == task) {
          t.innerContent = file;
        }
        return t;
      })
    });
  }

  deleteDocument(task) {
    this.setState({
      taskList: this.state.taskList.filter(t => {
        if (t == task) {
          t.innerContent = '';
        }
        return t;
      })
    });
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

  handleNameChange(e, data) {
    this.setState({ trameName: data.value });
  }

  handleTextChange(task, text) {
    let taskList = this.state.taskList;
    taskList = taskList.filter(t => {
      if (t == task) {
        t.innerContent = text;
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
          title: 'Nouvelle tâche' + this.state.index,
          type: 'basic',
          innerContent: '',
          index: this.state.index,
          id: this.state.id
        }
      ],
      index: this.state.index + 1,
      id: this.state.id + 1
    });
  }

  onDragEnd = result => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const res = Array.from(this.state.taskList);

    const [removed] = res.splice(result.source.index, 1);
    res.splice(result.destination.index, 0, removed);

    this.setState({ taskList: res });
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
                  flexDirection: 'row',
                  justifyContent: 'space-between',

                  padding: 20
                }}
              >
                <div>
                  <Button
                    style={{ marginLeft: 5 }}
                    color="teal"
                    icon
                    onClick={() => this.addTask()}
                  >
                    <Icon name="plus" color="white"></Icon>
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={() => this.saveTrame()}
                    color="red"
                    disabled={this.state.taskList.length === 0}
                    icon
                  >
                    <Icon name="save" color="white"></Icon>
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
                          handleTextChange={this.handleTextChange}
                          deleteTask={this.deleteTask}
                          addDocument={this.addDocument}
                          deleteDocument={this.deleteDocument}
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

EditComponent.propTypes = {
  trame: PropTypes.object
};

export default EditComponent;
