import AuthCorner from "./authcorner";
import Navbar from "./navbar";


function SiteHeader() {
  return (
    <header className="site-header">
      <Navbar />
      <AuthCorner />
    </header>
  );
}

export default SiteHeader;