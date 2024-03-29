  import Header from './components/Header'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route,  Switch,} from "react-router-dom";
import Home from './pages/Home';

import Footer from './components/Footer';
import Authors from './pages/Authors';
import Author from './pages/Author';
import Categories from './pages/Categories';
import SearchResult from './pages/SearchResult';
import BookSingle from './pages/BookSingle';
import BookMark from './pages/BookMark';
import PreOrder from './pages/PreOrder';
import Cart from './pages/Cart';
import AllOrder from './pages/AllOrder';
import OrderDownload from './pages/OrderDownload';
import About from './pages/About';
import AddAddress from './pages/Address';
import Address from './pages/AddAddress';
import Blog from './pages/BookTalk';
import BookTalks from './pages/BookTalks';
import Confirm from './pages/Confirm';
import EditAddress from './pages/EditAdress';
import Dashboard from './pages/Dashboard'
import OrderConfirm from './pages/OrderConfirm'
import OfferZone from './pages/OfferZone';
import NoSearchResult from './pages/NoSearchResult';
import Error from './pages/Error';
import JustArrived from './pages/JustArrived';
import BestSeller from './pages/BestSeller';
import Classic from './pages/Classic';
import ScrollToTop from './components/ScrollToTop';
import AdminCategories from './admin/Categories'
import AddBook from './admin/AddBook';
import BookList from './pages/BookList';
import BookOfMonth from './admin/BookOfMonth';
import AuthorOfMonth from './admin/AuthorOfMonth';
import Oreders from './admin/Orders';
import Malayalam from './pages/Malaylam';
import AdminAuthors from './admin/Authors';
import BookTalk from './admin/bookTalk';
import OfferZoneAdmin from './admin/offerZone'
import Login from './admin/Login';
import CategoryItems from './admin/CategoryItems' 
import BookView from './admin/ViewBook';
import Banners from './admin/Banners';
import AuthorView from './admin/AuthorView';
import ViewOrder from './admin/ViewOrder';
import OfferzoneView from './admin/OfferzoneView';
import ProductDash from './admin/ProductDash';
import PreBook from './admin/Prebook';
import PreBookView from './admin/PreBookView';
function App() {
  return (
    <div className="App">
   
    <Router>
   
    <ScrollToTop/>
    {/* <Header/> */}
    <Switch>
    <Route path='/admin/offerzoneview/:id'>
      <OfferzoneView/>
      </Route>
      <Route path='/admin/prebookview/:id'>
      <PreBookView/>
      </Route>
      <Route path='/admin/prebook'>
      <PreBook/>
      </Route>
      <Route path='/admin/productdash'>
      <ProductDash/>
      </Route>
      <Route path='/admin/bookofmonth'>
      <BookOfMonth/>
      </Route>
      <Route path='/admin/vieworder/:id'>
      <ViewOrder/>
      </Route>
      <Route path='/admin/author/:id'>
      <AuthorView/>
      </Route>
      <Route path='/admin/banners'>
      <Banners/>
      </Route>
      <Route path='/admin@olive'>
      <Login/>
      </Route>
      <Route path='/admin/offerzone'>
      <OfferZoneAdmin/>
      </Route>
      <Route path='/admin/bookView/:id'>
      <BookView/>
      </Route>
      <Route path='/admin/categoryItems/:id'>
      <CategoryItems/>
      </Route>
      <Route path='/admin/authors'>
      <AdminAuthors/>
      </Route>
      <Route path='/admin/bookTalk'>
      <BookTalk/>
      </Route>
      <Route path='/admin/orders'>
      <Oreders/>
      </Route>
      <Route path='/admin/authorofmonth'>
      <AuthorOfMonth/>
      </Route>
    <Route path='/admin/categories'>
      <AdminCategories/>
      </Route>
      <Route path='/admin/addbook'>
      <AddBook/>
      </Route>
    <Route path='/classic'>
      <Classic />
      </Route>
      <Route exact path='/books/:id'>
      <BookList />
      </Route>
    <Route path='/bestSeller'>
      <BestSeller />
      </Route>
      <Route path='/malayalam'>
      <Malayalam />
      </Route>
    <Route path='/justArrived'>
      <JustArrived />
      </Route>
    <Route path='/error'>
      <Error />
      </Route>
    <Route path='/no-result'>
      <NoSearchResult/>
      </Route>
    <Route path='/offerZone'>
      <OfferZone/>
      </Route>
    <Route path='/orderConfirm'>
      <OrderConfirm/>
      </Route>
    <Route path='/dashboard'>
      <Dashboard/>
      </Route>
    <Route path='/editAddress'>
      <EditAddress/>
      </Route>
    <Route path='/confirm'>
      <Confirm/>
      </Route>
    <Route path='/bookTalks'>
      <BookTalks/>
      </Route>
    <Route path='/booktalk/:id'>
      <Blog/>
      </Route>
    <Route path='/addAddress'>
      <Address/>
      </Route>
    <Route path='/address'>
      <AddAddress/>
      </Route>
    <Route path='/about'>
      <About/>
      </Route>
    <Route path='/orderdownload/:id'>
      <OrderDownload/>
      </Route>
    <Route path='/allorder'>
      <AllOrder/>
      </Route>
    <Route path='/bookmark'>
      <BookMark/>
      </Route>
      <Route path='/cart'>
      <Cart/>
      </Route>
      <Route path='/preorder'>
      <PreOrder/>
      </Route>
    <Route exact path='/book/:id'>
      <BookSingle/>
      </Route>
    <Route path='/categories'>
      <Categories/>
      </Route>
      <Route path='/search'>
      <SearchResult/>
      </Route>
    <Route path='/authors'>
      <Authors/>
      </Route>
      <Route path='/author/:id'>
      <Author/>
      </Route>
      <Route path='/'>
      <Home/>
      </Route>
    </Switch>
 
 {/* <Footer/> */}
    </Router>
    </div>
  );
}

export default App;
