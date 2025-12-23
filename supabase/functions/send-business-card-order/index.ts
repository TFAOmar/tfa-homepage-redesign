import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BusinessCardOrderRequest {
  // Business card details
  fullName: string;
  jobTitle: string;
  phoneNumber: string;
  emailAddress: string;
  website?: string;
  companyAddress?: string;
  specialInstructions?: string;
  headshotUrl?: string;
  headshotFileName?: string;
  // Order details
  productTitle: string;
  variantTitle: string;
  price: string;
  currencyCode: string;
  quantity: number;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const orderData: BusinessCardOrderRequest = await req.json();
    
    console.log("Received business card order:", {
      fullName: orderData.fullName,
      productTitle: orderData.productTitle,
      variantTitle: orderData.variantTitle,
    });

    const totalPrice = (parseFloat(orderData.price) * orderData.quantity).toFixed(2);

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Business Card Order</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%);
              color: white;
              padding: 30px;
              border-radius: 12px 12px 0 0;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
            }
            .content {
              background: #f8f9fa;
              padding: 30px;
              border: 1px solid #e9ecef;
              border-top: none;
              border-radius: 0 0 12px 12px;
            }
            .section {
              background: white;
              padding: 20px;
              border-radius: 8px;
              margin-bottom: 20px;
              border: 1px solid #e9ecef;
            }
            .section-title {
              font-size: 16px;
              font-weight: 600;
              color: #1a365d;
              margin: 0 0 15px 0;
              padding-bottom: 10px;
              border-bottom: 2px solid #c9a962;
            }
            .detail-row {
              display: flex;
              padding: 8px 0;
              border-bottom: 1px solid #f0f0f0;
            }
            .detail-row:last-child {
              border-bottom: none;
            }
            .detail-label {
              font-weight: 500;
              color: #666;
              width: 140px;
              flex-shrink: 0;
            }
            .detail-value {
              color: #333;
            }
            .price-highlight {
              font-size: 24px;
              font-weight: bold;
              color: #c9a962;
            }
            .headshot-link {
              display: inline-block;
              background: #c9a962;
              color: white;
              padding: 10px 20px;
              border-radius: 6px;
              text-decoration: none;
              font-weight: 500;
            }
            .headshot-link:hover {
              background: #b8923f;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎴 New Business Card Order</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">The Financial Architects</p>
          </div>
          
          <div class="content">
            <div class="section">
              <h2 class="section-title">📦 Order Details</h2>
              <div class="detail-row">
                <span class="detail-label">Product:</span>
                <span class="detail-value">${orderData.productTitle}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Package:</span>
                <span class="detail-value">${orderData.variantTitle}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Quantity:</span>
                <span class="detail-value">${orderData.quantity}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Unit Price:</span>
                <span class="detail-value">${orderData.currencyCode} $${parseFloat(orderData.price).toFixed(2)}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Total:</span>
                <span class="detail-value price-highlight">${orderData.currencyCode} $${totalPrice}</span>
              </div>
            </div>
            
            <div class="section">
              <h2 class="section-title">👤 Customer Information</h2>
              <div class="detail-row">
                <span class="detail-label">Full Name:</span>
                <span class="detail-value"><strong>${orderData.fullName}</strong></span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Job Title:</span>
                <span class="detail-value">${orderData.jobTitle}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Phone:</span>
                <span class="detail-value">${orderData.phoneNumber}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span class="detail-value">${orderData.emailAddress}</span>
              </div>
              ${orderData.website ? `
              <div class="detail-row">
                <span class="detail-label">Website:</span>
                <span class="detail-value"><a href="${orderData.website}" target="_blank">${orderData.website}</a></span>
              </div>
              ` : ''}
            </div>
            
            ${orderData.companyAddress ? `
            <div class="section">
              <h2 class="section-title">🏢 Company Address</h2>
              <p style="white-space: pre-line; margin: 0;">${orderData.companyAddress}</p>
            </div>
            ` : ''}
            
            ${orderData.specialInstructions ? `
            <div class="section">
              <h2 class="section-title">📝 Special Instructions</h2>
              <p style="white-space: pre-line; margin: 0;">${orderData.specialInstructions}</p>
            </div>
            ` : ''}
            
            ${orderData.headshotUrl ? `
            <div class="section">
              <h2 class="section-title">📷 Headshot Photo</h2>
              <p style="margin-bottom: 15px;">File: ${orderData.headshotFileName || 'Uploaded image'}</p>
              <a href="${orderData.headshotUrl}" target="_blank" class="headshot-link">
                View/Download Headshot
              </a>
            </div>
            ` : `
            <div class="section">
              <h2 class="section-title">📷 Headshot Photo</h2>
              <p style="color: #999; font-style: italic;">No headshot uploaded</p>
            </div>
            `}
            
            <div class="footer">
              <p>This order notification was sent from The Financial Architects Shop</p>
              <p>Customer will complete payment through Shopify checkout</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Customer confirmation email HTML
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Order Confirmation - TFA Business Cards</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%);
              color: white;
              padding: 30px;
              border-radius: 12px 12px 0 0;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
            }
            .content {
              background: #f8f9fa;
              padding: 30px;
              border: 1px solid #e9ecef;
              border-top: none;
              border-radius: 0 0 12px 12px;
            }
            .thank-you {
              background: white;
              padding: 25px;
              border-radius: 8px;
              margin-bottom: 20px;
              border: 1px solid #e9ecef;
              text-align: center;
            }
            .thank-you h2 {
              color: #1a365d;
              margin: 0 0 10px 0;
            }
            .section {
              background: white;
              padding: 20px;
              border-radius: 8px;
              margin-bottom: 20px;
              border: 1px solid #e9ecef;
            }
            .section-title {
              font-size: 16px;
              font-weight: 600;
              color: #1a365d;
              margin: 0 0 15px 0;
              padding-bottom: 10px;
              border-bottom: 2px solid #c9a962;
            }
            .detail-row {
              display: flex;
              padding: 8px 0;
              border-bottom: 1px solid #f0f0f0;
            }
            .detail-row:last-child {
              border-bottom: none;
            }
            .detail-label {
              font-weight: 500;
              color: #666;
              width: 140px;
              flex-shrink: 0;
            }
            .detail-value {
              color: #333;
            }
            .price-highlight {
              font-size: 20px;
              font-weight: bold;
              color: #c9a962;
            }
            .next-steps {
              background: #e8f4f8;
              padding: 20px;
              border-radius: 8px;
              margin-bottom: 20px;
              border-left: 4px solid #1a365d;
            }
            .next-steps h3 {
              color: #1a365d;
              margin: 0 0 10px 0;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              color: #666;
              font-size: 12px;
            }
            .contact-info {
              background: #1a365d;
              color: white;
              padding: 20px;
              border-radius: 8px;
              text-align: center;
            }
            .contact-info a {
              color: #c9a962;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>✅ Order Confirmation</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">The Financial Architects</p>
          </div>
          
          <div class="content">
            <div class="thank-you">
              <h2>Thank You, ${orderData.fullName}!</h2>
              <p style="margin: 0; color: #666;">We've received your business card order and will begin processing it shortly.</p>
            </div>
            
            <div class="section">
              <h2 class="section-title">📦 Your Order Summary</h2>
              <div class="detail-row">
                <span class="detail-label">Product:</span>
                <span class="detail-value">${orderData.productTitle}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Package:</span>
                <span class="detail-value">${orderData.variantTitle}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Quantity:</span>
                <span class="detail-value">${orderData.quantity}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Total:</span>
                <span class="detail-value price-highlight">${orderData.currencyCode} $${totalPrice}</span>
              </div>
            </div>
            
            <div class="section">
              <h2 class="section-title">👤 Your Business Card Details</h2>
              <p style="color: #666; margin: 0 0 15px 0; font-size: 14px;">Please verify the information below is correct:</p>
              <div class="detail-row">
                <span class="detail-label">Name:</span>
                <span class="detail-value"><strong>${orderData.fullName}</strong></span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Title:</span>
                <span class="detail-value">${orderData.jobTitle}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Phone:</span>
                <span class="detail-value">${orderData.phoneNumber}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span class="detail-value">${orderData.emailAddress}</span>
              </div>
              ${orderData.website ? `
              <div class="detail-row">
                <span class="detail-label">Website:</span>
                <span class="detail-value">${orderData.website}</span>
              </div>
              ` : ''}
              ${orderData.companyAddress ? `
              <div class="detail-row">
                <span class="detail-label">Address:</span>
                <span class="detail-value">${orderData.companyAddress.replace(/\n/g, '<br>')}</span>
              </div>
              ` : ''}
              <div class="detail-row">
                <span class="detail-label">Headshot:</span>
                <span class="detail-value">${orderData.headshotUrl ? '✅ Uploaded' : '❌ Not provided'}</span>
              </div>
              ${orderData.specialInstructions ? `
              <div class="detail-row">
                <span class="detail-label">Special Notes:</span>
                <span class="detail-value">${orderData.specialInstructions}</span>
              </div>
              ` : ''}
            </div>
            
            <div class="next-steps">
              <h3>What Happens Next?</h3>
              <p style="margin: 0;">Our team will review your order and create a proof for your approval. You'll receive an email with your business card design within 2-3 business days. If we need any additional information, we'll reach out to you directly.</p>
            </div>
            
            <div class="contact-info">
              <p style="margin: 0 0 10px 0;"><strong>Questions about your order?</strong></p>
              <p style="margin: 0;">Email us at <a href="mailto:orders@tfainsuranceadvisors.com">orders@tfainsuranceadvisors.com</a></p>
            </div>
            
            <div class="footer">
              <p>The Financial Architects | Professional Business Cards</p>
              <p>This is an automated confirmation email. Please do not reply directly to this message.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send internal notification email
    const internalEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "TFA Shop <onboarding@resend.dev>",
        to: ["orders@tfainsuranceadvisors.com"],
        subject: `New Business Card Order - ${orderData.fullName}`,
        html: emailHtml,
      }),
    });

    const internalEmailResult = await internalEmailResponse.json();
    
    if (!internalEmailResponse.ok) {
      console.error("Resend API error (internal):", internalEmailResult);
      throw new Error(`Failed to send internal email: ${JSON.stringify(internalEmailResult)}`);
    }

    console.log("Internal notification sent:", internalEmailResult);

    // Send customer confirmation email
    const customerEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "TFA Shop <onboarding@resend.dev>",
        to: [orderData.emailAddress],
        subject: `Order Confirmation - TFA Custom Business Cards`,
        html: customerEmailHtml,
      }),
    });

    const customerEmailResult = await customerEmailResponse.json();
    
    if (!customerEmailResponse.ok) {
      console.error("Resend API error (customer):", customerEmailResult);
      // Don't throw - internal notification was sent, just log the customer email failure
      console.error("Customer confirmation email failed, but internal notification was sent");
    } else {
      console.log("Customer confirmation sent:", customerEmailResult);
    }

    const emailResult = { internal: internalEmailResult, customer: customerEmailResult };

    return new Response(JSON.stringify({ success: true, emailResult }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-business-card-order function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
