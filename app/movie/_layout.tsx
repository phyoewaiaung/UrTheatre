import { Stack, useLocalSearchParams } from 'expo-router';

export default function MovieLayout() {
  const { title } = useLocalSearchParams();
  return (
    <Stack>
      <Stack.Screen 
        name="[id]"
        options={{
          title: title as string || 'Movie Details',
          headerBackTitle: 'Back'
        }}
      />
    </Stack>
  );
}