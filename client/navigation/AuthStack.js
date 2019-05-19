import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';

const {createStackNavigator} = require("react-navigation-stack");
const AuthStack = createStackNavigator({ Login: LoginScreen, Register: RegisterScreen, ForgotPassword: ForgotPasswordScreen });
export default AuthStack;