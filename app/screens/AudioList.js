import React, { Component } from "react";
import { Text, ScrollView, StyleSheet, Dimensions, View } from "react-native";
import { AudioContext } from "../context/AudioProvider";
import { RecyclerListView, LayoutProvider } from "recyclerlistview";
import AudioListItem from "../components/AudioListItem";
import Screen from "../components/Screen";
export class AudioList extends Component {
  static contextType = AudioContext;
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

  rowRenderer = (type, item) => {
    console.log(item);
    // return <Text>{item.filename}</Text>;
    return (
      <AudioListItem
        title={item.filename}
        duration={item.duration}
        onOptionPress={() => {
          console.log("opening option");
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
