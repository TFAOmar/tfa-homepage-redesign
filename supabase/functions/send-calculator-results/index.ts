import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CalculatorResultsRequest {
  email: string;
  firstName: string;
  calculatorName: string;
  pdfBase64: string;
  resultsSummary: { label: string; value: string }[];
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, firstName, calculatorName, pdfBase64, resultsSummary }: CalculatorResultsRequest = await req.json();

    console.log(`Sending ${calculatorName} results to ${email}`);

    // Build results summary HTML
    const summaryHtml = resultsSummary
      .map(
        (item) =>
          `<tr>
            <td style="padding: 8px 0; color: #666; border-bottom: 1px solid #eee;">${item.label}</td>
            <td style="padding: 8px 0; font-weight: 600; color: #0A0F1F; text-align: right; border-bottom: 1px solid #eee;">${item.value}</td>
          </tr>`
      )
      .join("");

    const emailResponse = await resend.emails.send({
      from: "The Financial Architects <leads@tfainsuranceadvisors.com>",
      to: [email],
      subject: `Your ${calculatorName} Results`,
      attachments: [
        {
          filename: `TFA-${calculatorName.replace(/\s+/g, "-")}-Results.pdf`,
          content: pdfBase64,
        },
      ],
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="background-color: #0A0F1F; padding: 30px 40px;">
                      <h1 style="margin: 0; color: #E4B548; font-size: 24px; font-weight: 700;">THE FINANCIAL ARCHITECTS</h1>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <h2 style="margin: 0 0 20px; color: #0A0F1F; font-size: 22px;">Hi ${firstName},</h2>
                      
                      <p style="margin: 0 0 25px; color: #444; font-size: 16px; line-height: 1.6;">
                        Thank you for using our <strong>${calculatorName}</strong>. Your personalized results are attached as a PDF for your records.
                      </p>
                      
                      <!-- Quick Summary Box -->
                      <div style="background-color: #FFFBEB; border-left: 4px solid #E4B548; border-radius: 4px; padding: 20px; margin-bottom: 30px;">
                        <h3 style="margin: 0 0 15px; color: #0A0F1F; font-size: 16px;">Quick Summary</h3>
                        <table width="100%" cellpadding="0" cellspacing="0">
                          ${summaryHtml}
                        </table>
                      </div>
                      
                      <!-- CTA Section -->
                      <div style="background-color: #f8f8f8; border-radius: 8px; padding: 25px; text-align: center; margin-bottom: 25px;">
                        <h3 style="margin: 0 0 10px; color: #0A0F1F; font-size: 18px;">Ready to put your plan into action?</h3>
                        <p style="margin: 0 0 20px; color: #666; font-size: 14px;">
                          Our advisors can help you create a personalized strategy to reach your financial goals.
                        </p>
                        <a href="https://tfainsuranceadvisors.com/book-consultation" style="display: inline-block; background-color: #E4B548; color: #0A0F1F; text-decoration: none; padding: 14px 30px; border-radius: 50px; font-weight: 600; font-size: 14px;">
                          Book a Free Consultation
                        </a>
                      </div>
                      
                      <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.6;">
                        Warm regards,<br>
                        <strong style="color: #0A0F1F;">The Financial Architects Team</strong>
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f8f8f8; padding: 25px 40px; border-top: 1px solid #eee;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="color: #888; font-size: 12px; line-height: 1.6;">
                            <strong style="color: #0A0F1F;">The Financial Architects</strong><br>
                            (888) 350-5396 | info@tfainsuranceadvisors.com<br>
                            13890 Peyton Dr, Chino Hills, CA 91709
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-top: 15px; color: #aaa; font-size: 11px;">
                            This email contains your calculator results. The calculations are for illustrative purposes only and do not guarantee actual results.
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-calculator-results function:", error);
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
