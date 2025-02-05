import './App.css';
import { ProductProvider } from 'products/components/ProductsProvider';
import MainNav from './layout/mainNav';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import CompanyPage from './pages/CompanyPage';
import ProductPage from './pages/ProductPage';

function App() {
    return (
    <ProductProvider>
        <div className="App">
            <MainNav />
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/category" component={CategoryPage} />
                    <Route path="/company/:companyName" component={CompanyPage} />
                    <Route path="/product" component={ProductPage} />
                </Switch>
            </Router>
        </div>
    </ProductProvider>
  );
}

export default App;
