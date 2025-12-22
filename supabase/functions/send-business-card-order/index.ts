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

    // Send email via Resend API
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "TFA Shop <onboarding@resend.dev>",
        to: ["lulloa@tfainsuranceadvisors.com"],
        subject: `New Business Card Order - ${orderData.fullName}`,
        html: emailHtml,
      }),
    });

    const emailResult = await emailResponse.json();
    
    if (!emailResponse.ok) {
      console.error("Resend API error:", emailResult);
      throw new Error(`Failed to send email: ${JSON.stringify(emailResult)}`);
    }

    console.log("Email sent successfully:", emailResult);

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
