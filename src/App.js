import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import Table from "./components/pages/Table";
import Footer from "./components/views/Footer/Footer";
import Header from "./components/views/Header/Header";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchTables } from "./redux/tablesRedux";

function App() {
  const dispatch = useDispatch();

   useEffect(() => {
    dispatch(fetchTables());
  }, [dispatch]);

  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table/:id" element={<Table />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
