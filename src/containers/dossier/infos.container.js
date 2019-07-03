import React from 'react';
import PropTypes from 'prop-types';

class InfosComponent extends React.Component {
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

InfosComponent.propTypes = {
  dossier: PropTypes.shape({
    DOSSIER_OBJ_TRAVAIL: PropTypes.string,
    DOSSIER_RESPONSABLE_LIBELLE: PropTypes.string,
    DOSSIER_ATTRIBUTAIRES: PropTypes.string
  })
};

export default InfosComponent;
