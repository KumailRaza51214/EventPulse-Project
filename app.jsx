import { BrowserRouter, Routes, Route } from "react-router-dom";
/*turn on routing, container to hold all possible pages(routes) ,matching url 2 component  /*library*/ 
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Events from "./pages/Events";
import Volunteer from "./pages/Volunteer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
  <div >
    <Header />

    <div >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>

    <Footer />
  </div>
</BrowserRouter>
  );
}

export default App;
