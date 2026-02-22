import { createContext, useState, useContext } from 'react';

const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {
    const [title, setTitle] = useState('ResumeAI');
    const [actions, setActions] = useState(null); // Keep for direct navbar buttons if needed
    const [dropdownItems, setDropdownItems] = useState([]); // For Profile Dropdown items

    return (
        <NavbarContext.Provider value={{ title, setTitle, actions, setActions, dropdownItems, setDropdownItems }}>
            {children}
        </NavbarContext.Provider>
    );
};

export const useNavbar = () => useContext(NavbarContext);
