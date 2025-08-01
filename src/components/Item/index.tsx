import { FilterStatus } from "@/types/FilterStatus"
import { TouchableOpacity, View, Text } from "react-native"
import { styles } from "./styles"
import { StatusIcon } from "../StatusIcon"
import { Trash2 } from "lucide-react-native"

type ItemData = {
    status: FilterStatus
    description: string
}

type Props = {
    data: ItemData
    onStatus: () => void
    onRemove: () => void
}

export function Item({ data, onStatus, onRemove }: Props) {
    return(
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.8} onPress={onStatus}>
                <StatusIcon status={data.status} />
            </TouchableOpacity>

            <Text style={styles.description}>
                {data.description}
            </Text>

            <TouchableOpacity onPress={onRemove}>
                <Trash2 size={18} color="#828282"/>
            </TouchableOpacity>
        </View>
    )
}