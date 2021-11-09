import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';

export default class App extends React.Component {

  constructor(props) {

    super(props)

    this.state = {
      Student_ID: '',
      Student_Name: '',
      Student_Class: '',
      Student_Phone_Num: '',
      Student_Email: '',
      dataSource: []
    }

  }

  refreshStudents() {
    fetch(`http://localhost:8081/apireactnativeacademic/ShowAllStudentsList.php`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson
        })
      })
  }

  componentDidMount() {

    this.refreshStudents();

  }

  InsertStudent = () => {
    fetch("http://localhost:8081/apireactnativeacademic/InsertStudentData.php", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        student_name: this.state.Student_Name,
        student_class: this.state.Student_Name,
        student_phone_num: this.state.Student_Phone_Num,
        student_email: this.state.Student_Email
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        alert(responseJson);
        this.refreshStudents();
      })
      .catch((error) => {
        console.error(error)
      })
  }

  SearchStudent = () => {
    fetch("http://localhost:8081/apireactnativeacademic/showstudentxid.php", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        student_id: this.state.Student_ID,
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          Student_Name: responseJson[0]['student_name'],
          Student_Class: responseJson[0]['student_class'],
          Student_Phone_Num: responseJson[0]['student_phone_num'],
          Student_Email: responseJson[0]['student_email']
        })


      })
      .catch((error) => {
        alert("Id de Estudainte no se encuentra");

        this.state = {
          Student_ID: '',
          Student_Name: '',
          Student_Class: '',
          Student_Email: '',
          Student_Phone_Num: ''
        }
      })
  }

  UpdateStudent = () => {
    fetch("http://localhost:8081/apireactnativeacademic/updatestudentrecord.php", {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        student_id: this.state.Student_ID,
        student_name: this.state.Student_Name,
        student_class: this.state.Student_Name,
        student_phone_num: this.state.Student_Phone_Num,
        student_email: this.state.Student_Email
      })
    })
      .then((res) => res.json())
      .then((resJson) => {
        alert(resJson);
        this.refreshStudents()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  DeleteStudent = () => {
    fetch("http://localhost:8081/apireactnativeacademic/deletestudentrecord.php", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        student_id: this.state.Student_ID,
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        alert(responseJson);
        this.refreshStudents()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 7 }}> Registro de Estudiante </Text>
        <TextInput
          placeholder="Ingrese el Id del estudiante"
          onChangeText={TextInputValue => this.setState({ Student_ID: TextInputValue })}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyleClass}
          value={this.state.Student_ID}
        />
        <TextInput
          placeholder="Ingrese el nombre del estudiante"
          onChangeText={TextInputValue => this.setState({ Student_Name: TextInputValue })}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyleClass}
          value={this.state.Student_Name}
          autoFocus={true}


        />
        <TextInput
          placeholder="Ingrese la clase del estudiante"
          onChangeText={TextInputValue => this.setState({ Student_Class: TextInputValue })}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyleClass}
          value={this.state.Student_Class}
        />
        <TextInput
          placeholder="Ingrese número de teléfono"
          onChangeText={TextInputValue => this.setState({ Student_Phone_Num: TextInputValue })}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyleClass}
          value={this.state.Student_Phone_Num}

        />
        <TextInput
          placeholder="Ingrese el correo electrónico"
          onChangeText={TextInputValue => this.setState({ Student_Email: TextInputValue })}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyleClass}
          value={this.state.Student_Email}


        />
        <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.InsertStudent} >
          <Text style={styles.TextStyle}> Agregar </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.SearchStudent} >
          <Text style={styles.TextStyle}> Buscar </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.UpdateStudent} >
          <Text style={styles.TextStyle}> Actualizar </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.DeleteStudent} >
          <Text style={styles.TextStyle}> Eliminar </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} >
          <Text style={styles.TextStyle}> Listar </Text>
        </TouchableOpacity>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) =>
            <TouchableOpacity onPress={() => alert(item.student_name + " " + item.student_phone_num)}
              style={styles.TouchableOpacityStyle}>
              <Text>{item.student_name} - {item.student_phone_num}</Text>
            </TouchableOpacity>
          }
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({

  MainContainer: {

    alignItems: 'center',
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff'

  },

  TextInputStyleClass: {

    textAlign: 'center',
    width: '90%',
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    borderColor: '#FF5722',
    borderRadius: 5,

  },

  TouchableOpacityStyle: {

    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 7,
    width: '90%',
    backgroundColor: '#00BCD4'

  },

  TextStyle: {
    color: '#fff',
    textAlign: 'center',
  },

  rowViewContainer: {
    fontSize: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  }

});
