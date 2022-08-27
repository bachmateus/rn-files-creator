import React from "react";
import { View, Text } from "react-native";

import styles from './styles';

export default function MyComponent () {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MyComponent</Text>
    </View>
  )
}