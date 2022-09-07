import { Button } from '@mui/material';
import { Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import '../Styles/Page.css';
import PeoplePage from './PeoplePage';
import 'react-toastify/dist/ReactToastify.css';
import GroupPage from './GroupsPage';

const Main = () => {
    return (
        <>
            <div id="page">
                <div id="nav-bar">
                    <Link className="link" to="/people">
                        <Button className="link-button" variant="text">
                            People
                        </Button>
                    </Link>
                    <Link className="link" to="/groups">
                        <Button className="link-button" variant="text">
                            Groups
                        </Button>
                    </Link>
                    <hr />
                </div>
                <Routes>
                    <Route
                        path="/people"
                        element={
                            <div>
                                <PeoplePage />
                            </div>
                        }
                    />
                    <Route path="/groups" element={<GroupPage />} />
                </Routes>
            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    );
};

export default Main;
