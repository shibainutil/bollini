import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, View } from "react-native";

import { colors } from "../theme/colors";

type UserAvatarProps = {
  photoUrl?: string | null;
  size: number;
};

export function UserAvatar({ photoUrl, size }: UserAvatarProps) {
  if (photoUrl) {
    return (
      <Image
        source={{ uri: photoUrl }}
        style={[
          styles.image,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
        resizeMode="cover"
      />
    );
  }

  return (
    <View
      style={[
        styles.placeholder,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    >
      <Ionicons name="person" size={size * 0.5} color={colors.white} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: colors.mint,
  },
  placeholder: {
    backgroundColor: colors.tealSoft,
    alignItems: "center",
    justifyContent: "center",
  },
});