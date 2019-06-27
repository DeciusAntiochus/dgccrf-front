import React from 'react';
import { List } from 'semantic-ui-react';
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

  getIconFromStatus(status) {
    return {
      done: (
        <List.Icon
          name="check"
          color="green"
          size="large"
          verticalAlign="middle"
        />
      ),
      'on-progress': (
        <List.Icon
          name="circle"
          color="orange"
          size="large"
          verticalAlign="middle"
        />
      ),
      problem: (
        <List.Icon
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
                backgroundColor: '#4286f4'
              }}
              key={task.title}
              to={'visite/' + task.id}
              onClick={() => task.documentToFill && this.handleClick(i)}
            >
              <div
                style={{
                  display: 'flex',
                  width: '100%'
                }}
              >
                <div style={{ flex: 1 }}>
                  {this.getIconFromStatus(task.status)}
                </div>
                <div style={{ flex: 8, color: 'white' }}>{task.title}</div>
                <div
                  style={{
                    flex: 1,
                    textAlign: 'right'
                  }}
                >
                  {task.documentToFill &&
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
              {this.state.activeDropdowns.includes(i) && (
                <div style={{ padding: 15 }}>{task.documentToFill}</div>
              )}
            </List.Item>
          </div>
        ))}
      </List>
    );
  }
}
