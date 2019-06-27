import React from 'react';
export default class InfosComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return this.props.dossier ? (
      <>
        <div style={{ margin: '2em' }}>
          <h4>Objet</h4>
          {this.props.dossier.DOSSIER_OBJ_TRAVAIL}
        </div>

        <div style={{ margin: '2em' }}>
          <h4>Responsable</h4>
          {this.props.dossier.DOSSIER_RESPONSABLE_LIBELLE}
        </div>

        <div style={{ margin: '2em' }}>
          <h4>Attributaires</h4>
          {this.props.dossier.DOSSIER_ATTRIBUTAIRES}
        </div>
      </>
    ) : (
      <div></div>
    );
  }
}
