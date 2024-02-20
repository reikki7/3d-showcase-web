import Canvas from "./canvas";
import Customizer from "./pages/Customizer";
import Home from "./pages/Home";
import backgroundVideo from "./assets/web-background.mp4";

function App() {
  return (
    <main className="overflow-auto transition-all ease-in app">
      <video autoPlay loop muted className="bg-video">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Home />
      <Canvas />
      <Customizer />
    </main>
  )
}

export default App;
