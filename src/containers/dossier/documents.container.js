import React, { Component } from 'react';
import { Button, Icon, Header } from 'semantic-ui-react';
import documentsService from '../../services/documents.service';
import MyActivityIndicator from '../../components/myActivityIndicator.component';
import DocumentModal from '../../components/documentModal.component';

function getBase64(file) {
  // eslint-disable-next-line no-undef
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class Documents extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      file: null,
      documents: null,
      modal: false,
      documentSelected: null
    };
    this.reader = new FileReader();
  }

  getColor(type) {
    if (type.includes('image')) {
      return ['blue', 'file image'];
    } else if (type.includes('pdf')) {
      return ['red', 'file pdf'];
    } else if (type.includes('sheet')) {
      return ['green', 'file excel'];
    } else {
      return ['grey', 'file'];
    }
  }

  loadDocuments(documents) {
    this.setState({ documents });
  }

  showModal(document) {
    this.setState({
      modal: true,
      documentSelected: document
    });
  }

  componentDidMount() {
    documentsService.getAllDocs().then(res => {
      this.loadDocuments(res);
    });

    documentsService.onChanges(() =>
      documentsService.getAllDocs().then(res => this.loadDocuments(res))
    );
  }

  fileInputRef = React.createRef();

  fileChange = e => {
    this.setState({ file: e.target.files[0] }, async () => {
      try {
        const file64 = await getBase64(this.state.file);
        await documentsService.postDocument(
          file64,
          this.state.file.type,
          this.state.file.name
        );
        //ne pas oublier de resize l'image si c'est une image...
      } catch (e) {
        // eslint-disable-next-line no-undef
        alert(e.message);
      }
    });
  };

  render() {
    const { documents } = this.state;
    return (
      <>
        {this.state.modal && this.state.documentSelected && (
          <DocumentModal document={this.state.documentSelected} />
        )}

        <Button
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

        {documents ? (
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {documents.map((document, i) => (
              <div key={i}>
                <Button
                  onClick={() => this.showModal(document)}
                  style={{
                    margin: '3em',
                    marginBottom: '1.5em',
                    display: 'flex',
                    height: '15em',
                    width: '15em',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  basic
                  color={this.getColor(document.type)[0]}
                >
                  <Icon
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '2em'
                    }}
                    name={this.getColor(document.type)[1]}
                  ></Icon>
                </Button>
                <Header as="h4" color={this.getColor(document.type)[0]}>
                  {document.name}
                </Header>
              </div>
            ))}
          </div>
        ) : (
          <MyActivityIndicator />
        )}
      </>
    );
  }
}
