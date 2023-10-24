import AsyncStorage from "@react-native-async-storage/async-storage"

import { PLAYER_COLLECTION } from "@storage/storageConfig"
import { PlayerStorageDTO } from "./PlayerStorageDTO"
import {playersGetByGroup} from './playersGetByGroup'
import { AppError } from "@utils/AppErros"

export async function playersRemoveByGroup(newPlayer: string, group: string) {
    try{
        
       const storedPlayers = await playersGetByGroup(group)

       const playersAlreadyExists = storedPlayers.filter(player => player.name !== newPlayer)

       if(playersAlreadyExists.length > 0) {
        throw new AppError('Essa pessoa já está adicionada eu um time aqui')
       }

       const storage = JSON.stringify([...storedPlayers, newPlayer])        
       
       await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage)

    } catch(error) {
        throw error
    }
}