import React from 'react';
import { TextInput, View, Text, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

const Input = (props) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    // <View style={containerStyle}>
    //   <Text style={labelStyle}>{label}</Text>
    //   <TextInput
    //     placeholder={placeholder}
    //     autoCorrect={false}
    //     value={value}
    //     onChangeText={onChangeText}
    //     style={inputStyle}
    //     secureTextEntry={secureTextEntry}
    //   />
    // </View>
    <TextInput
      style={styles.textInput}
      {...props}
    />
  );
};

const styles = {
  // inputStyle: {
  //   color: '#000',
  //   paddingRight: 5,
  //   paddingLeft: 5,
  //   fontSize: 18,
  //   lineHeight: 23,
  //   flex: 2 // Gets added to 'flex: 1' below so this takes up 2/3 space
  // },
  // labelStyle: {
  //   fontSize: 18,
  //   paddingLeft: 20,
  //   flex: 1 // Gets added to 'flex: 2' above so this takes up 1/3 space
  // },
  // containerStyle: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   height: 40,
  //   flex: 1
  // }
  textInput: {
    width: 0.9 * width,
    height: 0.08 * height,
    backgroundColor: 'rgb(242,242,242)',
    borderRadius: 30,
    paddingLeft: '3%',
    color: 'rgb(188,188,188)',
    fontSize: 18
  }
};

export { Input };
