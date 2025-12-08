import React, { Component, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import LoadingScreen from '../views/LoadingScreen';

export default function withLoadingScreen(WrappedComponent) {
  return ({ loading, children, ...props }) =>
    loading ? <LoadingScreen /> : <WrappedComponent {...props} />;
}
