import React from 'react';
import { Button, Container, Form, Input, Grid } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { changeAgent } from '../../services/actions';
import { FormGroup } from '@material-ui/core';
import axios from 'axios';
import config from '../../config';


function mapStateToProps(state) {
    return {
        AGENT_DD_IDENT: state.dataReducer.AGENT_DD_IDENT
    };
}

function mapDispatchToProps(dispatch) {
    return {
        changeAgent: newAgentIdent => dispatch(changeAgent(newAgentIdent)),
    };
}

class AuthComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            AGENT_DD_IDENT: ""
        }
        this.onSubmit = this.onSubmit.bind(this);
    }


    onSubmit = async () => {
        try {
            let res = await axios.get(config.backend.base_url + '/agent/' + this.state.AGENT_DD_IDENT);
            if (window.confirm("Etes vous sur de vouloir changer d'utilisateur pour " + res.data.AGENT_DD_LIBELLE + ".\n Vous perdrez toutes les données actuelles pour télécharger les données du nounvel utilisateur.")) {
                this.props.changeAgent(this.state.AGENT_DD_IDENT)
            }
        } catch (err) {
            console.log(err)
            if (!err.response) {
                window.alert('Vous devez être connecté à internet pour changer d\'utilisateur.\nVérifier votre connection avant de réeesayer')
            }
            else if (err.response.status == 404) {
                window.alert("L'utilisateur avec le code agent " + this.state.AGENT_DD_IDENT + " est introuvable")
            }
            else {
                window.alert("An unknown error occured");

            }
        }
    }

    render() {
        return (
            <Container style={{ paddingTop: "2em" }}>
                <Grid>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Input label="Votre identifiant agent IRIS" default={this.props.AGENT_DD_IDENT}
                                onChange={(event, { value }) => this.setState({ AGENT_DD_IDENT: value })} />

                        </FormGroup>

                        <Button> Valider </Button>
                    </Form>
                </Grid>
            </Container>
        )
    }
}

AuthComponent.propTypes = {
    AGENT_DD_IDENT: PropTypes.string.isRequired,
    changeAgent: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthComponent);