import AsyncStorage from "@react-native-async-storage/async-storage"

import {AppError} from '@utils/AppErros'

import {PLAYER_COLLECTION} from '@storage/storageConfig'
import {playersGetByGroup} from './playersGetByGroup'

import {PlayerStorageDTO} from './PlayerStorageDTO'

export async function playerAddGroup(newPlayer: PlayerStorageDTO, group: string) {
    try{

        const storagedPlayers = await playersGetByGroup(group)

        const playersAlreadyExists = storagedPlayers.filter((player) => player.name === newPlayer.name)
        
        if(playersAlreadyExists.length > 0) {
            throw new AppError('Essa pessoa já está adicionada em um time aqui.')
        }

        const storage = JSON.stringify([...storagedPlayers, newPlayer])

        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage)

    } catch(error) {
        throw (error)
    }

}

