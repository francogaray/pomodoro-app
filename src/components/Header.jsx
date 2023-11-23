import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";

const options = ["Pomodoro", "Short Break", "Long Break"];

const Header = ({ time, setTime, currentTime, setCurrentTime }) => {
    const handlePress = (index) => {
        const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
        setCurrentTime(index);
        setTime(newTime * 60);
    };

    return (
        <View style={{ flexDirection: "row", justifyContent: "space-around",}}>
            {options.map((item, idx) => (
                <TouchableOpacity
                    key={idx}
                    style={[
                        styles.itemStyle,
                        currentTime !== idx && { borderColor: "transparent" },
                    ]}
                    onPress={() => {
                        handlePress(idx);
                    }}
                >
                    <Text style={{fontWeight:"bold"}}>{item}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    itemStyle: {
        width: "33%",
        borderWidth: 3,
        borderColor:"white",
        padding: 5,
        borderRadius: 8,
        alignItems: "center",
        marginVertical:20,
    },
});

export default Header;
