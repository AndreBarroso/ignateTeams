import AsyncStorag from "@react-native-async-storage/async-storage"
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { groupsGetAll } from "./groupsGetAll";

export async function groupCreate(newGroup: string) {
    try {

        const storedGroups = await groupsGetAll()

        const storage = JSON.stringify([...storedGroups, newGroup])
        
        /*parâmetros key: GROUP_COLLECTION
          value: storage
        */
       
        await AsyncStorag.setItem(GROUP_COLLECTION, storage)

    } catch (error) {
        throw error;
    }
}
