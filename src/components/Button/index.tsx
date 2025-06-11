import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

export function Button() {
    return(
        <TouchableOpacity style={styles.container} activeOpacity={0.5}>
            <Text style={styles.title}>Adicionar</Text>
        </TouchableOpacity>
    )
}