import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Avatar, Card, IconButton } from "react-native-paper";
import {SvgUri} from "react-native-svg";
// import SvgUri from "react-native-svg-uri";

const CryptoListItem = ({ coin, iconUrl }) => {
  const [isSvgLoadingError, setIsSvgLoadingError] = useState(false);
  const handleSvgError = () => {
    setIsSvgLoadingError(true);
  };

  
  return (
    <View>
      <Card
        style={{
          margin: 10,
          padding: 10,
          borderRadius: 10,
          backgroundColor: "#29313c",
        }}
      >
        <Card.Title
          title={coin?.name}
          subtitle={coin?.symbol}
          titleStyle={{ color: "#fff" }}
          subtitleStyle={{ color: "#fff" }}
          left={(props) => (
            //if the iconUrl is svg then use SvgUri else use Avatar.Image
            iconUrl.includes(".svg") ? (
              <SvgUri
                width="50"
                height="50"
                uri={iconUrl}
                // source={{uri: iconUrl}}
                onError={handleSvgError}
              />
              
            ) : (
              <Avatar.Image
                {...props}
                size={50}
                source={{
                  uri: iconUrl,
                }}
              />
            )
          )}
          right={(props) => (
            <IconButton {...props} icon="chevron-right" onPress={() => {}} iconColor="#fff" />
          )}
        />
      </Card>
      {/* {iconUrl.includes(".svg") ? (
              <SvgUri
                width="50"
                height="50"
                uri={iconUrl}
                onError={handleSvgError}
              />
              // <Text>svg</Text>
            ) : (
              // <Avatar.Image
              //   // {...props}
              //   size={50}
              //   source={{
              //     uri: iconUrl,
              //   }}
              // />
              <Text>not svg</Text>
            )} */}
    </View>
  );
};

export default CryptoListItem;
