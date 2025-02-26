import './App.css';
import { ProductProvider } from 'products/components/ProductsProvider';
import MainNav from './layout/mainNav';
import { BrowserRouter as Router, Link, Route, Switch, useHistory } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import CompanyPage from './pages/CompanyPage';
import ProductPage from './pages/ProductPage';
import ResultsPage from './pages/ResultsPage';
import ScrollToTop from './layout/ScrollToTop';
import Footer from './layout/Footer';
import lang from './language/he';
import Sales from './layout/Sales';
import SalesPage from './pages/SalesPage';


function App() {
    const history = useHistory();
    return (
        <ProductProvider>
            <div className="App">
                <div className="content">
                    <Router>
                        <ScrollToTop />
                        <MainNav />
                        <Switch>
                            <Route exact path="/" component={HomePage} />
                            <Route exact path="/category/:categoryName" component={CategoryPage} />
                            <Route exact path="/category/:categoryName/sub/:subName" component={CategoryPage} />
                            <Route exact path="/company/:companyName" component={CompanyPage} />
                            <Route exact path="/company/:companyName/:categoryName" component={CategoryPage} />
                            <Route exact path="/category/:categoryName/:productId" component={ProductPage} />
                            <Route exact path="/company/:companyName/:categoryName/:productId" component={ProductPage} />
                            <Route exact path="/results/:term" component={ResultsPage} />
                            <Route exact path="/sales" component={SalesPage} />
                        </Switch>
                    </Router>
                </div>
                <Footer />
            </div>
           
        </ProductProvider>
    );
}

export default App;
