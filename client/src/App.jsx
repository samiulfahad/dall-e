import React from "react";
import { logo } from "./assets";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Home, CreatePost } from "./pages";
import PageNotFound from "./pages/PageNotFound";
import Footer from "./components/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <header className="flex justify-between items-center px-4 md:px-20 py-4 md:py=8 bg-gray-300">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>
        <Link to="/create-post" className="px-6 py-2 bg-indigo-400 rounded-lg font-bold text-white">
          Create
        </Link>
      </header>
      <main className="px-10 md:px-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;
