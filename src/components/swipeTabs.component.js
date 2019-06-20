import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Tab } from 'semantic-ui-react';
import { Swipeable } from 'react-swipeable';
import './swipeTabs.css'


class SwipeTabsComponent extends React.Component {
    constructor(props) {
        super(props);
        let swipeConfig = {
            delta: 10,                             // min distance(px) before a swipe starts
            preventDefaultTouchmoveEvent: true,   // preventDefault on touchmove, *See Details*
            trackTouch: true,                      // track touch input
            trackMouse: true,                     // track mouse input
            rotationAngle: 0,                      // set a rotation angle
        };

        this.state = {
            activeIndex: 0,
            panes: props.tabs.map(({ menuItem, component }) => ({
                menuItem,
                render: () => (
                    <Swipeable style={{ height: "100%", width: "90vh" }}
                        onSwipedRight={() => this.setState({ activeIndex: this.state.activeIndex > 0 ? this.state.activeIndex - 1 : 0 })}
                        onSwipedLeft={() => this.setState({ activeIndex: this.state.activeIndex < (this.state.panes.length - 1) ? this.state.activeIndex + 1 : (this.state.panes.length - 1) })}
                        {...swipeConfig}
                    >
                        {component}
                    </Swipeable>
                )
            }))
        }
    }
    render() {

        return (
            <Tab menu={{ secondary: true, pointing: true }} panes={this.state.panes}
                //style={{ display: "flex", flex: 1, justifyContent: "center" }}
                activeIndex={this.state.activeIndex}
                onTabChange={(e, data) => this.setState({ activeIndex: data.activeIndex })} />
        );
    }
}

SwipeTabsComponent.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
        menuItem: PropTypes.string,
        component: PropTypes.node
    })).isRequired
};

export default SwipeTabsComponent;
