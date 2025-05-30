import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/colors';

const SafeScreen = ({ children }: { children: React.ReactNode }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top, flex: 1, backgroundColor: COLORS.background, paddingBottom: insets.bottom }}>
      {children}
    </View>
  );
};

export default SafeScreen;
