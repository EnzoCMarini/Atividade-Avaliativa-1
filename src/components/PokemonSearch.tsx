import React, { useState } from "react";
import {
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import PokemonRequests from "../services/PokemonRequests";

export default function PokemonSearch() {
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setLoading(true);
        setErrorMsg("");
        Keyboard.dismiss();

        try {
            const result = await PokemonRequests.fetchPokemonData(searchQuery);

            if (result) {
                console.log("=========================================");
                console.log("POKÉMON ENCONTRADO!");
                console.log(`- Nome: ${result.pokemon_name}`);
                console.log(`- ID: ${result.pokemon_id}`);
                console.log(`- URL da Imagem: ${result.pokemon_image}`);
                console.log(`- Tipagem: ${result.types.join(", ")}`);
                console.log(`- Descrição: ${result.description || "Nenhuma descrição encontrada."}`);
                console.log("=========================================");

                setSearchQuery("");
            } else {
                setErrorMsg("Pokémon não encontrado. Verifique o nome ou número.");
            }
        } catch (error) {
            setErrorMsg("Erro ao buscar o Pokémon. Tente novamente.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
            <View>
                <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>PokéSearch 🔍</Text>

                <Text style={{ marginBottom: 20 }}>
                    Atividade Avaliativa: busque um Pokémon pelo nome ou número.
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Digite o nome ou ID (ex: bulbasaur ou 1)"
                    placeholderTextColor="#8d8d99"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onSubmitEditing={handleSearch}
                />

                {errorMsg ? <Text style={{ color: "red", marginTop: 10 }}>{errorMsg}</Text> : null}

                {/* Exibir as informações aqui */}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: "#e1e1e6",
        color: "#121214",
        fontSize: 16,
        borderRadius: 6,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#323238",
    },
});
