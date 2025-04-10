import { useEffect, useState } from "react";
import { StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MovieCard } from "@/components/MovieCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Animated, {
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  release_date: string;
};

export default function HomeScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <Animated.View entering={FadeInDown.duration(800)}>
          <ThemedText type="title" style={styles.appName}>
            🎬 UrTheatre
          </ThemedText>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(300).duration(1000)}>
          <ThemedText style={styles.tagline}>
            Your gateway to the world of movies ✨
          </ThemedText>
          <ThemedText style={styles.description}>
            Dive into the latest blockbusters and find your next favorite film.
          </ThemedText>
        </Animated.View>

        <FlatList
          key="grid"
          data={movies}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 16 }}
          renderItem={({ item }) => (
            <MovieCard
              id={item.id}
              title={item.title}
              posterPath={item.poster_path}
              rating={item.vote_average}
              overview={item.overview}
              releaseDate={item.release_date}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  appName: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    color: "#E50914", // Netflix-style red for flair
    marginBottom: 8,
    paddingTop: 16,
  },
  tagline: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 4,
    fontWeight: "600",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    opacity: 0.7,
    marginBottom: 24,
  },
  columnWrapper: {
    justifyContent: "space-between",
    gap: 16,
    paddingBottom: 16,
  },
});
