import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Admin from '@/components/Admin';
export const metadata={title:'Administration',robots:{index:false,follow:false}};
export default function Page(){return <><Nav/><main id="main"><Admin/></main><Footer/></>}
