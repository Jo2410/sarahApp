export const verifyEmailTemplate = ({ otp, title = "Email Confirmation" } = {}) => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin:0; padding:0; background-color:#88BDBF; font-family: Arial, sans-serif;">
  <table border="0" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F3F3F3; padding:30px 0;">
    <tr>
      <td align="center">
        <table border="0" width="600" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF; border:1px solid #630E2B;">
          <!-- Header -->
          <tr>
            <td style="padding:20px;">
              <table border="0" width="100%">
                <tr>
                  <td>
                    <img width="100" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670702280/Group_35052_icaysu.png" alt="Logo">
                  </td>
                  <td align="right" style="font-size:14px;">
                    <a href="http://localhost:4200/#/" target="_blank" style="text-decoration:none; color:#630E2B;">View In Website</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Banner -->
          <tr>
            <td align="center" style="background-color:#630E2B; height:100px; color:#fff;">
              <img width="50" height="50" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703716/Screenshot_1100_yne3vo.png" alt="Icon">
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td align="center" style="padding:25px;">
              <h1 style="color:#630E2B; margin:0;">${title}</h1>
            </td>
          </tr>

          <!-- OTP -->
          <tr>
            <td align="center">
              <h2 style="margin:10px 0 30px 0; border-radius:4px; padding:10px 20px; background-color:#630E2B; color:#fff; display:inline-block;">
                ${otp}
              </h2>
            </td>
          </tr>

          <!-- Social Links -->
          <tr>
            <td align="center" style="padding:20px;">
              <h3 style="color:#000; margin-bottom:10px;">Stay in touch</h3>
              <div>
                <a href="${process.env.facebookLink || '#'}" style="margin:0 5px; display:inline-block;">
                  <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35062_erj5dx.png" width="50" height="50" alt="Facebook">
                </a>
                <a href="${process.env.instegram || '#'}" style="margin:0 5px; display:inline-block;">
                  <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35063_zottpo.png" width="50" height="50" alt="Instagram">
                </a>
                <a href="${process.env.twitterLink || '#'}" style="margin:0 5px; display:inline-block;">
                  <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group_35064_i8qtfd.png" width="50" height="50" alt="Twitter">
                </a>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};
