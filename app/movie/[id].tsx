
import { useEffect, useState } from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';

type MovieDetails = {
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  genres: Array<{ id: number; name: string }>;
  runtime: number;
  tagline: string;
  vote_count: number;
  spoken_languages: Array<{ english_name: string }>;
  production_companies: Array<{ name: string }>;
};

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    if (movie?.title) {
      router.setParams({ title: movie.title });
    }
  }, [movie?.title]);

  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}`
      );
      const data = await response.json();
      setMovie(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!movie) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          style={styles.poster}
        />
        <ThemedView style={styles.content}>
          <ThemedText type="title" style={styles.title}>
            {movie.title}
          </ThemedText>
          <ThemedText style={styles.rating}>⭐ {movie.vote_average.toFixed(1)}</ThemedText>
          <ThemedText style={styles.info}>
            {new Date(movie.release_date).getFullYear()} • {movie.runtime} min
          </ThemedText>
          <ThemedText style={styles.genres}>
            {movie.genres?.map(g => g.name).join(', ')}
          </ThemedText>
          {movie.tagline && (
            <ThemedText style={styles.tagline}>"{movie.tagline}"</ThemedText>
          )}
          <ThemedText style={styles.overview}>{movie.overview}</ThemedText>
          <ThemedView style={styles.additionalInfo}>
            <ThemedText style={styles.infoLabel}>Languages:</ThemedText>
            <ThemedText style={styles.infoValue}>
              {movie.spoken_languages?.map(lang => lang.english_name).join(', ')}
            </ThemedText>
            
            <ThemedText style={styles.infoLabel}>Studios:</ThemedText>
            <ThemedText style={styles.infoValue}>
              {movie.production_companies?.map(company => company.name).join(', ')}
            </ThemedText>

            <ThemedText style={styles.infoLabel}>Total Votes:</ThemedText>
            <ThemedText style={styles.infoValue}>
              {movie.vote_count?.toLocaleString()} ratings
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tagline: {
    fontSize: 18,
    fontStyle: 'italic',
    opacity: 0.8,
    marginBottom: 16,
    textAlign: 'center',
  },
  additionalInfo: {
    marginTop: 24,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#ffffff10',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  infoValue: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 8,
  },
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  poster: {
    width: '100%',
    height: 500,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
  },
  genres: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 16,
  },
  overview: {
    fontSize: 16,
    lineHeight: 24,
  },
});
