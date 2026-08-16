export const analytics = {
  event: (name: string, data?: Record<string, unknown>) => {
    if (typeof window !== 'undefined') {
      console.log(`[Analytics] ${name}`, data);
    }
  },
  
  pageView: (path: string) => {
    analytics.event('page_view', { path });
  },
  
  productViewed: (product: { id: string; name: string; price: number }) => {
    analytics.event('product_viewed', product);
  },
  
  productAddedToCart: (product: { id: string; name: string; price: number; quantity: number }) => {
    analytics.event('product_added_to_cart', product);
  },
  
  cartStarted: (cartValue: number, itemCount: number) => {
    analytics.event('cart_started', { cartValue, itemCount });
  },
  
  checkoutStarted: (cartValue: number) => {
    analytics.event('checkout_started', { cartValue });
  },
  
  purchaseCompleted: (orderId: string, value: number) => {
    analytics.event('purchase_completed', { orderId, value });
  },
  
  wishlistAdded: (product: { id: string; name: string }) => {
    analytics.event('wishlist_added', product);
  },
  
  quoteRequested: (data: { type: string; budget?: string }) => {
    analytics.event('quote_requested', data);
  },
  
  corporateFormSubmitted: (data: { companyName?: string; budget?: string }) => {
    analytics.event('corporate_form_submitted', data);
  },
  
  newsletterSubscribed: (email: string) => {
    analytics.event('newsletter_subscribed', { email });
  },
  
  searchPerformed: (query: string, results: number) => {
    analytics.event('search_performed', { query, results });
  },
};
