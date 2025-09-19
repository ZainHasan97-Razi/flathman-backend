
export const SendAccountShareInviteTemplate = (accountHolderName: string, guestEmail: string, ownerEmail: string, inviteId: string, role: string) => {
  return (
    `
      <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Invitation to Access [App Name]</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333333;
                    margin: 0;
                    padding: 0;
                    background-color: #f7f7f7;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    background-color: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    padding: 10px 0;
                }
                .header img {
                    max-width: 150px;
                    height: auto;
                }
                .content {
                    padding: 20px;
                }
                .button {
                    display: inline-block;
                    padding: 12px 24px;
                    margin: 15px 0;
                    background-color: #007BFF;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 4px;
                    font-weight: bold;
                    text-align: center;
                }
                .footer {
                    text-align: center;
                    padding: 10px;
                    font-size: 12px;
                    color: #777777;
                }
                .steps {
                    margin: 20px 0;
                    padding-left: 20px;
                }
                .steps li {
                    margin-bottom: 10px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <!-- Replace with your logo image -->
                    <img 
                      style="margin-bottom:0px; margin-top:0px; background-color:rgba(255, 255, 255, 0.5); border-width: 5px solid #ffffff;" 
                      src="https://laxstatclock.com/wp-content/uploads/2024/12/drawer-e1733686747371.png" 
                      alt="Laxstat Logo"
                    >
                </div>
                <div class="content">
                    <h2>You're Invited to Share Access to <em>LaxStatClock</em></h2>
                    <p>We're excited to let you know that <strong>${accountHolderName}</strong> has invited you to share access to <em>LaxStatClock</em> as a <strong>${role}</strong>.</p>
                    
                    <p>Follow these simple steps to activate your access:</p>
                    <ol class="steps">
                        <li><strong>Click the button below to get started:</strong><br>
                            <a href="${process.env.WEBSITE_URL}/invitation?guestEmail=${guestEmail}&ownerEmail=${ownerEmail}&inviteId=${inviteId}" class="button">ACTIVATE MY ACCESS</a>
                        </li>
                        <li><strong>Sign in</strong> or <strong>create an account</strong> using the same email address that received this email.</li>
                        <li><strong>Download the LaxStatClock app</strong> from the [App Store/Google Play].</li>
                        <li><strong>That's it!</strong> Your access will be activated immediately.</li>
                    </ol>
                    
                    <p><em>Thanks for joining the team!</em></p>
                    
                    <!-- App download buttons (replace with your app store images/links) -->
                    <div style="text-align: center; margin: 25px 0;">
                        <a href="https://apps.apple.com/ee/app/laxstatclock/id6468321162">
                          <img src="https://laxstatclock.com/wp-content/uploads/2025/05/app-store-1.jpg" alt="Download on the App Store" style="width: 70px; height: auto; margin: 5px;">
                        </a>
                        <a href="https://play.google.com/store/apps/details?id=com.flathman">
                          <img src="https://laxstatclock.com/wp-content/uploads/2025/05/play-store-1-1.jpg" alt="Get it on Google Play" style="width: 70px; height: auto; margin: 5px;">
                        </a>
                    </div>
                </div>
            </div>
        </body>
      </html>
    `
  )
};