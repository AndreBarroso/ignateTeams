
import { Highlight } from '@components/Highlight'
import {Container, Form, HeaderList, NumbersOfPlayers } from './styles'
import { Header } from '@components/Header'
import { ButtonIcon } from '@components/ButtonIcon'
import { Input } from '@components/Input'
import {Filter} from '@components/Filter'
import { FlatList } from 'react-native'

import { useState } from 'react'
import { PLayerCard } from '@components/PLayerCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'
import { useRoute } from '@react-navigation/native'

type RouteParams = {
    group: string
}

export function Players() {
    const [team, setTeam] = useState('Time A')
    const [players, setPlayers] = useState([])

    const route = useRoute()

    const {group} = route.params as RouteParams  // pega o que foi passado do component de NewGroup

    return (
        <Container>
            <Header showBackButton/>
            <Highlight
                title={group}
                subtitle="adicione a galera e separe os times"
            
            />
            <Form>

            <Input
                placeholder="Nome da pessoa"
                autoCorrect={false}
            
            
            />
            <ButtonIcon 
                icon="add"
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
                keyExtractor={item => item}
                renderItem={({item}) => (
                    <PLayerCard
                        name={item}
                        onRemove={() => {}}
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