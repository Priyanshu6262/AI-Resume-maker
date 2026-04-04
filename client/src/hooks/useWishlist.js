import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export const useWishlist = () => {
    const { user, setWishlist: setContextWishlist } = useAuth();
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        if (user && user.wishlist) {
            setWishlist(user.wishlist);
        } else {
            setWishlist([]);
        }
    }, [user]);

    const toggleWishlist = async (templateId) => {
        if (!user) {
            toast.error("Please login to add templates to wishlist");
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.post(
                'http://localhost:5000/api/auth/wishlist/toggle',
                { templateId },
                config
            );

            setWishlist(data.wishlist);
            setContextWishlist(data.wishlist);
            
            const isAdded = data.wishlist.includes(templateId);
            toast.success(isAdded ? "Added to wishlist" : "Removed from wishlist");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update wishlist");
        }
    };

    const removeFromWishlist = async (templateId) => {
        await toggleWishlist(templateId);
    };

    return { wishlist, toggleWishlist, removeFromWishlist };
};
