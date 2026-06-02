import { useState } from 'react';

export default function TopNavBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="top-nav-bar">
            <div className="menu-icon" onClick={toggleMenu}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    width="24px"
                    height="24px"
                >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                </svg>
            </div>
            {/* Optionally, you can add a menu that slides in/out based on `isOpen` state */}
            {/* {isOpen && (
                <div className="dropdown-menu">
                    <ul>
                        <li>Menu Item 1</li>
                        <li>Menu Item 2</li>
                        <li>Menu Item 3</li>
                    </ul>
                </div>
            )} */}
            <div className="nav-title item-justified item-center">Embedded Software Testing</div>
        </nav>
    );
}
