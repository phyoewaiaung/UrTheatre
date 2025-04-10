
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

type MovieCardProps = {
  title: string;
  posterPath: string;
  onPress: () => void;
};

export function MovieCard({ title, posterPath, onPress }: MovieCardProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${posterPath}` }}
        style={styles.poster}
      />
      <ThemedView style={styles.titleContainer}>
        <ThemedText numberOfLines={2} style={styles.title}>{title}</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    marginRight: 16,
  },
  poster: {
    width: 150,
    height: 225,
    borderRadius: 8,
  },
  titleContainer: {
    padding: 8,
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
  },
});
