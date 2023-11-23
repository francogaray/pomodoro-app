import { useEffect, useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Platform,
    TouchableOpacity,
} from "react-native";
import Header from "./src/components/Header";
import Timer from "./src/components/Timer";
import { Audio } from "expo-av";

const colors = ["#F7DC6F", "#A2D9CE", "#D7B7E2"];

export default function App() {
    const [isWorking, setIsWorking] = useState(false);
    const [time, setTime] = useState(25 * 60);
    const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");
    const [isActive, setIsActive] = useState(false);
    const optionsTimes = {
        0: 25,
        1: 5,
        2: 15,
    };

    useEffect(() => {
        let interval = null;

        if (isActive) {
            interval = setInterval(() => {
                setTime(time - 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        if (time === 0) {
            setIsActive(false);
            setIsWorking((prev) => !prev);
            setTime(optionsTimes[currentTime] * 60);
            setTime(isWorking ? 300 : 1500);
        }
        return () => {
            clearInterval(interval);
        };
    }, [isActive, time]);

    const handleStopStart = () => {
        playSound();
        setIsActive(!isActive);
    };

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(
            require("./assets/audio/click.mp3")
        );
        await sound.playAsync();
    }

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: colors[currentTime] }]}
        >
            <View
                style={{
                    paddingTop: Platform.OS === "android" && 30,
                    paddingHorizontal: 15,
                    flex: 1,
                }}
            >
                <Text style={styles.text}>Pomodoro</Text>
                <Header
                    time={time}
                    setTime={setTime}
                    currentTime={currentTime}
                    setCurrentTime={setCurrentTime}
                    colors={colors}
                />
                <Timer time={time} />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleStopStart()}
                >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                        {isActive ? "STOP" : "START"}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 32,
        fontWeight: "bold",
    },
    button: {
        backgroundColor: "#333333",
        padding: 15,
        borderRadius: 15,
        marginTop: 15,
        alignItems: "center",
    },
});
