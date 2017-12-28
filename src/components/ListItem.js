import React, { Component } from "react";
import { LayoutAnimation, Text, TouchableWithoutFeedback, View } from "react-native";
import { connect } from "react-redux";

import * as actions from "../actions";
import { CardSection } from "./common";

class ListItem extends Component {
    componentWillUpdate() {
        LayoutAnimation.easeInEaseOut();
    }

    renderDescription() {
        const { library, expanded } = this.props;
        if (expanded) {
            return (
                <CardSection>
                    <Text style={styles.descriptionStyle}>{library.description}</Text>
                </CardSection>
            );
        }
    }

    onLibrarySelected() {
        this.props.selectLibrary(this.props.expanded ? null : this.props.library.id);
    }

    render() {
        const { titleStyle } = styles;
        const { title } = this.props.library;

        return (
            <TouchableWithoutFeedback onPress={() => this.onLibrarySelected()}>
                <View>
                    <CardSection>
                        <Text style={titleStyle}>{title}</Text>
                    </CardSection>
                    {this.renderDescription()}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    },
    descriptionStyle: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10
    }
};

const mapStateToProps = (state, ownProps) => {
    const expanded = ownProps.library.id === state.selectedLibraryId;
    return { expanded };
};

export default connect(mapStateToProps, actions)(ListItem);
