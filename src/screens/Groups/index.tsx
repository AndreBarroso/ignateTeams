import {useState} from "react"

import { Header } from '@components/Header';
import { Container, Title} from './styles';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { FlatList } from "react-native";
import { ListEmpty } from "@components/ListEmpty";
import {Button} from "@components/Button"
import {NativeStackNavigationProp } from "@react-navigation/native-stack" //tipagem de navegação

//Essa definição é a mesma usada no arquivo @types/navigation.d.ts
type RootParamnList = {
  groups: undefined
  new: undefined
  players: {
    group: string
  }
}

//passar a tipagem (RootParamnList) e em qual tela está('groups')
type Props = {
  navigation: NativeStackNavigationProp<RootParamnList, 'groups'>
}


export  function Groups({navigation}: Props) {
  const [groups, setGroups] = useState<string[]>([])

  function handleNewGroup() {
    navigation.navigate('new')
  }

  return (
    <Container>
      <Header showBackButton/>
      <Highlight
        title='Turmas'
        subtitle='Jogue com a sua turma'
      />
      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <GroupCard
            title={item}
          />
        )}
        contentContainerStyle={groups.length === 0 && {flex: 1}}
        ListEmptyComponent={() => (
        <ListEmpty 
          message="Que tal cadastrar a primeira turma?"/>
        
        )}
      />

      <Button 
        title="Criar nova turma"
        onPress={() => handleNewGroup()}
      />
    </Container>
  );
}

