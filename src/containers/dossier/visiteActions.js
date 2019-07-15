import React from 'react';
import { Container, Grid, Card, Divider } from 'semantic-ui-react';
import EntrepriseAttribute from '../../components/entrepriseAttribute.component';
import { DiffieHellman } from 'crypto';


export function DisplayAction({ controles }) {
    return (
        <Container style={{ padding: '1rem' }}>
            <Card centered raised fluid >
                <Card.Content>
                    {controles.map((controle, index) => {
                        return <React.Fragment key={controle.CONTROLE_IDENT}>
                            <Grid style={{ paddingBottom: "1em" }} >
                                <EntrepriseAttribute
                                    name="Action :"
                                    icon="building"
                                    style={{ padding: "0" }}
                                    value={<span>{controle.ACDG_CODE_ACTION}{controle.ACDG_LIBELLE}</span>}
                                />
                                <EntrepriseAttribute
                                    name="Produit :"
                                    icon="building"
                                    style={{ padding: "0" }}
                                    value={<span>{controle.CPF_CODE_PRODUIT} {controle.CPF_LIBELLE}</span>}
                                />

                            </Grid>
                            {index !== (controles.length - 1) && <Divider />}
                        </React.Fragment>


                    })}
                </Card.Content>
            </Card>
        </Container>
    )
}