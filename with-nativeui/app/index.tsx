import { Text, View, Linking } from "react-native"
import { Button } from "@/components/ui/button"

export default function HomeScreen() {
    const openLink = (url: string) => {
        Linking.openURL(url)
    }

    return (
        <View className="flex-1 bg-background px-6 justify-center">
            <View className="max-w-md mx-auto w-full">
                <View className="mb-8">
                    <Text className="text-4xl font-bold text-foreground mb-4">
                        NativeUI
                    </Text>
                    <Text className="text-muted-foreground text-lg leading-6">
                        Beautiful React Native components inspired by shadcn/ui.
                        Copy, paste, and customize to build amazing mobile apps.
                    </Text>
                </View>

                <View>
                    <Button
                        onPress={() => openLink("https://www.nativeui.io/docs")}
                        className="w-full mb-3"
                    >
                        <Text className="text-primary-foreground font-medium">
                            Documentation
                        </Text>
                    </Button>

                    <Button
                        variant="outline"
                        onPress={() => openLink("https://www.nativeui.io/components")}
                        className="w-full mb-3"
                    >
                        <Text className="text-foreground font-medium">
                            Browse Components
                        </Text>
                    </Button>

                    <Button
                        variant="ghost"
                        onPress={() => openLink("https://github.com/nativeui-org/ui")}
                        className="w-full"
                    >
                        <Text className="text-foreground font-medium">
                            View on GitHub
                        </Text>
                    </Button>
                </View>

                <Text className="text-center text-muted-foreground text-sm mt-8">
                    Open Source • MIT License
                </Text>
            </View>
        </View>
    )
}