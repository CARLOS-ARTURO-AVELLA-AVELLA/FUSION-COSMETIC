import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Catalogo from './pages/Catalogo'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'
import ParaElla from './pages/ParaElla'
import ParaEl from './pages/ParaEl'
import OlfactiveFamilies from './pages/OlfactiveFamilies'
import Marcas from './pages/Marcas'
import Ofertas from './pages/Ofertas'
import Search from './pages/Search'
import Wishlist from './pages/Wishlist'
import Checkout from './pages/Checkout'
import CheckoutConfirmation from './pages/CheckoutConfirmation'
import Legal from './pages/Legal'
import WhatsAppButton from './components/common/WhatsAppButton'

export default function App() {
  return (
    <Router>
      <WhatsAppButton />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Catalogo />} />
          <Route path="/productos/:id" element={<ProductDetail />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/para-ella" element={<ParaElla />} />
          <Route path="/para-el" element={<ParaEl />} />
          <Route path="/familias-olfativas/:familia" element={<OlfactiveFamilies />} />
          <Route path="/marcas" element={<Marcas />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/buscar" element={<Search />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/confirmacion" element={<CheckoutConfirmation />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/legal" element={<Legal />} />
      </Routes>
      <WhatsAppButton />
    </Router>
  )
}