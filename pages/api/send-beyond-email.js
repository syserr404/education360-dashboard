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

const BEN_EMAIL = 'ben.miller@xduce.com';

function buildUserEmailHtml(data) {
  const { firstName } = data;
  const greeting = firstName ? `Hi <strong>${firstName}</strong>,` : 'Hi there,';

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="color-scheme" content="light only" />
  <title>Thank you for your interest in E360Beyond</title>
  <link href="https://fonts.googleapis.com/css2?family=Kaisei+Decol:wght@400;700&family=Figtree:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <style type="text/css">
    @import url('https://fonts.googleapis.com/css2?family=Kaisei+Decol:wght@400;700&family=Figtree:wght@400;600;700;800&display=swap');
    body,table,td,p,a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table,td { mso-table-lspace:0pt; mso-table-rspace:0pt; border-collapse:collapse; }
    img { border:0; outline:none; text-decoration:none; display:block; }
    a { text-decoration:none; }
    body { margin:0!important; padding:0!important; width:100%!important; background-color:#F0EEE9; font-family:'Figtree',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; }
    @media only screen and (max-width:620px) {
      .container { width:100%!important; max-width:100%!important; }
      .px-mobile { padding-left:24px!important; padding-right:24px!important; }
      .h1-mobile { font-size:20px!important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#F0EEE9;font-family:'Figtree',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="display:none;font-size:1px;color:#F0EEE9;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
    Thank you for raising your hand. You'll hear from us within 48 hours.
  </div>
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#F0EEE9;">
    <tr><td align="center" style="padding:32px 12px;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" class="container"
        style="width:600px;max-width:600px;background-color:#FFFFFF;border-radius:4px;overflow:hidden;">

        <!-- HEADER -->
        <tr><td style="background-color:#0D1B2A;padding:40px 48px 32px 48px;" class="px-mobile">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr><td style="padding-bottom:20px;">
              <img src="https://education360-dashboard.vercel.app/assets/education-360-logo.png"
                alt="Education360" width="200" height="54"
                style="display:block;border:0;outline:none;text-decoration:none;" />
            </td></tr>
            <tr><td style="font-family:'Kaisei Decol',Georgia,'Times New Roman',serif;font-size:26px;line-height:1.2;color:#FFFFFF;font-weight:400;padding-bottom:20px;white-space:nowrap;" class="h1-mobile">
              Thank you for your interest in E360Beyond
            </td></tr>
            <tr><td>
              <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                <tr><td style="background-color:#C9A84C;height:2px;width:48px;line-height:2px;font-size:0;">&nbsp;</td></tr>
              </table>
            </td></tr>
          </table>
        </td></tr>

        <!-- GREETING + BODY -->
        <tr><td style="padding:40px 48px 0 48px;background-color:#FFFFFF;" class="px-mobile">
          <p style="margin:0 0 20px 0;font-size:16px;line-height:1.55;color:#111827;">${greeting}</p>
          <p style="margin:0 0 20px 0;font-size:16px;line-height:1.65;color:#374151;">Thank you for raising your hand.</p>
          <p style="margin:0 0 20px 0;font-size:16px;line-height:1.65;color:#374151;">Programs like E360Beyond don't get built by us alone. They get built by the educators, leaders, parents, and partners who believe students deserve more than a diploma — and who are willing to help us prove it.</p>
          <p style="margin:0 0 20px 0;font-size:16px;line-height:1.65;color:#374151;">You'll hear from someone on our team within <strong style="color:#111827;">48 hours to schedule a 30-minute conversation</strong>. The call is informal. We want to understand your district, your students, and the gaps you're already trying to close. You'll learn how E360Beyond works, what it can look like for your community, and how we can shape it together.</p>
          <p style="margin:0 0 20px 0;font-size:16px;line-height:1.65;color:#374151;">Bring your team. We bring the questions. You leave with a one-page picture of your district's technology landscape and a recommended first move — yours to keep, whether or not it involves us.</p>
          <p style="margin:0 0 32px 0;font-size:15px;line-height:1.5;color:#111827;font-weight:700;">No cost. No pitch. No commitment.</p>
        </td></tr>

        <!-- DIVIDER -->
        <tr><td style="padding:0 48px;background-color:#FFFFFF;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr><td style="border-top:1px solid #E5E7EB;height:1px;line-height:1px;font-size:0;">&nbsp;</td></tr>
          </table>
        </td></tr>

        <!-- POST-DIVIDER + SIGNATURE -->
        <tr><td style="padding:32px 48px 40px 48px;background-color:#FFFFFF;" class="px-mobile">
          <p style="margin:0 0 20px 0;font-size:16px;line-height:1.65;color:#374151;">If your timeline is urgent or you'd like to share something ahead of the call, reply to this email — it comes straight to me.</p>
          <p style="margin:0 0 20px 0;font-size:15px;line-height:1.5;color:#374151;">Talk soon.</p>
          <p style="margin:0 0 6px 0;font-size:15px;line-height:1.5;color:#374151;">Warm regards,</p>
          <p style="margin:0 0 2px 0;font-size:15px;line-height:1.5;color:#111827;font-weight:700;">Ben Miller</p>
          <p style="margin:0;font-size:14px;line-height:1.5;color:#6B7280;font-style:italic;">E360Beyond Program Lead &nbsp;XDuce Public Services</p>
        </td></tr>

        <!-- BRAND STRIP -->
        <tr><td style="background-color:#0D1B2A;padding:32px 48px;" class="px-mobile">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr><td align="center">
              <p style="margin:0 0 10px 0;font-family:'Kaisei Decol',Georgia,'Times New Roman',serif;font-size:14px;color:#FFFFFF;font-style:italic;line-height:1.5;">Committed to what happens next for your students.</p>
              <p style="margin:0;font-size:10px;letter-spacing:2.5px;color:#C9A84C;font-weight:700;text-transform:uppercase;">E360BEYOND &nbsp;&middot;&nbsp; AN INITIATIVE OF XDUCE PUBLIC SERVICES</p>
            </td></tr>
          </table>
        </td></tr>

        <!-- LEGAL -->
        <tr><td style="background-color:#F0EEE9;padding:28px 48px 16px 48px;" class="px-mobile">
          <p style="margin:0 0 10px 0;font-size:10px;letter-spacing:1.5px;color:#6B7280;font-weight:700;text-transform:uppercase;">About This Program</p>
          <p style="margin:0;font-size:11px;line-height:1.7;color:#9CA3AF;">The figures in this email are an illustrative projection generated from publicly available industry benchmarks and the inputs you provided. They are not a quote, proposal, offer, or commitment of any kind. Actual pricing, savings, scope, and outcomes vary by district based on existing contracts, module selection, integration requirements, implementation timeline, and other factors. Education360 licensing is structured per district based on selected modules, deployment scope, and institutional needs. Nothing in this email creates an obligation, express or implied, on the part of XDuce Public Services, LLC to provide services at any specific price. All commercial terms are governed by a separately negotiated written agreement.</p>
        </td></tr>

        <!-- FOOTER -->
        <tr><td style="background-color:#F0EEE9;padding:0 48px 28px 48px;" class="px-mobile">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr><td style="border-top:1px solid #E0DDD8;height:1px;line-height:1px;font-size:0;">&nbsp;</td></tr>
          </table>
          <p style="margin:18px 0 6px 0;font-size:11px;line-height:1.5;color:#9CA3AF;">XDuce Public Services, LLC &middot; 510 Thornall Street, Suite 375, Edison, NJ 08837</p>
          <p style="margin:0;font-size:11px;line-height:1.5;color:#9CA3AF;">
            You received this email because you submitted your interest in the E360Beyond program.
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

function buildDataEmailHtml(data) {
  const {
    firstName, lastName, title, schoolName, country,
    schoolType, email, phone, hearAbout,
    studentsInfo, reduceCosts, notifyEvents, submittedAt,
  } = data;

  const fmt = v => v || '—';
  const bool = v => v === true ? 'Yes' : v === false ? 'No' : '—';
  const schoolTypeLabel = {
    public_k12: 'Public K-12',
    charter: 'Charter',
    private: 'Private',
    higher_ed: 'Higher Education',
  };
  const hearAboutLabel = { search: 'Search', referral: 'Referral' };

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta charset="UTF-8" />
  <title>New E360Beyond Submission</title>
  <style type="text/css">
    body,table,td,p { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table,td { mso-table-lspace:0pt; mso-table-rspace:0pt; border-collapse:collapse; }
    body { margin:0; padding:0; background-color:#F4F2EE; }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#F4F2EE;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#F4F2EE;">
    <tr><td align="center" style="padding:32px 12px;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="560"
        style="width:560px;max-width:560px;background-color:#FFFFFF;border-radius:8px;overflow:hidden;">

        <!-- HEADER -->
        <tr><td style="background-color:#0D1B2A;padding:28px 40px;">
          <p style="margin:0 0 6px 0;font-size:11px;letter-spacing:2px;color:#D4A017;font-weight:700;text-transform:uppercase;">E360BEYOND · NEW SUBMISSION</p>
          <p style="margin:0;font-family:Georgia,serif;font-size:20px;color:#FFFFFF;font-weight:400;">A new interest form was submitted.</p>
        </td></tr>

        <!-- DATA TABLE -->
        <tr><td style="padding:32px 40px;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #E5E7EB;border-radius:6px;">

            <tr style="background-color:#F8F6F1;">
              <td colspan="2" style="padding:12px 18px;font-size:11px;letter-spacing:1.5px;color:#6B7280;font-weight:700;text-transform:uppercase;">Contact</td>
            </tr>
            <tr><td style="padding:12px 18px;font-size:13px;color:#6B7280;border-top:1px solid #E5E7EB;width:40%;">Name</td><td style="padding:12px 18px;font-size:14px;color:#0D1B2A;font-weight:600;border-top:1px solid #E5E7EB;">${fmt(firstName)} ${fmt(lastName)}</td></tr>
            <tr style="background:#FAFAFA;"><td style="padding:12px 18px;font-size:13px;color:#6B7280;border-top:1px solid #E5E7EB;">Title</td><td style="padding:12px 18px;font-size:14px;color:#0D1B2A;font-weight:600;border-top:1px solid #E5E7EB;">${fmt(title)}</td></tr>
            <tr><td style="padding:12px 18px;font-size:13px;color:#6B7280;border-top:1px solid #E5E7EB;">Email</td><td style="padding:12px 18px;font-size:14px;color:#0D1B2A;font-weight:600;border-top:1px solid #E5E7EB;"><a href="mailto:${email}" style="color:#0D1B2A;">${email}</a></td></tr>
            <tr style="background:#FAFAFA;"><td style="padding:12px 18px;font-size:13px;color:#6B7280;border-top:1px solid #E5E7EB;">Phone</td><td style="padding:12px 18px;font-size:14px;color:#0D1B2A;font-weight:600;border-top:1px solid #E5E7EB;">${fmt(phone)}</td></tr>

            <tr style="background-color:#F8F6F1;">
              <td colspan="2" style="padding:12px 18px;font-size:11px;letter-spacing:1.5px;color:#6B7280;font-weight:700;text-transform:uppercase;border-top:1px solid #E5E7EB;">School</td>
            </tr>
            <tr><td style="padding:12px 18px;font-size:13px;color:#6B7280;border-top:1px solid #E5E7EB;">School Name</td><td style="padding:12px 18px;font-size:14px;color:#0D1B2A;font-weight:600;border-top:1px solid #E5E7EB;">${fmt(schoolName)}</td></tr>
            <tr style="background:#FAFAFA;"><td style="padding:12px 18px;font-size:13px;color:#6B7280;border-top:1px solid #E5E7EB;">School Type</td><td style="padding:12px 18px;font-size:14px;color:#0D1B2A;font-weight:600;border-top:1px solid #E5E7EB;">${schoolTypeLabel[schoolType] || fmt(schoolType)}</td></tr>
            <tr><td style="padding:12px 18px;font-size:13px;color:#6B7280;border-top:1px solid #E5E7EB;">Country</td><td style="padding:12px 18px;font-size:14px;color:#0D1B2A;font-weight:600;border-top:1px solid #E5E7EB;">${fmt(country)}</td></tr>

            <tr style="background-color:#F8F6F1;">
              <td colspan="2" style="padding:12px 18px;font-size:11px;letter-spacing:1.5px;color:#6B7280;font-weight:700;text-transform:uppercase;border-top:1px solid #E5E7EB;">Interest</td>
            </tr>
            <tr><td style="padding:12px 18px;font-size:13px;color:#6B7280;border-top:1px solid #E5E7EB;">Heard About Us</td><td style="padding:12px 18px;font-size:14px;color:#0D1B2A;font-weight:600;border-top:1px solid #E5E7EB;">${hearAboutLabel[hearAbout] || fmt(hearAbout)}</td></tr>
            <tr style="background:#FAFAFA;"><td style="padding:12px 18px;font-size:13px;color:#6B7280;border-top:1px solid #E5E7EB;">Reduce Costs</td><td style="padding:12px 18px;font-size:14px;color:#0D1B2A;font-weight:600;border-top:1px solid #E5E7EB;">${bool(reduceCosts)}</td></tr>
            <tr><td style="padding:12px 18px;font-size:13px;color:#6B7280;border-top:1px solid #E5E7EB;">Notify Events</td><td style="padding:12px 18px;font-size:14px;color:#0D1B2A;font-weight:600;border-top:1px solid #E5E7EB;">${bool(notifyEvents)}</td></tr>

            ${studentsInfo ? `
            <tr style="background-color:#F8F6F1;">
              <td colspan="2" style="padding:12px 18px;font-size:11px;letter-spacing:1.5px;color:#6B7280;font-weight:700;text-transform:uppercase;border-top:1px solid #E5E7EB;">Student Info</td>
            </tr>
            <tr><td colspan="2" style="padding:14px 18px;font-size:14px;color:#1F2937;line-height:1.6;border-top:1px solid #E5E7EB;">${studentsInfo}</td></tr>
            ` : ''}

          </table>

          <p style="margin:20px 0 0 0;font-size:12px;color:#9CA3AF;">Submitted: ${submittedAt || new Date().toUTCString()}</p>
        </td></tr>

        <!-- FOOTER -->
        <tr><td style="background-color:#F4F2EE;padding:20px 40px;">
          <p style="margin:0;font-size:11px;line-height:1.5;color:#9CA3AF;">XDuce Public Services, LLC &middot; 510 Thornall Street, Suite 375, Edison, NJ 08837</p>
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
    const { data } = req.body || {};
    if (!data || !data.email) {
      return res.status(400).json({ error: 'Missing data or data.email' });
    }

    // Email to the user (CC ben.miller)
    await transporter.sendMail({
      from:    `"E360Beyond" <${process.env.SMTP_USER}>`,
      to:      data.email,
      cc:      BEN_EMAIL,
      subject: 'Thank you for your interest in E360Beyond',
      html:    buildUserEmailHtml(data),
    });

    // Data summary email to ben.miller
    await transporter.sendMail({
      from:    `"E360Beyond" <${process.env.SMTP_USER}>`,
      to:      BEN_EMAIL,
      subject: `New E360Beyond submission — ${data.firstName || ''} ${data.lastName || ''} · ${data.schoolName || ''}`.trim(),
      html:    buildDataEmailHtml({ ...data, submittedAt: new Date().toUTCString() }),
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('send-beyond-email error:', err);
    return res.status(500).json({ error: err.message });
  }
}
