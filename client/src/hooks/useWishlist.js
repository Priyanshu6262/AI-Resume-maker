import { useState, useEffect } from 'react';

export const useWishlist = () => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem('resume_wishlist');
        if (stored) {
            try {
                setWishlist(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse wishlist storage", e);
            }
        }
    }, []);

    const toggleWishlist = (templateId) => {
        let newWishlist;
        if (wishlist.includes(templateId)) {
            newWishlist = wishlist.filter(id => id !== templateId);
        } else {
            newWishlist = [...wishlist, templateId];
        }
        setWishlist(newWishlist);
        localStorage.setItem('resume_wishlist', JSON.stringify(newWishlist));
    };

    const removeFromWishlist = (templateId) => {
        const newWishlist = wishlist.filter(id => id !== templateId);
        setWishlist(newWishlist);
        localStorage.setItem('resume_wishlist', JSON.stringify(newWishlist));
    };

    return { wishlist, toggleWishlist, removeFromWishlist };
};
