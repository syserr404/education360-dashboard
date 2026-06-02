const nodemailer = require('nodemailer');
const setCors = require('./_cors');

// ── Outlook SMTP transporter ──────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false, // STARTTLS
  auth: {
    user: process.env.SMTP_USER, // e360@xduce.com
    pass: process.env.SMTP_PASS,
  },
  tls: {
    cacheableLookup: false,
    rejectUnauthorized: true,
  },
});

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmt = (v) =>
  v >= 1000000
    ? '$' + (Math.round(v / 100000) / 10).toFixed(1) + 'M'
    : '$' + Math.round(v / 1000) + 'K';

const fmtFull = (v) => '$' + Math.round(v).toLocaleString('en-US');

// ── Build HTML email from calculator result ───────────────────────────────────
function buildEmailHtml(data) {
  const {
    districtName,
    students,
    educators,
    currentAnnualSpend,
    totalY3Spend,
    savingY3VsToday,
    spendReductionPct,
    hoursRecoveredY3,
  } = data;

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
  <meta name="color-scheme" content="light only" />
  <meta name="supported-color-schemes" content="light only" />
  <title>Your Education360 Savings Preview</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  <style type="text/css">
    body, table, td, p, a, li, blockquote { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; display: block; }
    a { text-decoration: none; }
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #F4F2EE; }
    a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }
    @media only screen and (max-width: 620px) {
      .container { width: 100% !important; max-width: 100% !important; }
      .px-mobile { padding-left: 24px !important; padding-right: 24px !important; }
      .h1-mobile { font-size: 26px !important; line-height: 1.2 !important; }
      .h2-mobile { font-size: 20px !important; line-height: 1.25 !important; }
      .stat-label-mobile { font-size: 13px !important; }
      .stat-value-mobile { font-size: 22px !important; }
      .cta-button-mobile { display: block !important; width: 100% !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#F4F2EE; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">

  <div style="display:none; font-size:1px; color:#F4F2EE; line-height:1px; max-height:0px; max-width:0px; opacity:0; overflow:hidden;">
    A directional preview of what consolidating onto one connected platform could mean for your district.
  </div>

  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#F4F2EE;">
    <tr>
      <td align="center" style="padding: 32px 12px;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" class="container" style="width:600px; max-width:600px; background-color:#FFFFFF; border-radius:8px; overflow:hidden;">

          <!-- HEADER -->
          <tr>
            <td style="background-color:#0D1B2A; padding: 36px 48px 28px 48px;" class="px-mobile">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:11px; line-height:1; letter-spacing:2px; color:#D4A017; font-weight:700; text-transform:uppercase; padding-bottom:14px;">
                    EDUCATION360
                  </td>
                </tr>
                <tr>
                  <td style="font-family: Georgia, 'Times New Roman', serif; font-size:24px; line-height:1.25; color:#FFFFFF; font-weight:400;" class="h1-mobile">
                    Your savings preview is ready.
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:18px;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                      <tr><td style="background-color:#D4A017; height:2px; width:40px; line-height:2px; font-size:0;">&nbsp;</td></tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- GREETING -->
          <tr>
            <td style="padding: 36px 48px 8px 48px;" class="px-mobile">
              <p style="margin:0 0 16px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:16px; line-height:1.55; color:#1F2937;">
                Hi there,
              </p>
              <p style="margin:0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:16px; line-height:1.6; color:#4B5563;">
                Thank you for using the Education360 District Savings Calculator. Here is a preview of what consolidating onto one connected platform could mean for your district.
              </p>
            </td>
          </tr>

          <!-- DISTRICT INFO -->
          <tr>
            <td style="padding: 32px 48px 8px 48px;" class="px-mobile">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#F8F6F1; border-radius:6px;">
                <tr>
                  <td style="padding: 18px 22px;">
                    <p style="margin:0 0 4px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:11px; line-height:1; letter-spacing:1.5px; color:#6B7280; font-weight:600; text-transform:uppercase;">
                      Your District
                    </p>
                    <p style="margin:0; font-family: Georgia, 'Times New Roman', serif; font-size:18px; line-height:1.4; color:#0D1B2A; font-weight:400;">
                      <strong>${districtName}</strong> &middot; ${Number(students).toLocaleString('en-US')} students &middot; ${Number(educators).toLocaleString('en-US')} educators &amp; staff
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- SECTION HEADING -->
          <tr>
            <td style="padding: 36px 48px 0 48px;" class="px-mobile">
              <p style="margin:0 0 6px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:11px; line-height:1; letter-spacing:2px; color:#D4A017; font-weight:700; text-transform:uppercase;">
                The Picture in Three Years
              </p>
              <h2 style="margin:0 0 20px 0; font-family: Georgia, 'Times New Roman', serif; font-size:22px; line-height:1.3; color:#0D1B2A; font-weight:400;" class="h2-mobile">
                Where the model says your district could land.
              </h2>
            </td>
          </tr>

          <!-- SAVINGS TABLE -->
          <tr>
            <td style="padding: 0 48px;" class="px-mobile">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #E5E7EB; border-radius:6px;">
                <!-- ROW 1 -->
                <tr>
                  <td style="padding: 16px 22px; border-bottom:1px solid #E5E7EB;">
                    <p style="margin:0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:14px; line-height:1.4; color:#4B5563;" class="stat-label-mobile">
                      Annual technology spend today
                    </p>
                  </td>
                  <td align="right" style="padding: 16px 22px; border-bottom:1px solid #E5E7EB;">
                    <p style="margin:0; font-family: Georgia, 'Times New Roman', serif; font-size:20px; line-height:1.2; color:#0D1B2A; font-weight:700; white-space:nowrap;" class="stat-value-mobile">
                      ${fmtFull(currentAnnualSpend)}
                    </p>
                  </td>
                </tr>
                <!-- ROW 2 -->
                <tr>
                  <td style="padding: 16px 22px; border-bottom:1px solid #E5E7EB;">
                    <p style="margin:0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:14px; line-height:1.4; color:#4B5563;" class="stat-label-mobile">
                      Projected annual spend by Year 3
                    </p>
                  </td>
                  <td align="right" style="padding: 16px 22px; border-bottom:1px solid #E5E7EB;">
                    <p style="margin:0; font-family: Georgia, 'Times New Roman', serif; font-size:20px; line-height:1.2; color:#0D1B2A; font-weight:700; white-space:nowrap;" class="stat-value-mobile">
                      ${fmtFull(totalY3Spend)}
                    </p>
                  </td>
                </tr>
                <!-- ROW 3 — HIGHLIGHTED -->
                <tr>
                  <td style="padding: 18px 22px; border-bottom:1px solid #E5E7EB; background-color:#FFFBEF;">
                    <p style="margin:0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:14px; line-height:1.4; color:#0D1B2A; font-weight:600;" class="stat-label-mobile">
                      Annual saving by Year 3
                    </p>
                  </td>
                  <td align="right" style="padding: 18px 22px; border-bottom:1px solid #E5E7EB; background-color:#FFFBEF;">
                    <p style="margin:0; font-family: Georgia, 'Times New Roman', serif; font-size:22px; line-height:1.2; color:#D4A017; font-weight:700; white-space:nowrap;" class="stat-value-mobile">
                      ${fmtFull(savingY3VsToday)}
                    </p>
                  </td>
                </tr>
                <!-- ROW 4 -->
                <tr>
                  <td style="padding: 16px 22px;">
                    <p style="margin:0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:14px; line-height:1.4; color:#4B5563;" class="stat-label-mobile">
                      Educator hours recovered weekly
                    </p>
                  </td>
                  <td align="right" style="padding: 16px 22px;">
                    <p style="margin:0; font-family: Georgia, 'Times New Roman', serif; font-size:20px; line-height:1.2; color:#0D1B2A; font-weight:700; white-space:nowrap;" class="stat-value-mobile">
                      ${Number(hoursRecoveredY3).toLocaleString('en-US')}+
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- SUMMARY LINE -->
          <tr>
            <td style="padding: 20px 48px 0 48px;" class="px-mobile">
              <p style="margin:0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:15px; line-height:1.6; color:#1F2937;">
                By Year 3, your district could see an estimated <strong style="color:#0D1B2A;">${spendReductionPct}% reduction</strong> in annual technology spend — and meaningful time returned to classrooms.
              </p>
            </td>
          </tr>

          <!-- DIVIDER -->
          <tr>
            <td style="padding: 36px 48px 0 48px;" class="px-mobile">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr><td style="border-top:1px solid #E5E7EB; height:1px; line-height:1px; font-size:0;">&nbsp;</td></tr>
              </table>
            </td>
          </tr>

          <!-- CTA SECTION -->
          <tr>
            <td style="padding: 36px 48px 8px 48px;" class="px-mobile">
              <p style="margin:0 0 6px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:11px; line-height:1; letter-spacing:2px; color:#D4A017; font-weight:700; text-transform:uppercase;">
                Your Next Step
              </p>
              <h2 style="margin:0 0 18px 0; font-family: Georgia, 'Times New Roman', serif; font-size:24px; line-height:1.25; color:#0D1B2A; font-weight:400;" class="h1-mobile">
                You took the first step. The next one is short.
              </h2>
              <p style="margin:0 0 14px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:16px; line-height:1.6; color:#4B5563;">
                Calculators give you a number. A 90-minute conversation gives you a plan.
              </p>
              <p style="margin:0 0 14px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:16px; line-height:1.6; color:#4B5563;">
                Bring your team. We bring the questions. You leave with a one-page picture of your district's technology landscape and a recommended first move — yours to keep, whether or not it involves us.
              </p>
              <p style="margin:0 0 24px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:14px; line-height:1.5; color:#0D1B2A; font-weight:600;">
                No cost. No pitch. No commitment.
              </p>
            </td>
          </tr>

          <!-- BUTTON -->
          <tr>
            <td style="padding: 0 48px 40px 48px;" class="px-mobile">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="background-color:#D4A017; border-radius:4px;">
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="#" style="height:52px;v-text-anchor:middle;width:280px;" arcsize="8%" stroke="f" fillcolor="#D4A017">
                      <w:anchorlock/>
                      <center style="color:#0D1B2A;font-family:Helvetica,Arial,sans-serif;font-size:15px;font-weight:bold;letter-spacing:0.5px;">Book your 90-minute workshop &rarr;</center>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-->
                    <a href="#" target="_blank" class="cta-button-mobile" style="display:inline-block; padding:16px 32px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:15px; line-height:1; color:#0D1B2A; font-weight:700; letter-spacing:0.3px; text-decoration:none; border-radius:4px; background-color:#D4A017;">
                      Book your 90-minute workshop &rarr;
                    </a>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- DELIVERABILITY NOTE -->
          <tr>
            <td style="padding: 0 48px 32px 48px;" class="px-mobile">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr><td style="border-top:1px solid #E5E7EB; height:1px; line-height:1px; font-size:0;">&nbsp;</td></tr>
              </table>
              <p style="margin:24px 0 12px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:14px; line-height:1.6; color:#6B7280;">
                Add <a href="mailto:e360@xduce.com" style="color:#0D1B2A; font-weight:600; text-decoration:underline;">e360@xduce.com</a> to your safe sender list so future updates from us reach your inbox.
              </p>
              <p style="margin:0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:14px; line-height:1.6; color:#6B7280;">
                Questions? Just reply to this email. A real person will respond.
              </p>
            </td>
          </tr>

          <!-- SIGNATURE -->
          <tr>
            <td style="padding: 0 48px 40px 48px;" class="px-mobile">
              <p style="margin:0 0 6px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:15px; line-height:1.5; color:#1F2937;">Warm regards,</p>
              <p style="margin:0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:15px; line-height:1.5; color:#0D1B2A; font-weight:700;">The Education360 Team</p>
              <p style="margin:0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:14px; line-height:1.5; color:#6B7280; font-style:italic;">XDuce Public Services</p>
            </td>
          </tr>

          <!-- BRAND STRIP -->
          <tr>
            <td style="background-color:#0D1B2A; padding: 28px 48px;" class="px-mobile">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <p style="margin:0 0 8px 0; font-family: Georgia, 'Times New Roman', serif; font-size:14px; line-height:1.5; color:#FFFFFF; font-style:italic;">
                      Committed to what happens next for your students.
                    </p>
                    <p style="margin:0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:11px; line-height:1; letter-spacing:2px; color:#D4A017; font-weight:700; text-transform:uppercase;">
                      EDUCATION360 &nbsp;&middot;&nbsp; xducepublicservices.com
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- LEGAL -->
          <tr>
            <td style="background-color:#F4F2EE; padding: 24px 48px 20px 48px;" class="px-mobile">
              <p style="margin:0 0 10px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:10px; line-height:1; letter-spacing:1.5px; color:#6B7280; font-weight:700; text-transform:uppercase;">About This Estimate</p>
              <p style="margin:0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:11px; line-height:1.65; color:#6B7280;">
                The figures in this email are an illustrative projection generated from publicly available industry benchmarks and the inputs you provided. They are not a quote, proposal, offer, or commitment of any kind. Actual pricing, savings, scope, and outcomes vary by district based on existing contracts, module selection, integration requirements, implementation timeline, and other factors. Education360 licensing is structured per district based on selected modules, deployment scope, and institutional needs. Nothing in this email creates an obligation, express or implied, on the part of XDuce Public Services, LLC to provide services at any specific price. All commercial terms are governed by a separately negotiated written agreement.
              </p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color:#F4F2EE; padding: 12px 48px 28px 48px;" class="px-mobile">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr><td style="border-top:1px solid #E5E7EB; height:1px; line-height:1px; font-size:0;">&nbsp;</td></tr>
              </table>
              <p style="margin:18px 0 6px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:11px; line-height:1.5; color:#9CA3AF;">
                XDuce Public Services, LLC &middot; 510 Thornall Street, Suite 375, Edison, NJ 08837
              </p>
              <p style="margin:0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:11px; line-height:1.5; color:#9CA3AF;">
                You received this email because you used the Education360 District Savings Calculator.
                <a href="#" style="color:#6B7280; text-decoration:underline;">Unsubscribe</a> &middot;
                <a href="#" style="color:#6B7280; text-decoration:underline;">Privacy</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ── Handler ───────────────────────────────────────────────────────────────────
module.exports = async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { recipientEmail, data } = req.body;

  if (!recipientEmail || !data) {
    return res.status(400).json({ error: 'Missing recipientEmail or data' });
  }

  const html = buildEmailHtml(data);

  const mailOptions = {
    from: `"Education360" <${process.env.SMTP_USER}>`,
    to: recipientEmail,
    bcc: process.env.SMTP_USER, // e360@xduce.com receives BCC of every send
    subject: `Your Education360 Savings Preview — ${data.districtName}`,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Email send error:', err);
    return res.status(500).json({ error: 'Failed to send email', detail: err.message });
  }
};
