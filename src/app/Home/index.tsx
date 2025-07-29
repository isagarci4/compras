import { Alert, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";
import { Item } from "@/components/Item";
import { useEffect, useState } from "react";
import { itemsStorage, ItemStorage } from "@/storage/itemsStorage";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]
const ITEMS = [
  { 
    id: "1", 
    status: FilterStatus.DONE, 
    description: "1 pacote de café" 
  },
  { 
    id: "2", 
    status: FilterStatus.PENDING, 
    description: "3 pacotes de macarrão" 
  },
  { 
    id: "3", 
    status: FilterStatus.PENDING, 
    description: "3 cebolas" 
  },
]

export function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING);
  const [description, setDescription] = useState("");
  const [items, setItems] = useState<ItemStorage[]>([]);

  async function getItems() {
    try {
      const response = await itemsStorage.get();
      setItems(response)
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível filtrar os itens ");
    }
  }

  useEffect(() => {
    getItems();
  }, [])

  return(
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo } />

      <View style={styles.form}>
        <Input 
          placeholder="O que você precisa comprar?"
          onChangeText={setDescription}
        />
        <Button 
          title="Adicionar" 
          onPress={() => console.log("Adicionado")} 
        />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter 
              key={status} 
              status={status} 
              isActive={status === filter}
              onPress={() => setFilter(status)}
            />
          ))}

          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList 
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item 
              data={item}
              onStatus={() => console.log("Troca status")}
              onRemove={() => console.log("Remover")}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => <Text style={styles.empty}>Nenhum item aqui.</Text>}
        />
      </View>
    </View>
  );
}