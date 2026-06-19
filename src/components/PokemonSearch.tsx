import React, { useState } from "react";
import {
    Image,
    Keyboard,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import PokemonRequests from "../services/PokemonRequests";

interface PokemonData {
    pokemon_name: string;
    pokemon_id: number | string;
    pokemon_image: string;
    types: string[];
    description?: string | null;
}

export default function PokemonSearch() {
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [pokemon, setPokemon] = useState<PokemonData | null>(null); // guarda os dados do Pokémon encontrado

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setLoading(true);
        setErrorMsg("");
        setPokemon(null);
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

                setPokemon(result); // salva o resultado no state para exibir na tela
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

                <Pressable style={styles.botao} onPress={handleSearch}>
                    <Text style={styles.texto}>{loading ? "Buscando..." : "Buscar"}</Text>
                </Pressable>

                {errorMsg ? <Text style={{ color: "red", marginTop: 10 }}>{errorMsg}</Text> : null}

                {/* Exibe as informações do Pokémon encontrado */}
                {pokemon && (
                    <View style={styles.card}>
                        <Image source={{ uri: pokemon.pokemon_image }} style={styles.imagem} />
                        <Text style={styles.nome}>{pokemon.pokemon_name} (#{pokemon.pokemon_id})</Text>
                        <Text style={styles.tipos}>Tipo: {pokemon.types.join(", ")}</Text>
                        <Text style={styles.descricao}>
                            {pokemon.description || "Nenhuma descrição encontrada."}
                        </Text>
                    </View>
                )}
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
    botao: {
        width: "100%",
        height: 48,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 8,
        backgroundColor: '#4c8bf5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    texto: {
        color: 'white',
        fontWeight: 'bold',
    },
    card: {
        marginTop: 20,
        padding: 16,
        borderRadius: 8,
        backgroundColor: "#f4f4f7",
        alignItems: "center",
    },
    imagem: {
        width: 120,
        height: 120,
        marginBottom: 10,
    },
    nome: {
        fontSize: 20,
        fontWeight: "bold",
        textTransform: "capitalize",
        marginBottom: 4,
    },
    tipos: {
        fontSize: 14,
        color: "#555",
        textTransform: "capitalize",
        marginBottom: 8,
    },
    descricao: {
        fontSize: 14,
        textAlign: "center",
        color: "#333",
    },
});