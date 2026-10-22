import { Link } from "react-router-dom";
import { Copy } from "lucide-react"

const AppHeader = () => {
    return (
        <header className="py-6 border-b ">
            <div className="t-container">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Copy className="mr-2"/>
                        <span>CV-Builder</span>
                    </div>

                    <nav className="flex items-center">
                        <Link to="/" className="mr-4">Resumes</Link>
                        <Link to="/profiles">Profiles</Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default AppHeader;