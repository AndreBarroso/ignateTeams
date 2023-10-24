
import { Highlight } from '@components/Highlight'
import {Container, Form, HeaderList, NumbersOfPlayers } from './styles'
import { Header } from '@components/Header'
import { ButtonIcon } from '@components/ButtonIcon'
import { Input } from '@components/Input'
import {Filter} from '@components/Filter'
import { Alert, FlatList, TextInput } from 'react-native'

import { useEffect, useState, useRef } from 'react'
import { PLayerCard } from '@components/PLayerCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'
import { useRoute, useNavigation } from '@react-navigation/native'
import { AppError } from '@utils/AppErros'
import { playerAddGroup } from '@storage/player/playerAddByGroup'
import { playersGetByGroup } from '@storage/player/playersGetByGroup'
import { playersGetByGroupTeam } from '@storage/player/playerGetByGroupAndTeam'
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO'
import { playersRemoveByGroup } from '@storage/player/playerRemoveByGroup'
import { GroupRemoveByName } from '@storage/group/groupRemoveByName'

type RouteParams = {
    group: string
}

export function Players() {
    const [newPlayerName, setNewPlayerName] = useState('')
    const [team, setTeam] = useState('Time A')
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

    const route = useRoute()
    const navigation = useNavigation()

    const newPLayerNameInputRef = useRef<TextInput>(null)

    const {group} = route.params as RouteParams  // pega o que foi passado do component de NewGroup

    async function hanleAddPlayer(){
        if(newPlayerName.trim().length === 0) {
            Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar')
        }

        const newPlayer = {
            name: newPlayerName,
            team
        }

        try {

            await playerAddGroup(newPlayer, group) 

            newPLayerNameInputRef.current?.blur()

            setNewPlayerName('')

            fetchPlayersByTeam()

        } catch (error) {
            if(error instanceof AppError) {
                Alert.alert('Nova pessoa', error.message)
            }
            Alert.alert('nova pessoa', 'Não foi possível adiconar')
        }
    }

    async function fetchPlayersByTeam(){
        try {
            const playersByTeam = await playersGetByGroupTeam(group, team)
            fetchPlayersByTeam()

            setPlayers(playersByTeam)
        } catch(error) {
            Alert.alert('Pessoas', 'Bão foi possível carregar as pessoas do time selecionado')
        }
    }

    async function groupRemove() {
        try {
            await GroupRemoveByName(group)
            navigation.navigate('groups')

        } catch (error) {
            Alert.alert('Remover grupe', 'Não foi possível remover  o grupo')
        }
        
    }

    async function handlePlayerRemove(playerName: string){
        Alert.alert(
            'Remover',
            'Deseja remover o grupe?',
            [
                {text: 'Não', style: 'cancel'},
                {text: 'Sim', onPress: () => groupRemove()}
            ]
        )
        try {
            await playersRemoveByGroup(playerName, group)
            fetchPlayersByTeam()

        } catch(error) {
            Alert.alert('Remover pessoa', 'Não foi possível remover essa pessoa')
        }
    }

    async function handleGroupRemove(playerName: string){
        try {
            await playersRemoveByGroup(playerName, group)
            fetchPlayersByTeam()

        } catch(error) {
            Alert.alert('Remover pessoa', 'Não foi possível remover essa pessoa')
        }
    }

   
    useEffect(() => {
        fetchPlayersByTeam()
    }, [team])

    return (
        <Container>
            <Header showBackButton/>
            <Highlight
                title={group}
                subtitle="adicione a galera e separe os times"
            
            />
            <Form>

            <Input
                onChangeText={setNewPlayerName}
                onSubmitEditing={hanleAddPlayer}
                value={newPlayerName}
                placeholder="Nome da pessoa"
                autoCorrect={false}
                inputRef={newPLayerNameInputRef}
            
            
            />
            <ButtonIcon 
                icon="add"
                onPress={hanleAddPlayer}
            /> 
            </Form>
            <HeaderList>

                <FlatList
                    data={['Time A', 'Time B']}
                    keyExtractor={item => item}
                    renderItem={({item}) => (
                        <Filter
                            title={item}
                            isActive={item === team}
                            onPress={() => setTeam(item)}
                        />
                    )}
                    horizontal
                
                />
                <NumbersOfPlayers>
                        {players.length}
                </NumbersOfPlayers>
            </HeaderList>
            <FlatList
                data={players}
                keyExtractor={item => item.name}
                renderItem={({item}) => (
                    <PLayerCard
                        name={item.name}
                        onRemove={() => handlePlayerRemove(item.name)}
                    />
                 )}
                 ListEmptyComponent={() => (
                    <ListEmpty 
                      message="Não há pessoas nesse time"/>
                    
                    )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[{paddingBottom: 100}, players.length === 0 && {flex: 1}]}
            />

            <Button
                title="Remover Turma"
                type="SECONDARY"
            
            />
        </Container>
    )
}