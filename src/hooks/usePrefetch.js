import { useEffect } from 'react';

/**
 * Custom hook to prefetch routes for instant navigation
 * Prefetches on hover and during browser idle time
 */
export const usePrefetch = () => {
    useEffect(() => {
        // Prefetch critical routes during idle time
        const prefetchRoutes = () => {
            if ('requestIdleCallback' in window) {
                requestIdleCallback(() => {
                    // Prefetch most visited pages
                    import('../pages/Abonnement');
                    import('../pages/Machines');
                    import('../pages/Planning');
                });
            } else {
                // Fallback for browsers without requestIdleCallback
                setTimeout(() => {
                    import('../pages/Abonnement');
                    import('../pages/Machines');
                    import('../pages/Planning');
                }, 2000);
            }
        };

        prefetchRoutes();
    }, []);
};

/**
 * Prefetch a specific route on hover
 * @param {string} route - Route name to prefetch
 */
export const prefetchRoute = (route) => {
    const routeMap = {
        '/': () => import('../pages/Home'),
        '/abonnement': () => import('../pages/Abonnement'),
        '/machines': () => import('../pages/Machines'),
        '/planning': () => import('../pages/Planning'),
        '/contact': () => import('../pages/Contact'),
    };

    const prefetchFn = routeMap[route];
    if (prefetchFn) {
        prefetchFn();
    }
};
