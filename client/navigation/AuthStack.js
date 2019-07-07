import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';

const AuthStack = createStackNavigator({ 
	Login: LoginScreen,
	Register: RegisterScreen,
	ForgotPassword: ForgotPasswordScreen 
});

const AuthNavigator = createAppContainer(AuthStack);

export default AuthNavigator;