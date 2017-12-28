import React, { Component } from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { connect } from "react-redux";

import * as actions from "../actions";
import { CardSection } from "./common";

class ListItem extends Component {
    renderDescription() {
        const { library, expanded } = this.props;
        if (expanded) {
            return <Text>{library.description}</Text>;
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
    }
};

const mapStateToProps = (state, ownProps) => {
    const expanded = ownProps.library.id === state.selectedLibraryId;
    return { expanded };
};

export default connect(mapStateToProps, actions)(ListItem);
