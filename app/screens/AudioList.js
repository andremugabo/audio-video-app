import React, { Component } from "react";
import { Text, ScrollView, StyleSheet, Dimensions, View } from "react-native";
import { AudioContext } from "../context/AudioProvider";
import { RecyclerListView, LayoutProvider } from "recyclerlistview";
import AudioListItem from "../components/AudioListItem";
import Screen from "../components/Screen";
import OptionModal from "../components/OptionModal";
import { Audio } from "expo-av";
export class AudioList extends Component {
  static contextType = AudioContext;

  constructor(props) {
    super(props);
    this.state = {
      OptionModalVisible: false,
      playbackObj: null,
      soundObj: null,
    };
    this.currentItem = {};
  }

  layoutProvider = new LayoutProvider(
    (i) => "audio",
    (type, dim) => {
      switch (type) {
        case "audio":
          dim.width = Dimensions.get("window").width;
          dim.height = 70;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    }
  );

  handleAudioPress = async (audio) => {
    try {
      console.log(audio);
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
      // console.log("pressed audio");
      const playbackObj = new Audio.Sound();
      // const status = await playbackObj.loadAsync(
      //   { uri: audio.uri },
      //   { shouldPlay: true }
      // );
      // console.log(status);
      const { sound: playbackObject } = await Audio.Sound.createAsync(
        { uri: audio.uri },
        { shouldPlay: true }
      );
    } catch (error) {
      console.error(error);
    }
  };

  rowRenderer = (type, item) => {
    // console.log(item);
    // return <Text>{item.filename}</Text>;
    return (
      <AudioListItem
        title={item.filename}
        duration={item.duration}
        onAudioPress={() => this.handleAudioPress(item)}
        onOptionPress={() => {
          // console.log("opening option");
          this.currentItem = item;
          this.setState({ ...this.state, OptionModalVisible: true });
        }}
      />
    );
  };
  render() {
    return (
      // <ScrollView>
      //   {this.context.audioFiles.map((item) => (
      //     <Text
      //       style={{
      //         padding: 10,
      //         borderBottomColor: "red",
      //         borderBottomWidth: 2,
      //       }}
      //       key={item.id}
      //     >
      //       {item.filename}
      //     </Text>
      //   ))}
      // </ScrollView>
      <AudioContext.Consumer>
        {({ dataProvider }) => {
          return (
            <Screen>
              <RecyclerListView
                dataProvider={dataProvider}
                layoutProvider={this.layoutProvider}
                rowRenderer={this.rowRenderer}
              />
              <OptionModal
                onPlayPress={() => {
                  console.log("play audio");
                }}
                onPlayListPress={() => {
                  console.log("adding to the play list");
                }}
                currentItem={this.currentItem}
                onClose={() =>
                  this.setState({ ...this.state, OptionModalVisible: false })
                }
                visible={this.state.OptionModalVisible}
              />
            </Screen>
          );
        }}
      </AudioContext.Consumer>
    );
  }
}

export default AudioList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
