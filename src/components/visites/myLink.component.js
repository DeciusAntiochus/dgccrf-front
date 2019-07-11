import React, { Component, useState } from 'react';

import { Link } from 'react-router-dom';
import TrameSelectionModal from './trameSelectionModal';

export default function MyLink(props) {
  const [modal, setModal] = useState(false);

  function close() {
    setModal(!modal);
  }

  return !props.visite.visiteData.new_visite ? (
    <div>{props.children}</div>
  ) : props.visite.visiteData.trame ? (
    <Link to={'/visite/' + props.visite.visiteData.VISITE_IDENT}>
      {props.children}
    </Link>
  ) : (
    <>
      <TrameSelectionModal
        {...props}
        visite={props.visite}
        trames={props.trames}
        opened={modal}
        close={() => close()}
      />
      <a onClick={() => setModal(!modal)} style={{ cursor: 'pointer' }}>
        {props.children}
      </a>
    </>
  );
}
