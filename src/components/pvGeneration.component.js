import React from 'react';
import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer';

const MyDoc = () => (
  <Document>
    <Page>
      <Text>Salut</Text>
    </Page>
  </Document>
);

export class PvGeneration extends React.Component {
  render() {
    return (
      <div>
        <PDFDownloadLink document={<MyDoc />} fileName="somename.pdf">
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Download now!'
          }
        </PDFDownloadLink>
      </div>
    );
  }
}
