
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    // Initialize Supabase client for authentication
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get request body
    const { planType = 'basic' } = await req.json();
    logStep("Request data received", { planType });

    // Authenticate user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header provided");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data, error: authError } = await supabaseClient.auth.getUser(token);
    
    if (authError || !data.user) {
      logStep("Authentication failed", { error: authError });
      throw new Error("User not authenticated");
    }

    const user = data.user;
    if (!user.email) {
      throw new Error("User email not available");
    }

    logStep("User authenticated", { userId: user.id, email: user.email });

    // Initialize Stripe
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }

    const stripe = new Stripe(stripeKey, { 
      apiVersion: "2023-10-16",
      httpClient: Stripe.createFetchHttpClient()
    });

    // Check for existing customer
    const customers = await stripe.customers.list({ 
      email: user.email, 
      limit: 1 
    });
    
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    } else {
      logStep("Creating new customer");
    }

    // Define pricing based on plan type
    const planPricing = {
      basic: { 
        amount: 2900, 
        name: "Basic Plan - Akses Kelas Dasar",
        currency: "idr"
      },
      premium: { 
        amount: 4900, 
        name: "Premium Plan - Akses Semua Kelas",
        currency: "idr"
      },
      enterprise: { 
        amount: 9900, 
        name: "Enterprise Plan - Akses Premium + Video",
        currency: "idr"
      }
    };

    const selectedPlan = planPricing[planType as keyof typeof planPricing] || planPricing.basic;
    logStep("Selected plan", selectedPlan);

    // Get origin for redirect URLs
    const origin = req.headers.get("origin") || "https://girhdiljbvjkijiukwaa.supabase.co";
    
    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price_data: {
            currency: selectedPlan.currency,
            product_data: { 
              name: selectedPlan.name,
              description: `Berlangganan ${selectedPlan.name}`
            },
            unit_amount: selectedPlan.amount,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      payment_method_types: ['card'],
      success_url: `${origin}/classes?success=true`,
      cancel_url: `${origin}/classes?canceled=true`,
      metadata: {
        user_id: user.id,
        plan_type: planType
      }
    });

    logStep("Checkout session created", { 
      sessionId: session.id, 
      url: session.url,
      customer: session.customer 
    });

    return new Response(JSON.stringify({ 
      url: session.url,
      session_id: session.id 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-checkout", { message: errorMessage, stack: error instanceof Error ? error.stack : undefined });
    
    return new Response(JSON.stringify({ 
      error: errorMessage,
      details: "Gagal membuat sesi pembayaran. Silakan coba lagi."
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
