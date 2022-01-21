import React from 'react';
import { StyleSheet, Text, View, Button,TouchableOpacity,Alert,ScrollView,SafeAreaView} from 'react-native';
import Header from "./components/Header"
import Content from "./components/Content"
import Footer from "./components/Footer"
import Constants from 'expo-constants';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      resultText:"",
    }
    this.onPress = this.onPress.bind(this);
  }
 
  onPress(text){
    this.setState({
      data:this.state.data+text,
      });
    if(text=="="){
      const result = this.state.data 
      this.setState({
        resultText:eval(result),
          data:this.state.data,
        });
         
    }else if(text=="C"){
      let t = this.state.data.split("")
      t.pop()
      this.setState({
        data:t.join(""),
        });
    }
    
  }; 
 

  
  render() {
  
    let rows =[];
    let nums = [[1,2,3],[4,5,6],[7,8,9],[".",0,"="]];
    for(let i=0;i<4;i++){
      let row=[];
      for(let j=0;j<3;j++){
        row.push(<TouchableOpacity style={styles.elem} onPress={() => this.onPress(nums[i][j])}>
            <Text style={styles.textnums}>{nums[i][j]}</Text>
          </TouchableOpacity>
        )
      }


      rows.push(<View style={styles.row}>{row}</View>)
    }

    let ops=[];
    let oper=["C","+","-","*","/"];
    for(let i=0;i<5;i++){
      ops.push(<TouchableOpacity style={styles.elem} onPress={() => this.onPress(oper[i])}>
          <Text style={styles.textnums}>{oper[i]}</Text>
        </TouchableOpacity>
      )
    }
    return (
      <View style={styles.container}>
         <SafeAreaView style={styles.calculation}>
         <ScrollView style={styles.scrollView}>
           <Text style={styles.text}>
             {this.state.data}
           </Text>
         </ScrollView>
       </SafeAreaView>
        <View style={styles.result}>
          <Text style={ styles.text2}>{this.state.resultText}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
            {rows}
          </View>
          <View style={styles.operations}>
          {ops}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView:{
    marginHorizontal: 20, 
    alignSelf: 'flex-end',
  },
  text:{
    flex:1,
    fontSize: 60,   
  },
  text2:{
    flex:1,
    fontSize: 40,   
    alignSelf: 'center',
  },
  textnums:{
    color:'white',
    fontSize: 30,  
  },
  calculation: {
    flex: 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center', 
  },
  result: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttons: {
    flexGrow: 7,
    flexDirection: 'row',
  },
  numbers: {
    flex: 3,
    flexDirection: 'column',
    backgroundColor: "#8A8A8A",
  },
  operations: {
    flex: 1,
    backgroundColor: "#535C5F",
  },
  row:{
    flex:1,
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems: 'center',
  },
  elem:{
    flex:1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent:'center',
  },

});
