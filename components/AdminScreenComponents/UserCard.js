import React from 'react';
import { Avatar, Card } from "react-native-paper";
import styled from "styled-components";

export default function UserCard(data) {
  return (
    <CustomCard>
        <Card.Title
            title={data?.username}
            subtitle={data?.email}
            titleStyle={{ color: "#fff" }}
            subtitleStyle={{ color: "#fff" }}
            left={(props) =>
                <Avatar.Image
                    {...props}
                    size={50}
                    source={{
                        uri: data?.pictureUrl,
                    }}
                />
            }
        />
    </CustomCard>
  )
}

const CustomCard = styled(Card)`
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: #29313c;
`;