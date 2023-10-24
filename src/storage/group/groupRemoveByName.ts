
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storageConfig";

import {  groupsGetAll } from './groupsGetAll'
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function GroupRemoveByName(groupDeleted: string) {
    try {

        const storedGroups = await groupsGetAll()
        const groups = storedGroups.filter((group) => group !== groupDeleted)

        await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups))

        await AsyncStorage.removeItem(`${GROUP_COLLECTION}-${groupDeleted}`)

    } catch (error) {
        throw error;
    }
}