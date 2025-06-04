import { useState } from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
/* import NewCard from "./Form/NewCard/NewCard";
import EditAvatar from "./Form/EditAvatar/EditAvatar";
import EditProfile from "./Form/EditProfile/EditProfile"; */

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Main />
      <Footer />
      {/* <NewCard />
      <EditAvatar />
      <EditProfile /> */}
    </>
  );
}

export default App;
