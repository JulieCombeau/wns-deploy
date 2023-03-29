import React from "react";
import { useQuery, gql } from "@apollo/client";
import "./App.css";
import { CardRow, Container, Footer, Header } from "./styles/elements";
import Wilder from "./Wilder";
import AddWilder from "./AddWilder";

const ALL_WILDERS = gql`
  query GetAllWilders {
    wilders {
      _id
      name
      city
    }
  }
`;

export type WilderData = {
  _id: string
  name:string
  city: string
}

function App() {
  
  const { loading, error, data } = useQuery<{wilders:WilderData[]}>(ALL_WILDERS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <div>
      <Header>
        <Container>
          <h1>LA SUPER MODIF n°3</h1>
        </Container>
      </Header>
      <Container>
        <AddWilder />
      </Container>
      <Container>
        <h2>WILDER</h2>
        <CardRow>
          {data?.wilders.map((wilder) => (
            <Wilder key={wilder._id} {...wilder} />
          ))}
        </CardRow>
      </Container>
      <Footer>
        <Container>
          <p>&copy; 2020 Wild Code School</p>
        </Container>
      </Footer>
      {/* [Unit]
Description=Small server for creating HTTP endpoints (hooks)
Documentation=https://github.com/adnanh/webhook/
ConditionPathExists=/etc/webhook.conf                                                     

[Service]
User=wns_student
ExecStart=/usr/bin/webhook -nopanic -hooks /etc/webhook.conf

[Install]
WantedBy=multi-user.target */}
    </div>
  );
}

export default App;
