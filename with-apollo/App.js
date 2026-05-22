import { gql } from "@apollo/client";
import { ApolloProvider, useQuery } from "@apollo/client/react";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { apolloClient } from "./apollo";

// Imperial I-class Star Destroyer (numeric ID string, not Relay)
const defaultStarshipId = "3";

// List all starships (your wrapper returns results array)
const LIST_STARSHIPS = gql`
  query listStarships {
    allStarships {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

// Fetch single starship by numeric id (snake_case + films = [String])
const GET_STARSHIP = gql`
  query getStarship($id: ID!) {
    starshipById(id: $id) {
      id
      name
      model
      starship_class
      crew
      length
      cost_in_credits
      consumables
      manufacturers
      film_names {
        title
        episode_id
        release_date
      }
    }
  }
`;


function RootComponent() {
  const [starshipId, setStarshipId] = useState(defaultStarshipId);
  const { data, error, loading } = useQuery(GET_STARSHIP, {
    variables: { id: starshipId },
  });

  if (error) {
    console.log("Error fetching starship", error);
  }

  const starship = data?.starshipById;

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <StarshipPicker
          starshipId={starshipId}
          onStarshipChange={setStarshipId}
        />
      </View>
      <View style={styles.detailsContainer}>
        {loading ? (
          <ActivityIndicator color="#333" />
        ) : starship ? (
          <StarshipDetails starship={starship} />
        ) : (
          <Text style={{ color: "red" }}>No starship found</Text>
        )}
      </View>
    </View>
  );
}

function StarshipPicker(props) {
  const { data, error, loading } = useQuery(LIST_STARSHIPS);

  if (error) {
    console.log("Error listing starships", error);
    return <Text style={{ color: "red" }}>Failed to load starships</Text>;
  }

  if (loading) {
    return null;
  }

  // Flatten edges → nodes
  const starships = data.allStarships.edges.map(edge => edge.node);

  return (
    <Picker
      selectedValue={props.starshipId}
      onValueChange={props.onStarshipChange}
    >
      {starships.map((starship) => (
        <Picker.Item
          key={starship.id}
          label={starship.name}
          value={starship.id}
        />
      ))}
    </Picker>
  );
}


function StarshipDetails({ starship }) {
  const [films, setFilms] = useState([]);
  const [loadingFilms, setLoadingFilms] = useState(false);

  return (
    <>
      <View style={styles.section}>
        <Text style={styles.starshipName}>{starship.name}</Text>
        <Text style={styles.starshipModel}>{starship.model}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Operational abilities</Text>
        <Text>- {starship.crew ?? "N/A"} crew members</Text>
        <Text>- {starship.consumables ?? "N/A"} without restocking</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Ship attributes</Text>
        <Text>- {starship.length ?? "N/A"}m long</Text>
        <Text>- {starship.cost_in_credits ?? "N/A"} credits</Text>
      </View>

      {starship.manufacturers?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.label}>Manufacturers</Text>
          {starship.manufacturers.map((m, idx) => (
            <Text key={idx}>- {m}</Text>
          ))}
        </View>
      )}

      {starship.film_names?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.label}>Appeared in</Text>
          {starship.film_names.map((film, idx) => (
            <Text key={idx}>
              - {film.title} (Episode {film.episode_id}, {film.release_date})
            </Text>
          ))}
        </View>
      )}

      {loadingFilms ? (
        <ActivityIndicator color="#333" />
      ) : films.length > 0 ? (
        <View style={styles.section}>
          <Text style={styles.label}>Appeared in</Text>
          {films.map((film, idx) => (
            <Text key={idx}>
              - {film.title} (Episode {film.episode_id})
            </Text>
          ))}
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
    detailsContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",  // keeps it pinned to the top
    minHeight: 200,                // avoids collapse
    paddingTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 50,
    paddingTop: 100,
  },
  label: {
    marginBottom: 2,
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  section: {
    marginVertical: 12,
  },
  starshipName: {
    fontSize: 32,
    fontWeight: "bold",
  },
  starshipModel: {
    fontStyle: "italic",
  },
});

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <RootComponent />
    </ApolloProvider>
  );
}
