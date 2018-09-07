import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
  return (
    /*
      Pass in array '[]' of styles, and right-most style
      overrides styles to left
    */
    <View style={[styles.containerStyle, props.style]}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative'
  }
};

export { CardSection };
