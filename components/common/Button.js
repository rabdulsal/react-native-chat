import React from 'react';
import { Text, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

    return (
      <TouchableOpacity
        onPress={onPress}
        style={buttonStyle}
      >
        <Text style={textStyle}>
          {children}
        </Text>
      </TouchableOpacity>
    );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    // paddingTop: 10,
    // paddingBottom: 10

  },
  buttonStyle: {
    width: 0.9 * width,
    height: 0.08 * height,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: '2%',
    marginRight: '2%'
  }
};

export { Button };
