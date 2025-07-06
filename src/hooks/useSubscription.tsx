
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface SubscriptionData {
  subscribed: boolean;
  subscription_tier?: string;
  subscription_end?: string;
}

export const useSubscription = () => {
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData>({ subscribed: false });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const checkSubscription = async () => {
    if (!user || !user.id) {
      setSubscriptionData({ subscribed: false });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        console.log('No active session');
        setSubscriptionData({ subscribed: false });
        return;
      }

      console.log('Checking subscription for user:', user.email);
      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${sessionData.session.access_token}`,
        },
      });

      if (error) {
        console.error('Error checking subscription:', error);
        setSubscriptionData({ subscribed: false });
        return;
      }

      console.log('Subscription data received:', data);
      setSubscriptionData(data || { subscribed: false });
    } catch (error) {
      console.error('Error in checkSubscription:', error);
      setSubscriptionData({ subscribed: false });
    } finally {
      setLoading(false);
    }
  };

  const createCheckout = async (planType: string = 'basic') => {
    if (!user) {
      throw new Error('User must be logged in to create checkout');
    }

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        throw new Error('No active session');
      }

      console.log('Creating checkout for plan:', planType);
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { planType },
        headers: {
          Authorization: `Bearer ${sessionData.session.access_token}`,
        },
      });

      if (error) {
        console.error('Error creating checkout:', error);
        throw new Error(`Failed to create checkout: ${error.message}`);
      }

      if (!data?.url) {
        throw new Error('No checkout URL received');
      }

      console.log('Checkout URL received:', data.url);
      // Open Stripe checkout in a new tab
      window.open(data.url, '_blank');
      return data;
    } catch (error) {
      console.error('Error in createCheckout:', error);
      throw error;
    }
  };

  const openCustomerPortal = async () => {
    if (!user) {
      throw new Error('User must be logged in to access customer portal');
    }

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        throw new Error('No active session');
      }

      console.log('Opening customer portal');
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${sessionData.session.access_token}`,
        },
      });

      if (error) {
        console.error('Error opening customer portal:', error);
        throw new Error(`Failed to open customer portal: ${error.message}`);
      }

      if (!data?.url) {
        throw new Error('No portal URL received');
      }

      console.log('Customer portal URL received:', data.url);
      // Open customer portal in a new tab
      window.open(data.url, '_blank');
      return data;
    } catch (error) {
      console.error('Error in openCustomerPortal:', error);
      throw error;
    }
  };

  useEffect(() => {
    checkSubscription();
  }, [user]);

  return {
    subscriptionData,
    loading,
    checkSubscription,
    createCheckout,
    openCustomerPortal,
  };
};
