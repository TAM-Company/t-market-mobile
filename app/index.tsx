import { Redirect } from "expo-router";

export default function HomeRedirect() {
  // Rediriger vers la nouvelle page d'accueil dans la structure d'onglets
  return <Redirect href="/(tabs)" />;
}
