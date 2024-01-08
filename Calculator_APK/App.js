import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [previousValue, setPreviousValue] = useState('');
  const [operator, setOperator] = useState('');

  const handlePress = (val) => {
    if (['+', '-', '*', '/', '√'].includes(val)) {
      if (val === '√') {
        setInputValue(String(Math.sqrt(parseFloat(inputValue))));
        return;
      }

      setPreviousValue(inputValue);
      setInputValue('');
      setOperator(val);
    } else if (val === '=') {
      const num1 = parseFloat(previousValue);
      const num2 = parseFloat(inputValue);

      switch (operator) {
        case '+':
          setInputValue(String(num1 + num2));
          break;
        case '-':
          setInputValue(String(num1 - num2));
          break;
        case '*':
          setInputValue(String(num1 * num2));
          break;
        case '/':
          if (num2 !== 0) {
            setInputValue(String(num1 / num2));
          } else {
            setInputValue('Error');
          }
          break;
      }

      setOperator('');
      setPreviousValue('');
    } else {
      setInputValue(inputValue + val);
    }
  };

  const handleReset = () => {
    setInputValue('');
    setPreviousValue('');
    setOperator('');
  };

  return (
      <View style={styles.container}>
        <TextInput style={styles.input} value={inputValue} editable={false} />
        <View style={styles.buttonContainer}>
          {['C', '√', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='].map((val) => (
              <View style={(val === 'C' || val === '0') ? styles.buttonDouble : styles.button} key={val}>
                <Button title={val} onPress={val === 'C' ? handleReset : () => handlePress(val)} />
              </View>
          ))}
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    width: 300,
    height: 80,
    fontSize: 32,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: 320,
  },
  button: {
    width: 75, // Adjusted to fill the 4x5 grid more uniformly
    height: 70,
    margin: 2.5, // Reduced margins slightly to ensure smooth flow
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  buttonDouble: {
    width: 155, // 2 times width + margin
    height: 70,
    margin: 2.5, // Reduced margins slightly
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
  },
});
