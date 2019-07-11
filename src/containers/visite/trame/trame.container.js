import React from 'react';
import { List, Icon, Button } from 'semantic-ui-react';
import { display } from '@material-ui/system';

import './visite.css';

export default class DossierComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      activeDropdowns: []
    };
  }

  getColor(type) {
    if (type.includes('image')) {
      return ['teal', 'file image'];
    } else if (type.includes('pdf')) {
      return ['red', 'file pdf'];
    } else if (type.includes('sheet')) {
      return ['green', 'file excel'];
    } else if (type.includes('word') || type.includes('opendocument.text')) {
      return ['blue', 'file word'];
    } else {
      return ['grey', 'file'];
    }
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

  setStatus(e, newstatus, index) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.props.setStatus(newstatus, index);
  }

  getIconFromStatus(status, index) {
    return {
      done: (
        <List.Icon
          style={{ cursor: 'pointer' }}
          onClick={e => this.setStatus(e, 'problem', index)}
          name="check"
          color="green"
          size="large"
          verticalAlign="middle"
        />
      ),
      'on-progress': (
        <List.Icon
          style={{ cursor: 'pointer' }}
          onClick={e => this.setStatus(e, 'done', index)}
          name="circle"
          color="orange"
          size="large"
          verticalAlign="middle"
        />
      ),
      problem: (
        <List.Icon
          style={{ cursor: 'pointer' }}
          onClick={e => this.setStatus(e, 'on-progress', index)}
          name="warning circle"
          color="red"
          size="large"
          verticalAlign="middle"
        />
      ),
      undefined: (
        <List.Icon
          style={{ cursor: 'pointer' }}
          onClick={e => this.setStatus(e, 'on-progress', index)}
          name="warning circle"
          color="red"
          size="large"
          verticalAlign="middle"
        />
      )
    }[status];
  }

  render() {
    return (
      <List
        className="responsivepadding"
        relaxed
        style={{
          textAlign: 'left'
        }}
      >
        {this.props.taskList.map((task, i) => (
          <div
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
                backgroundColor: '#4286f4',
                cursor: task.innerContent && 'pointer'
              }}
              key={task.title}
              onClick={() => task.innerContent && this.handleClick(i)}
            >
              <div
                style={{
                  display: 'flex',
                  width: '100%'
                }}
              >
                <div style={{ flex: 1 }}>
                  {this.getIconFromStatus(task.status, i)}
                </div>
                <div style={{ flex: 8, color: 'white' }}>
                  {task.title.toUpperCase()}
                </div>
                <div
                  style={{
                    flex: 1,
                    textAlign: 'right'
                  }}
                >
                  {task.innerContent &&
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
                    ))}
                </div>
              </div>
            </List.Item>
            <List.Item>
              {this.state.activeDropdowns.includes(i) &&
                (task.type === 'text' ? (
                  <div style={{ padding: 15 }}>{task.innerContent}</div>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 15
                    }}
                  >
                    {!task.innerContent.type.includes('image') ? (
                      <Button
                        as="a"
                        href={
                          !task.innerContent.type.includes('image')
                            ? task.innerContent.document
                            : undefined
                        }
                        download={task.innerContent.name}
                        onClick={() => {
                          task.innerContent.type.includes('image') &&
                            this.showModal(document);
                        }}
                        icon
                        labelPosition="right"
                        color={this.getColor(task.innerContent.type)[0]}
                        basic
                      >
                        {task.innerContent.name}
                        <Icon
                          style={{ background: 'none' }}
                          name={this.getColor(task.innerContent.type)[1]}
                        ></Icon>
                      </Button>
                    ) : (
                      <img
                        style={{ maxHeight: 200, maxWidth: '100%' }}
                        src={task.innerContent.document}
                      ></img>
                    )}
                  </div>
                ))}
            </List.Item>
          </div>
        ))}
      </List>
    );
  }
}
