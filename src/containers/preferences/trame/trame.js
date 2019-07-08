import React, { Component } from 'react';
import {
  List,
  Icon,
  Dropdown,
  TextArea,
  Form,
  Button
} from 'semantic-ui-react';

import { Draggable } from 'react-beautiful-dnd';

import PropTypes from 'prop-types';

class TrameComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      taskEdited: null,
      taskName: null,
      activeDropdowns: []
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.clickCount = null;
    this.singleClickTimer = '';
  }

  fileInputRef = React.createRef();

  handleTextChange(e, data, task) {
    this.props.handleTextChange(task, data.value);
  }

  handleDoubleClick = document => {
    this.editName(document);
  };
  handleClicks(document) {
    this.clickCount++;
    if (this.clickCount === 1) {
      this.singleClickTimer = setTimeout(
        function() {
          this.clickCount = 0;
        }.bind(this),
        300
      );
    } else if (this.clickCount === 2) {
      clearTimeout(this.singleClickTimer);
      this.clickCount = 0;
      this.handleDoubleClick(document);
    }
  }

  fileChange(e) {
    console.log(e.target.files[0]);
  }

  handleChangeName(event) {
    this.setState({ taskName: event.target.value.toUpperCase() });
  }

  handleClick(index) {
    const i = this.state.activeDropdowns.indexOf(index);
    i === -1
      ? this.setState({
          activeDropdowns: [...this.state.activeDropdowns, index]
        })
      : this.setState({
          activeDropdowns: this.state.activeDropdowns.filter(e => e !== index)
        });
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
    return (
      <List className="responsivepadding" relaxed style={{ textAlign: 'left' }}>
        {this.props.taskList.map((task, i) => (
          <Draggable
            key={task.id.toString()}
            draggableId={task.id.toString()}
            index={i}
          >
            {provided => (
              <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
              >
                <div
                  style={{
                    borderRadius: 3,
                    borderBottom: '3px solid #c0c1c4',

                    margin: 15,
                    boxShadow: '6px 1px 12px 2px #cfcfcf',
                    position: 'relative'
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
                    <Icon
                      name="times circle"
                      style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',

                        color: 'red',
                        cursor: 'pointer',
                        fontSize: '1em'
                      }}
                      onClick={() => this.props.deleteTask(task)}
                    ></Icon>
                    <div
                      style={{
                        display: 'flex',
                        width: '100%'
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        {/* {this.getIconFromStatus(task.status)} */}
                      </div>
                      <div
                        style={{
                          flex: 8,
                          color: 'white',
                          flexDirection: 'row',
                          display: 'flex'
                        }}
                      >
                        <div
                          onClick={() => {
                            this.handleClicks(task);
                          }}
                        >
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
                        </div>
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
                        {task.type === 'basic' ? (
                          <Icon
                            name="ellipsis horizontal"
                            style={{ cursor: 'pointer', color: 'white' }}
                            onClick={() => this.props.changeType(task, 'text')}
                          ></Icon>
                        ) : task.type === 'text' ? (
                          <Icon
                            name="text cursor"
                            style={{ cursor: 'pointer', color: 'white' }}
                            onClick={() =>
                              this.props.changeType(task, 'document')
                            }
                          ></Icon>
                        ) : (
                          <Icon
                            name="file"
                            style={{ cursor: 'pointer', color: 'white' }}
                            onClick={() => this.props.changeType(task, 'basic')}
                          ></Icon>
                        )}

                        {task.type === 'text' || task.type === 'document' ? (
                          this.state.activeDropdowns.includes(task.index) ? (
                            <List.Icon
                              onClick={() => this.handleClick(task.index)}
                              name="caret up"
                              style={{ color: 'white', cursor: 'pointer' }}
                            ></List.Icon>
                          ) : (
                            <List.Icon
                              onClick={() => this.handleClick(task.index)}
                              name="caret down"
                              style={{ color: 'white', cursor: 'pointer' }}
                            ></List.Icon>
                          )
                        ) : (
                          <List.Icon
                            color="grey"
                            name="caret down"
                            style={{ cursor: 'pointer' }}
                          ></List.Icon>
                        )}
                      </div>
                    </div>
                  </List.Item>
                  <List.Item>
                    {this.state.activeDropdowns.includes(task.index) && (
                      <div style={{ padding: 15 }}>
                        {task.type === 'text' ? (
                          <Form>
                            <TextArea
                              value={task.innerContent}
                              onChange={(e, data) =>
                                this.handleTextChange(e, data, task)
                              }
                            />
                            <div
                              style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginTop: 10
                              }}
                            ></div>
                          </Form>
                        ) : (
                          <>
                            <Button
                              style={{
                                background: '#3C4586',
                                color: 'white'
                              }}
                              content="Ajouter un fichier"
                              labelPosition="left"
                              icon="file"
                              onClick={() => this.fileInputRef.current.click()}
                            />
                            <input
                              ref={this.fileInputRef}
                              type="file"
                              hidden
                              onChange={this.fileChange}
                            />
                          </>
                        )}
                      </div>
                    )}
                  </List.Item>
                </div>
              </div>
            )}
          </Draggable>
        ))}
      </List>
    );
  }
}

TrameComponent.propTypes = {
  taskList: PropTypes.array,
  changeType: PropTypes.func,
  validateName: PropTypes.func,
  deleteTask: PropTypes.func
};

export default TrameComponent;
