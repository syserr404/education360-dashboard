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
  const { firstName, lastName, title, schoolName } = data;

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="color-scheme" content="light only" />
  <title>Thank you for your interest in E360Beyond</title>
  <style type="text/css">
    body,table,td,p,a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table,td { mso-table-lspace:0pt; mso-table-rspace:0pt; border-collapse:collapse; }
    img { border:0; outline:none; text-decoration:none; display:block; }
    a { text-decoration:none; }
    body { margin:0!important; padding:0!important; width:100%!important; background-color:#F4F2EE; }
    @media only screen and (max-width:620px) {
      .container { width:100%!important; max-width:100%!important; }
      .px-mobile { padding-left:24px!important; padding-right:24px!important; }
      .h1-mobile { font-size:22px!important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#F4F2EE;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="display:none;font-size:1px;color:#F4F2EE;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
    Thank you for raising your hand. You'll hear from us within 48 hours.
  </div>
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#F4F2EE;">
    <tr><td align="center" style="padding:32px 12px;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" class="container"
        style="width:600px;max-width:600px;background-color:#FFFFFF;border-radius:8px;overflow:hidden;">

        <!-- HEADER -->
        <tr><td style="background-color:#0D1B2A;padding:36px 48px 28px 48px;" class="px-mobile">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr><td style="padding-bottom:20px;">
              <img src="https://education360-dashboard.vercel.app/assets/education-360-logo.png"
                alt="Education360" width="160" height="43"
                style="display:block;border:0;outline:none;text-decoration:none;" />
            </td></tr>
            <tr><td style="font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:1.25;color:#FFFFFF;font-weight:400;" class="h1-mobile">Thank you for your interest in E360Beyond.</td></tr>
            <tr><td style="padding-top:18px;"><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="background-color:#D4A017;height:2px;width:40px;line-height:2px;font-size:0;">&nbsp;</td></tr></table></td></tr>
          </table>
        </td></tr>

        <!-- GREETING -->
        <tr><td style="padding:36px 48px 8px 48px;" class="px-mobile">
          <p style="margin:0 0 16px 0;font-size:16px;line-height:1.55;color:#1F2937;">Hi ${firstName},</p>
          <p style="margin:0 0 16px 0;font-size:16px;line-height:1.6;color:#4B5563;">Thank you for raising your hand.</p>
          <p style="margin:0;font-size:16px;line-height:1.6;color:#4B5563;">Programs like E360Beyond don't get built by us alone. They get built by the educators, leaders, parents, and partners who believe students deserve more than a diploma — and who are willing to help us prove it.</p>
        </td></tr>

        <!-- WHAT HAPPENS NEXT -->
        <tr><td style="padding:32px 48px 8px 48px;" class="px-mobile">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#F8F6F1;border-radius:6px;">
            <tr><td style="padding:22px 24px;">
              <p style="margin:0 0 6px 0;font-size:11px;letter-spacing:1.5px;color:#6B7280;font-weight:600;text-transform:uppercase;">What Happens Next</p>
              <p style="margin:0;font-size:15px;line-height:1.65;color:#1F2937;">You'll hear from someone on our team within <strong>48 hours</strong> to schedule a 30-minute conversation. The call is informal. We want to understand your district, your students, and the gaps you're already trying to close.</p>
            </td></tr>
          </table>
        </td></tr>

        <!-- BODY -->
        <tr><td style="padding:28px 48px 8px 48px;" class="px-mobile">
          <p style="margin:0 0 16px 0;font-size:16px;line-height:1.6;color:#4B5563;">You'll learn how E360Beyond works, what it can look like for your community, and how we can shape it together.</p>
          <p style="margin:0 0 24px 0;font-size:14px;line-height:1.5;color:#0D1B2A;font-weight:600;">No paperwork. No pitch. No commitment.</p>
          <p style="margin:0;font-size:16px;line-height:1.6;color:#4B5563;">If your timeline is urgent or you'd like to share something ahead of the call, reply to this email — it comes straight to me.</p>
        </td></tr>

        <!-- DIVIDER -->
        <tr><td style="padding:32px 48px 0 48px;"><table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td style="border-top:1px solid #E5E7EB;height:1px;line-height:1px;font-size:0;">&nbsp;</td></tr></table></td></tr>

        <!-- SIGNATURE -->
        <tr><td style="padding:28px 48px 40px 48px;" class="px-mobile">
          <p style="margin:0 0 6px 0;font-size:15px;line-height:1.5;color:#1F2937;">Talk soon.</p>
          <p style="margin:0 0 2px 0;font-size:15px;line-height:1.5;color:#1F2937;">Warm regards,</p>
          <p style="margin:12px 0 2px 0;font-size:15px;line-height:1.5;color:#0D1B2A;font-weight:700;">Ben Miller</p>
          <p style="margin:0 0 2px 0;font-size:14px;line-height:1.5;color:#6B7280;">E360Beyond Program Lead</p>
          <p style="margin:0;font-size:14px;line-height:1.5;color:#6B7280;font-style:italic;">XDuce Public Services</p>
        </td></tr>

        <!-- BRAND STRIP -->
        <tr><td style="background-color:#0D1B2A;padding:28px 48px;" class="px-mobile">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr><td align="center" style="padding-bottom:16px;">
              <img src="https://education360-dashboard.vercel.app/assets/xduce-logo.png"
                alt="XDuce Public Services" width="100" height="auto"
                style="display:inline-block;border:0;outline:none;text-decoration:none;" />
            </td></tr>
            <tr><td align="center">
              <p style="margin:0 0 8px 0;font-family:Georgia,'Times New Roman',serif;font-size:14px;color:#FFFFFF;font-style:italic;">Committed to what happens next for your students.</p>
              <p style="margin:0;font-size:11px;letter-spacing:2px;color:#D4A017;font-weight:700;text-transform:uppercase;">E360BEYOND &nbsp;&middot;&nbsp; xducepublicservices.com</p>
            </td></tr>
          </table>
        </td></tr>

        <!-- FOOTER -->
        <tr><td style="background-color:#F4F2EE;padding:24px 48px 28px 48px;" class="px-mobile">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td style="border-top:1px solid #E5E7EB;height:1px;line-height:1px;font-size:0;">&nbsp;</td></tr></table>
          <p style="margin:18px 0 6px 0;font-size:11px;line-height:1.5;color:#9CA3AF;">XDuce Public Services, LLC &middot; 510 Thornall Street, Suite 375, Edison, NJ 08837</p>
          <p style="margin:0;font-size:11px;line-height:1.5;color:#9CA3AF;">
            You received this email because you submitted your interest in the E360Beyond program.
            <a href="#" style="color:#6B7280;text-decoration:underline;">Unsubscribe</a> &middot;
            <a href="#" style="color:#6B7280;text-decoration:underline;">Privacy</a>
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
