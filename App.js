import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button,
  StyleSheet,
} from 'react-native';

const App = () => {
  const [facts, setFacts] = useState([]);
  const [fact, setFact] = useState('Carregando...');

  useEffect(() => {
    fetch('https://cat-fact.herokuapp.com/facts')
      .then(response => response.json())
      .then(json => {
        if (!json.all) {
          alert('Oh noh!');
          return;
        }
        setFacts(json.all);
        setFact(json.all[getRandomIndex(0, facts.length - 1)].text);
      })
      .catch(error => alert(error));
  }, []);

  const getRandomIndex = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getFact = () => {
    const randomFact = facts[getRandomIndex(0, facts.length - 1)];
    setFact(randomFact.text);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.root}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.container}>
            <Text style={styles.title}>Randon cat fact</Text>
            <Text style={styles.text}>{fact}</Text>
            <Image
              style={styles.image}
              source={{uri: 'https://placekitten.com/200/200'}}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Another one" onPress={getFact} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'skyblue',
    flex: 1,
  },
  container: {
    margin: 20,
    padding: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    fontSize: 22,
  },
  text: {
    color: '#333',
    fontSize: 18,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default App;
