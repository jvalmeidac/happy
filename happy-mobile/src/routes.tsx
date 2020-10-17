import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const { Navigator, Screen } = createStackNavigator();

import OrphanagesMap from "./pages/OrphanagesMap";
import OrphanageDetail from "./pages/OrphanageDetails";
import OrphanageData from "./pages/CreateOrphanage/OrphanageData";
import SelectMapPosition from "./pages/CreateOrphanage/SelectMapPosition";

import Header from "./components/Header";
import InitialHeader from "./components/InitialHeader";

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Screen
          name="OrphanagesMap"
          component={OrphanagesMap}
          options={{
            headerShown: true,
            header: () => <InitialHeader />,
          }}
        />
        <Screen
          name="OrphanageDetail"
          component={OrphanageDetail}
          options={{
            headerShown: true,
            header: () => <Header showCancel={false} title="Orfanato" />,
          }}
        />
        <Screen
          name="OrphanageData"
          component={OrphanageData}
          options={{
            headerShown: true,
            header: () => <Header title="Informe os dados" />,
          }}
        />
        <Screen
          name="SelectMapPosition"
          component={SelectMapPosition}
          options={{
            headerShown: true,
            header: () => <Header title="Selecione no mapa" />,
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
