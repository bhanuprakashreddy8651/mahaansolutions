import Link from 'next/link';
import { Mark } from './Nav';
export default function Footer(){return <footer><div className="footer-top"><Link href="/" className="brand"><Mark/></Link><p>Your Vision. Our Solutions.</p><a href="#main" className="back-top">Back to top ↑</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Mahaan Solutions Private Limited</span><span className="footer-legal"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/admin">Admin</Link></span><span>Thoughtfully built. Always evolving.</span></div></footer>}
