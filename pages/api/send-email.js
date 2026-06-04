import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: { rejectUnauthorized: true },
});

function fmtFull(v) {
  return '$' + Math.round(v).toLocaleString('en-US');
}

function buildEmailHtml(data) {
  const {
    firstName,
    districtName, students, educators,
    currentAnnualSpend, totalY3Spend,
    savingY3VsToday, spendReductionPct, hoursRecoveredY3,
  } = data;

  const greeting = firstName ? `Hi <strong>${firstName}</strong>,` : 'Hi there,';

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="color-scheme" content="light only" />
  <title>Your Education360 Savings Preview</title>
  <style type="text/css">
    body,table,td,p,a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table,td { mso-table-lspace:0pt; mso-table-rspace:0pt; border-collapse:collapse; }
    img { border:0; outline:none; text-decoration:none; display:block; }
    a { text-decoration:none; }
    body { margin:0!important; padding:0!important; width:100%!important; background-color:#F0EEE9; }
    @media only screen and (max-width:620px) {
      .container { width:100%!important; max-width:100%!important; }
      .px-mobile { padding-left:24px!important; padding-right:24px!important; }
      .h1-mobile { font-size:26px!important; }
      .stat-value-mobile { font-size:20px!important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#F0EEE9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="display:none;font-size:1px;color:#F0EEE9;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
    A directional preview of what consolidating onto one connected platform could mean for your district.
  </div>
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#F0EEE9;">
    <tr><td align="center" style="padding:32px 12px;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" class="container"
        style="width:600px;max-width:600px;background-color:#FFFFFF;border-radius:4px;overflow:hidden;">

        <!-- HEADER -->
        <tr><td style="background-color:#0D1B2A;padding:40px 48px 32px 48px;" class="px-mobile">
          <!-- Logo row -->
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="padding-bottom:20px;">
                <img src="https://education360-dashboard.vercel.app/assets/education-360-logo.png"
                  alt="Education360" width="160" height="43"
                  style="display:block;border:0;outline:none;text-decoration:none;" />
              </td>
            </tr>
            <tr>
              <td style="font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1.2;color:#FFFFFF;font-weight:400;padding-bottom:20px;" class="h1-mobile">
                Your savings preview is ready.
              </td>
            </tr>
            <tr>
              <td>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                  <tr><td style="background-color:#C9A84C;height:2px;width:48px;line-height:2px;font-size:0;">&nbsp;</td></tr>
                </table>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- GREETING -->
        <tr><td style="padding:40px 48px 0 48px;background-color:#FFFFFF;" class="px-mobile">
          <p style="margin:0 0 16px 0;font-size:16px;line-height:1.55;color:#111827;">${greeting}</p>
          <p style="margin:0;font-size:16px;line-height:1.65;color:#374151;">Thank you for using the Education360 District Savings Calculator. Here is a preview of what consolidating onto one connected platform could mean for your district.</p>
        </td></tr>

        <!-- DISTRICT STRIP -->
        <tr><td style="padding:32px 48px 0 48px;background-color:#FFFFFF;" class="px-mobile">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#F5F3EE;border-radius:4px;">
            <tr><td style="padding:20px 24px;">
              <p style="margin:0 0 6px 0;font-size:10px;letter-spacing:2px;color:#9CA3AF;font-weight:700;text-transform:uppercase;">Your District</p>
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:17px;line-height:1.5;color:#0D1B2A;">
                <strong>${districtName}</strong> &middot; ${Number(students).toLocaleString('en-US')} students &middot; ${Number(educators).toLocaleString('en-US')} educators &amp; staff
              </p>
            </td></tr>
          </table>
        </td></tr>

        <!-- SECTION HEADING -->
        <tr><td style="padding:40px 48px 16px 48px;background-color:#FFFFFF;" class="px-mobile">
          <p style="margin:0 0 8px 0;font-size:10px;letter-spacing:2px;color:#C9A84C;font-weight:700;text-transform:uppercase;">The Picture in Three Years</p>
          <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:1.3;color:#0D1B2A;font-weight:400;">Where the model says your district could land.</p>
        </td></tr>

        <!-- SAVINGS TABLE -->
        <tr><td style="padding:0 48px;background-color:#FFFFFF;" class="px-mobile">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #E5E7EB;border-radius:4px;">
            <tr>
              <td style="padding:16px 20px;border-bottom:1px solid #E5E7EB;">
                <p style="margin:0;font-size:14px;color:#6B7280;">Annual technology spend today</p>
              </td>
              <td align="right" style="padding:16px 20px;border-bottom:1px solid #E5E7EB;white-space:nowrap;">
                <p style="margin:0;font-family:Georgia,serif;font-size:18px;color:#111827;font-weight:700;" class="stat-value-mobile">${fmtFull(currentAnnualSpend)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 20px;border-bottom:1px solid #E5E7EB;">
                <p style="margin:0;font-size:14px;color:#6B7280;">Projected annual spend by Year 3</p>
              </td>
              <td align="right" style="padding:16px 20px;border-bottom:1px solid #E5E7EB;white-space:nowrap;">
                <p style="margin:0;font-family:Georgia,serif;font-size:18px;color:#111827;font-weight:700;" class="stat-value-mobile">${fmtFull(totalY3Spend)}</p>
              </td>
            </tr>
            <tr style="background-color:#FFFDF0;">
              <td style="padding:18px 20px;border-bottom:1px solid #E5E7EB;">
                <p style="margin:0;font-size:14px;color:#111827;font-weight:600;">Annual saving by Year 3</p>
              </td>
              <td align="right" style="padding:18px 20px;border-bottom:1px solid #E5E7EB;white-space:nowrap;">
                <p style="margin:0;font-family:Georgia,serif;font-size:20px;color:#C9A84C;font-weight:700;" class="stat-value-mobile">${fmtFull(savingY3VsToday)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 20px;">
                <p style="margin:0;font-size:14px;color:#6B7280;">Educator hours recovered weekly</p>
              </td>
              <td align="right" style="padding:16px 20px;white-space:nowrap;">
                <p style="margin:0;font-family:Georgia,serif;font-size:18px;color:#111827;font-weight:700;" class="stat-value-mobile">${Number(hoursRecoveredY3).toLocaleString('en-US')}+</p>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- SUMMARY LINE -->
        <tr><td style="padding:24px 48px 0 48px;background-color:#FFFFFF;" class="px-mobile">
          <p style="margin:0;font-size:15px;line-height:1.65;color:#111827;">
            By Year 3, your district could see an estimated <strong>${spendReductionPct}% reduction</strong> in annual technology spend — and meaningful time returned to classrooms.
          </p>
        </td></tr>

        <!-- DIVIDER -->
        <tr><td style="padding:36px 48px 0 48px;background-color:#FFFFFF;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr><td style="border-top:1px solid #E5E7EB;height:1px;line-height:1px;font-size:0;">&nbsp;</td></tr>
          </table>
        </td></tr>

        <!-- CTA -->
        <tr><td style="padding:36px 48px 8px 48px;background-color:#FFFFFF;" class="px-mobile">
          <p style="margin:0 0 8px 0;font-size:10px;letter-spacing:2px;color:#C9A84C;font-weight:700;text-transform:uppercase;">Your Next Step</p>
          <p style="margin:0 0 20px 0;font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:1.25;color:#0D1B2A;font-weight:400;" class="h1-mobile">You took the first step. The next one is short.</p>
          <p style="margin:0 0 14px 0;font-size:15px;line-height:1.65;color:#374151;">Calculators give you a number. A 90-minute conversation gives you a plan.</p>
          <p style="margin:0 0 14px 0;font-size:15px;line-height:1.65;color:#374151;">Bring your team. We bring the questions. You leave with a one-page picture of your district's technology landscape and a recommended first move — yours to keep, whether or not it involves us.</p>
          <p style="margin:0 0 28px 0;font-size:15px;line-height:1.5;color:#111827;font-weight:700;">No cost. No pitch. No commitment.</p>
        </td></tr>

        <!-- BUTTON -->
        <tr><td style="padding:0 48px 40px 48px;background-color:#FFFFFF;" class="px-mobile">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
            <tr><td style="background-color:#C9A84C;border-radius:40px;">
              <a href="#" target="_blank" style="display:inline-block;padding:16px 36px;font-size:15px;color:#0D1B2A;font-weight:700;text-decoration:none;border-radius:40px;background-color:#C9A84C;letter-spacing:0.01em;">
                Book your 90-minute workshop &rarr;
              </a>
            </td></tr>
          </table>
        </td></tr>

        <!-- DIVIDER -->
        <tr><td style="padding:0 48px;background-color:#FFFFFF;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr><td style="border-top:1px solid #E5E7EB;height:1px;line-height:1px;font-size:0;">&nbsp;</td></tr>
          </table>
        </td></tr>

        <!-- DELIVERABILITY + SIGNATURE -->
        <tr><td style="padding:28px 48px 36px 48px;background-color:#FFFFFF;" class="px-mobile">
          <p style="margin:0 0 12px 0;font-size:14px;line-height:1.65;color:#6B7280;">
            Add <a href="mailto:calculator@xducepublicservices.com" style="color:#0D1B2A;font-weight:600;text-decoration:underline;">calculator@xducepublicservices.com</a> to your safe sender list so future updates from us reach your inbox.
          </p>
          <p style="margin:0 0 28px 0;font-size:14px;line-height:1.65;color:#6B7280;">Questions? Just reply to this email. A real person will respond.</p>
          <p style="margin:0 0 6px 0;font-size:15px;line-height:1.5;color:#374151;">Warm regards,</p>
          <p style="margin:0 0 2px 0;font-size:15px;line-height:1.5;color:#111827;font-weight:700;">The Education360 Team</p>
          <p style="margin:0;font-size:14px;line-height:1.5;color:#6B7280;font-style:italic;">XDuce Public Services</p>
        </td></tr>

        <!-- BRAND STRIP -->
        <tr><td style="background-color:#0D1B2A;padding:32px 48px;" class="px-mobile">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr><td align="center" style="padding-bottom:16px;">
              <img src="https://education360-dashboard.vercel.app/assets/xduce-logo.png"
                alt="XDuce Public Services" width="100" height="auto"
                style="display:inline-block;border:0;outline:none;text-decoration:none;" />
            </td></tr>
            <tr><td align="center">
              <p style="margin:0 0 10px 0;font-family:Georgia,'Times New Roman',serif;font-size:14px;color:#FFFFFF;font-style:italic;line-height:1.5;">Committed to what happens next for your students.</p>
              <p style="margin:0;font-size:10px;letter-spacing:2.5px;color:#C9A84C;font-weight:700;text-transform:uppercase;">EDUCATION360 &nbsp;&middot;&nbsp; XDUCEPUBLICSERVICES.COM</p>
            </td></tr>
          </table>
        </td></tr>

        <!-- LEGAL -->
        <tr><td style="background-color:#F0EEE9;padding:28px 48px 16px 48px;" class="px-mobile">
          <p style="margin:0 0 10px 0;font-size:10px;letter-spacing:1.5px;color:#6B7280;font-weight:700;text-transform:uppercase;">About This Estimate</p>
          <p style="margin:0;font-size:11px;line-height:1.7;color:#9CA3AF;">The figures in this email are an illustrative projection generated from publicly available industry benchmarks and the inputs you provided. They are not a quote, proposal, offer, or commitment of any kind. Actual pricing, savings, scope, and outcomes vary by district based on existing contracts, module selection, integration requirements, implementation timeline, and other factors. Education360 licensing is structured per district based on selected modules, deployment scope, and institutional needs. Nothing in this email creates an obligation, express or implied, on the part of XDuce Public Services, LLC to provide services at any specific price. All commercial terms are governed by a separately negotiated written agreement.</p>
        </td></tr>

        <!-- FOOTER -->
        <tr><td style="background-color:#F0EEE9;padding:0 48px 28px 48px;" class="px-mobile">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr><td style="border-top:1px solid #E0DDD8;height:1px;line-height:1px;font-size:0;">&nbsp;</td></tr>
          </table>
          <p style="margin:18px 0 6px 0;font-size:11px;line-height:1.5;color:#9CA3AF;">XDuce Public Services, LLC &middot; 510 Thornall Street, Suite 375, Edison, NJ 08837</p>
          <p style="margin:0;font-size:11px;line-height:1.5;color:#9CA3AF;">
            You received this email because you used the Education360 District Savings Calculator.
            <a href="#" style="color:#9CA3AF;text-decoration:underline;">Unsubscribe</a>
            &nbsp;
            <a href="#" style="color:#9CA3AF;text-decoration:underline;">Privacy</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { recipientEmail, data } = req.body || {};

    if (!recipientEmail || !data) {
      return res.status(400).json({ error: 'Missing recipientEmail or data' });
    }

    await transporter.sendMail({
      from:    `"Education360" <${process.env.SMTP_USER}>`,
      to:      recipientEmail,
      bcc:     process.env.SMTP_USER,
      subject: `Your Education360 Savings Preview — ${data.districtName}`,
      html:    buildEmailHtml(data),
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('send-email error:', err);
    return res.status(500).json({ error: err.message });
  }
}
