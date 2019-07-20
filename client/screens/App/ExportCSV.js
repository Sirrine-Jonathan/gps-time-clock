import React from "react";
import { connect } from 'react-redux';
import {Text, View, StyleSheet} from "react-native";
import { NavigationEvents } from "react-navigation";
import RangeButton from '../../components/RangeButton';
import DateTimePicker from "react-native-modal-datetime-picker";
import {
    login,
    sendCSVEmail
} from '../../redux/actions/authActions'

class ExportCSV extends React.Component {

    state = {
        isDatePickerVisible: false,
        isFirstButton: null,
        firstDate: null,
        secondDate: null,
        firstDateDisplay: 'Select Date',
        secondDateDisplay: 'Select Date',
        user: this.props.user
    };

    static navigationOptions = {
        drawerLabel: 'Export Hours',
        title: 'Export Hours'
    };

    _firstButtonActions = () => {
        this.setState({ isFirstButton: true});
        this.setState({ isDateTimePickerVisible: true });
    };

    _secondButtonActions = () => {
        this.setState({ isFirstButton: false});
        this.setState({ isDateTimePickerVisible: true });
    };

    _hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
        this.setState({ isFirstButton: null });
    };

    _handleDatePicked = (date) => {
        console.log("A date has been picked: ", date);
        // make sure a button is actually selected and not null
        if (this.state.isFirstButton) {
            this.setState({firstDateDisplay: (date.getMonth() + 1).toString() + "-" + date.getDate().toString() + "-" + date.getFullYear().toString()})
            this.setState({firstDate: date});
        }
        if (!this.state.isFirstButton) {
            this.setState({secondDateDisplay: (date.getMonth() + 1).toString() + "-" + date.getDate().toString() + "-" + date.getFullYear().toString()})
            this.setState({secondDate: date})
        }
        this._hideDateTimePicker();
    };

    _sendEmail = () => {
        this.props.sendCSVEmail()
    }


    render() {
        let { user } = this.state;
        this._sendEmail();
        return (
            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.userInfo}>
                        <Text style={styles.username}>{ user.username }</Text>
                        <Text style={styles.company}>{ user.company }</Text>
                    </View>
                    <View style={styles.range}>
                        <RangeButton onPress={this._firstButtonActions} title={this.state.firstDateDisplay}/>
                        <Text style={styles.text}> - </Text>
                        <RangeButton onPress={this._secondButtonActions} title={this.state.secondDateDisplay}/>
                    </View>
                </View>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                />
                
            </View>
        );
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        sendCSVEmail: (dateOne, dateTwo) => dispatch(sendCSVEmail(dateOne, dateTwo))
    }
}

const mapStateToProps = (state) => {
    return {
        emailSuccess: state.emailSuccess,
        emailError: state.emailError
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExportCSV);

const styles = StyleSheet.create({
    header: {
        paddingTop: 15,
    },
    userInfo: {
        alignItems: 'center',
        paddingTop: 10,
        padding: 5,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
    },
    range: {
        flexDirection: 'row',
        width: '100%',
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
    },
    text: {
        fontSize: 24,
    },
    username: {
        fontSize: 25,
    },
    company: {
        fontSize: 20,
    }
});