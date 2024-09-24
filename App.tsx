import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import MaterialIcons

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      submittedData: [],
    };
  }

  handleInputChange = (field, value) => {
    this.setState({ [field]: value });
  };

  validateInputs = () => {
    const { firstName, lastName, email, phoneNumber } = this.state;

    // Check if first name and last name contain only alphabets and do not start with space
    const namePattern = /^[A-Za-z][A-Za-z]*$/;
    if (!namePattern.test(firstName)) {
      Alert.alert('Invalid First Name', 'First name should contain only alphabets and must not start with a space.');
      return false;
    }

    if (!namePattern.test(lastName)) {
      Alert.alert('Invalid Last Name', 'Last name should contain only alphabets and must not start with a space.');
      return false;
    }

    // Check if email contains @gmail.com
    if (!email.endsWith('@gmail.com')) {
      Alert.alert('Invalid Email', 'Email must contain @gmail.com.');
      return false;
    }

    // Check if phone number is 10 digits
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phoneNumber)) {
      Alert.alert('Invalid Phone Number', 'Phone number must be 10 digits.');
      return false;
    }

    return true;
  };

  handleSubmit = () => {
    if (this.validateInputs()) {
      const { firstName, lastName, email, phoneNumber, submittedData } = this.state;

      // Add the new submitted data to the array of submittedData
      this.setState({
        submittedData: [
          ...submittedData,
          { firstName, lastName, email, phoneNumber }
        ],
        // Clear input fields after submission
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
      });

      // Log the data in the console
      console.log('Submitted Data:', submittedData);
    }
  };

  handleRefresh = () => {
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: ''
    });
  };

  handleDelete = (index) => {
    const { submittedData } = this.state;
    const updatedData = submittedData.filter((_, i) => i !== index);
    this.setState({ submittedData: updatedData });
  };

  render() {
    const { firstName, lastName, email, phoneNumber, submittedData } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Sign Up</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter First Name"
            value={firstName}
            onChangeText={(value) => this.handleInputChange('firstName', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Last Name"
            value={lastName}
            onChangeText={(value) => this.handleInputChange('lastName', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            value={email}
            onChangeText={(value) => this.handleInputChange('email', value)}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChangeText={(value) => this.handleInputChange('phoneNumber', value)}
            keyboardType="phone-pad"
          />

          {/* Submit and Refresh Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={this.handleSubmit}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.refreshButton}
              onPress={this.handleRefresh}
            >
              <Text style={styles.refreshButtonText}>Refresh</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Render submitted data as cards inside ScrollView */}
        <ScrollView style={styles.cardsScrollContainer}>
          <View style={styles.cardsContainer}>
            {submittedData.map((data, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.cardText}>First Name: {data.firstName}</Text>
                <Text style={styles.cardText}>Last Name: {data.lastName}</Text>
                <Text style={styles.cardText}>Email: {data.email}</Text>
                <Text style={styles.cardText}>Phone No: {data.phoneNumber}</Text>
                {/* Cross (Close) Icon for Deletion */}
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => this.handleDelete(index)}
                >
                  <Icon name="close" size={24} color="#f44336" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#baf7d2',
  },
  formContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: 'white',
    width: '80%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  submitButton: {
    height: 50,
    width: '45%',
    backgroundColor: '#4091cf',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshButton: {
    height: 50,
    width: '45%',
    backgroundColor: '#f44336',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  refreshButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardsScrollContainer: {
    flex: 1,
    marginTop: 20,
  },
  cardsContainer: {
    paddingHorizontal: 35,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    position: 'relative',
  },
  cardText: {
    fontSize: 16,
    marginBottom: 4,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
