import { NavigationActions, StackActions } from 'react-navigation';

import { AppNavigator } from '../navigators/AppNavigator';

const firstAction = AppNavigator.router.getActionForPathAndParams('SplashScreen');
const initialNavState = AppNavigator.router.getStateForAction(
  firstAction,
);

export default function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case 'SplashScreen':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'SplashScreen' }),
        state
      );
      break;
    case 'LoginScreen':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'LoginScreen' }),
        state
      );
      break;
    case 'RegisterScreen':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'RegisterScreen' }),
        state
      );
      break;

    case 'resetAndGoToScreen':
      nextState = AppNavigator.router.getStateForAction(
        StackActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({routeName: action.routeName})
            ]
        }),
        state
      );
      break;
    case 'goToScreenWithProps':
      console.log('goToScreenWithProps', state.routes);
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: action.routeName, params:action.screenProps}),
        state
      );
      break;
    case 'goBackScreen':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        state
      );
      break;
    case 'goBackScreenWithIndex':
      var routes = state.routes;
      var popTo = action.popTo;
      var newRoutes = [];
      routes.map((route, index) => {
        if(index < (routes.length-popTo)+1) {
          newRoutes.push(route);
        }
      })
      state.routes = newRoutes;
      var newRouteName = newRoutes[newRoutes.length-1].key;

      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.back({key:newRouteName}),
        state
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  return nextState || state;
}
