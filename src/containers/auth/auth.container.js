import React from 'react';
import { Button, Container, Form, Input } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { changeAgent } from '../../services/actions';
import { FormGroup } from '@material-ui/core';


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


    onSubmit() {
        this.props.changeAgent(this.state.AGENT_DD_IDENT);
    }

    render() {
        return (
            <Container>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Input label="Votre identifiant agent IRIS" default={this.props.AGENT_DD_IDENT}
                            onChange={(event, { value }) => this.setState({ AGENT_DD_IDENT: value })} />

                    </FormGroup>

                    <Button> Valider </Button>
                </Form>
            </Container>
        )
    }
}

AuthComponent.propTypes = {
    AGENT_DD_IDENT: PropTypes.string.isRequired,
    changeAgent: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthComponent);