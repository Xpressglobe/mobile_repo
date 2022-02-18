import React from 'react';
import { View, BackHandler, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import { createReduxContainer, createReactNavigationReduxMiddleware, createNavigationReducer } from 'react-navigation-redux-helpers';
import Routes from "./routes";
import ThemeStyle from '../styles/Theme';

export const AppNavigator = createStackNavigator(Routes);
export const appNavigatorMiddleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav
);

const ReduxNav = createReduxContainer(AppNavigator, "root");
let App = undefined;

class AppWithNavigationState extends React.Component {

    constructor(props) {
        super(props);
        App = this;
    }

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        nav: PropTypes.object.isRequired,
    };
    componentWillMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }

    onBackPress = () => {
        const { dispatch, nav } = this.props;
        if (nav.index === 0) {
            return false;
        }
        dispatch({ type: 'Navigation/BACK' });
        return true;
    };

    getBarColor = () => {
        const route = this.props.nav.routes[this.props.nav.index].routeName;
        if (['SplashScreen'].indexOf(route) >= 0) {
            return 'transparent';
        }
        return ThemeStyle.mainColor;
    }

    isBarTranslucent = () => {
        const route = this.props.nav.routes[this.props.nav.index].routeName;
        if (['SplashScreen'].indexOf(route) >= 0) {
            return true;
        }
        return false;
    }

    render() {
        const { dispatch, nav } = this.props;
        console.log('nnndf', this.props);
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    barStyle='light-content'
                    backgroundColor={this.getBarColor()}
                    translucent={this.isBarTranslucent()}
                />
                <ReduxNav dispatch={dispatch} state={nav} />
            </View>

        );
    }
}

const mapStateToProps = state => ({
    nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);