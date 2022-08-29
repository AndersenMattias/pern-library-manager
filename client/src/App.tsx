import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Footer, Header, NavBar } from './components';
import NotFound from './components/NotFound/NotFound';
import { Home, MyPage } from './pages';

function App() {
  const [val, setVal] = useState();
  const [data, setData] = useState<any>([]);

  // useEffect(() => {
  //   const onHandleSearch = async () => {
  //     const res = await fetch(
  //       `http://localhost:8000/api/books/search?title=${val}`
  //     );
  //     const json = await res.json();
  //     setData(json.data);
  //   };

  //   onHandleSearch();
  // }, [val]);

  return (
    <div className='App'>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/my-page' element={<MyPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
