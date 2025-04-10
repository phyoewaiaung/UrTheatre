
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

type MovieCardProps = {
  id: number;
  title: string;
  posterPath: string;
  rating: number;
  overview: string;
  releaseDate: string;
};

export function MovieCard({ 
  id,
  title, 
  posterPath, 
  rating, 
  overview, 
  releaseDate
}: MovieCardProps) {
  const router = useRouter();
  return (
    <TouchableOpacity 
      onPress={() => router.push(`/movie/${id}`)} 
      style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${posterPath}` }}
        style={styles.poster}
      />
      <ThemedView style={styles.infoContainer}>
        <ThemedText numberOfLines={2} style={styles.title}>{title}</ThemedText>
        <ThemedText style={styles.rating}>⭐ {rating.toFixed(1)}</ThemedText>
        <ThemedText style={styles.date}>{releaseDate.split('-')[0]}</ThemedText>
        <ThemedText numberOfLines={3} style={styles.overview}>{overview}</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '48%',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#ffffff10',
  },
  poster: {
    width: '100%',
    height: 260,
    borderRadius: 8,
  },
  infoContainer: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 8,
  },
  overview: {
    fontSize: 12,
    opacity: 0.8,
    lineHeight: 16,
  },
});
