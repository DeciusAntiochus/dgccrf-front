import React from 'react';
export default class InfosComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      infos: [{
        object: "Description",
        value: "Préléver 5 peluche dans des magasins de jouet."
      },
      {
        object: "Responsable de la tâche",
        value: "Antoine Awaida"
      },
      {
        object: "Enquêteurs Associés",
        value: <ul>
          <li>Antoine Paris</li>
          <li>Alexandra Jerome</li>
        </ul>
      }]
    }
  }
  render() {
    return (
      this.state.infos.map(info => (
        <div key={info.object} style={{ margin: "2em" }}>
          <h4>{info.object}</h4>
          {info.value}
        </div >
      ))
    );
  }
}

