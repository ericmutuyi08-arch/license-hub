import { Link } from 'react-router-dom';
import { Shield, Truck, Clock, CreditCard } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t bg-muted/30">
      {/* Trust Indicators */}
      <div className="border-b">
        <div className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Secure Payments</p>
                <p className="text-xs text-muted-foreground">256-bit SSL encryption</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Instant Delivery</p>
                <p className="text-xs text-muted-foreground">Digital cards in minutes</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Truck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Physical Cards</p>
                <p className="text-xs text-muted-foreground">Free shipping on $50+</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Multiple Payments</p>
                <p className="text-xs text-muted-foreground">Cards, PayPal & more</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-display font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/catalog" className="hover:text-foreground transition-colors">All Gift Cards</Link></li>
              <li><Link to="/catalog?category=gaming" className="hover:text-foreground transition-colors">Gaming</Link></li>
              <li><Link to="/catalog?category=shopping" className="hover:text-foreground transition-colors">Shopping</Link></li>
              <li><Link to="/catalog?category=entertainment" className="hover:text-foreground transition-colors">Entertainment</Link></li>
              <li><Link to="/catalog?category=dining" className="hover:text-foreground transition-colors">Dining</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4">Account</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/account" className="hover:text-foreground transition-colors">My Account</Link></li>
              <li><Link to="/account/orders" className="hover:text-foreground transition-colors">Order History</Link></li>
              <li><Link to="/account/wallet" className="hover:text-foreground transition-colors">Digital Wallet</Link></li>
              <li><Link to="/account/wishlist" className="hover:text-foreground transition-colors">Wishlist</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/help" className="hover:text-foreground transition-colors">Help Center</Link></li>
              <li><Link to="/faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link to="/track-order" className="hover:text-foreground transition-colors">Track Order</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md gradient-primary">
              <span className="text-sm font-bold text-primary-foreground">G</span>
            </div>
            <span>© 2026 GiftCard Pro. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <img src="https://cdn.worldvectorlogo.com/logos/visa-2.svg" alt="Visa" className="h-6 opacity-60" />
            <img src="https://cdn.worldvectorlogo.com/logos/mastercard-2.svg" alt="Mastercard" className="h-6 opacity-60" />
            <img src="https://cdn.worldvectorlogo.com/logos/paypal-2.svg" alt="PayPal" className="h-6 opacity-60" />
            <img src="https://cdn.worldvectorlogo.com/logos/apple-pay.svg" alt="Apple Pay" className="h-6 opacity-60" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
