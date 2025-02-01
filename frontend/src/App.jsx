
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import FAQList from './components/FAQList';
import AddFAQ from './components/AddFAQ';

const App = () => {
  return (
    <BrowserRouter>

     
        <Navbar />
        <Routes>
          <Route path="/" element={<FAQList />} />
          <Route path="/add" element={<AddFAQ />} />
          {/* <Route path="/edit/:id" element={<EditFAQ />} /> */}
        </Routes>
      
    </BrowserRouter>
  );
};

export default App;