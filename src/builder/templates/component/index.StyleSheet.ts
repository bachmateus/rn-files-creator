import React from "react";
import { View, Text } from "react-native";

import styles from './styles';

interface Props {
  
}

const MyComponent:React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MyComponent</Text>
    </View>
  )
}

export default MyComponent;