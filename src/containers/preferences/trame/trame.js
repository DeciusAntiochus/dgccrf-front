import React, { Component } from 'react';
import { List, Icon, Dropdown } from 'semantic-ui-react';

import { Draggable } from 'react-beautiful-dnd';

export default class TrameComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      taskEdited: null,
      taskName: null
    };
    this.handleChangeName = this.handleChangeName.bind(this);
  }

  handleChangeName(event) {
    this.setState({ taskName: event.target.value.toUpperCase() });
  }

  validateName(task, name) {
    this.props.validateName(task, name);
    this.setState({ taskEdited: null, taskName: null });
  }

  editName(task) {
    this.setState({
      taskEdited: task,
      taskName: task.title.toUpperCase()
    });
  }

  render() {
    console.log(this.props.taskList);
    return (
      <List className="responsivepadding" relaxed style={{ textAlign: 'left' }}>
        {this.props.taskList.map((task, i) => (
          <Draggable key={i} draggableId={task.id.toString()} index={i}>
            {provided => (
              <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
              >
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  key={i}
                  style={{
                    borderRadius: 3,
                    borderBottom: '3px solid #c0c1c4',

                    margin: 15,
                    boxShadow: '6px 1px 12px 2px #cfcfcf'
                  }}
                >
                  <List.Item
                    style={{
                      borderTopLeftRadius: 3,
                      borderTopRightRadius: 3,
                      padding: 15,
                      backgroundColor: '#4286f4'
                    }}
                    key={task.title}
                    // onClick={() => task.documentToFill && this.handleClick(i)}
                  >
                    <div
                      style={{
                        display: 'flex',
                        width: '100%'
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        {/* {this.getIconFromStatus(task.status)} */}
                      </div>
                      <div style={{ flex: 8, color: 'white' }}>
                        <input
                          disabled={task != this.state.taskEdited}
                          type="text"
                          style={{
                            background: 'transparent',
                            border: '0',
                            outline: 'none',
                            color: 'white'
                          }}
                          value={
                            task != this.state.taskEdited
                              ? task.title.toUpperCase()
                              : this.state.taskName
                          }
                          onChange={this.handleChangeName}
                        ></input>
                        {task != this.state.taskEdited ? (
                          <Icon
                            style={{ marginLeft: 10, cursor: 'pointer' }}
                            onClick={() => this.editName(task)}
                            name="pencil"
                            color="white"
                          ></Icon>
                        ) : (
                          <Icon
                            style={{ marginLeft: 10, cursor: 'pointer' }}
                            onClick={() =>
                              this.validateName(task, this.state.taskName)
                            }
                            name="check"
                            color="white"
                          ></Icon>
                        )}
                      </div>
                      <div
                        style={{
                          flex: 1,
                          textAlign: 'right'
                        }}
                      >
                        <Dropdown style={{ color: 'white' }} pointing={'right'}>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() =>
                                this.props.changeType(task, 'basic')
                              }
                              icon={task.type === 'basic' && 'check'}
                              text="Basique"
                            ></Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                this.props.changeType(task, 'text')
                              }
                              icon={task.type === 'text' && 'check'}
                              text="Texte"
                            ></Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                this.props.changeType(task, 'document')
                              }
                              icon={task.type === 'document' && 'check'}
                              text="Document"
                            ></Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        {/* {task.documentToFill &&
                                          (this.state.activeDropdowns.includes(i) ? (
                                              <List.Icon
                                                  name="caret up"
                                                  style={{ color: 'white' }}
                                              ></List.Icon>
                                          ) : (
                                                  <List.Icon
                                                      name="caret down"
                                                      style={{ color: 'white' }}
                                                  ></List.Icon>
                                              ))} */}
                      </div>
                    </div>
                  </List.Item>
                  <List.Item>{/* dropdown */}</List.Item>
                </div>
              </div>
            )}
          </Draggable>
        ))}
      </List>
    );
  }
}
