import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";

import { Participant } from '../../components/Participant'

import { styles } from "./style";
import { useState } from "react";

export function Home() {
  const [participants, setParticipants] = useState<string[]>([])
  const [participantName, setParticipantName] = useState('')

  function handleParticipantAdd(name:string) {
    if(participants.includes(name)){
      return Alert.alert("Usuário existente", "Esse usuário já existe")
    }

    setParticipantName('')
    setParticipants(prevState => [...prevState, name])
  }

  function handleParticipantRemove(name: string) {
    return Alert.alert("Tem certeza?", `Quer remover o participante ${name}`, [
      {
        text:"Sim",
        onPress: () => {
          setParticipants(prevState => prevState.filter(participant => participant !== name))
        }
      },
      {
        text:"Não",
        style:"cancel"
      }
    ],)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome do evento
      </Text>

      <Text style={styles.eventDate}>
        Sexta, 4 de Novembro de 2022.
      </Text>

      <View style={styles.form}>
        <TextInput 
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={setParticipantName}
          value={participantName}
        />
        
        <TouchableOpacity style={styles.button} onPress={() => handleParticipantAdd(participantName)}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Participant 
            key={item} 
            name={item} 
            onRemove={() => handleParticipantRemove(item)} 
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.
          </Text>
        )}
      />
    </View>
  )
}