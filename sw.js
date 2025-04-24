self.addEventListener('activate', async (event) => {
    console.log('Service Worker Activated');

    // You cannot use 'new Notification' in a service worker, use 'showNotification' instead
    const options = {
        body: 'Hello from the service worker!',
        icon: 'image.jpg',  // Optional: Add an icon
        badge: 'image.jpg',        // Optional: Add a badge
    };

    // Use 'showNotification' to show the notification
    event.waitUntil(
        self.registration.showNotification('Service Worker Activated', options)
    );
});
