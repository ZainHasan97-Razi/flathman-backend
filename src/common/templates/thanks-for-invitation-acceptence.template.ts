
export const ThanksForInvitationAcceptanceTemplate = (guestName: string, ownerName: string, role: string) => {
  return (
    `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You for Accepting the Invitation</title>
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
              .team-table {
                  width: 100%;
                  border-collapse: collapse;
                  margin: 20px 0;
              }
              .team-table th, .team-table td {
                  border: 1px solid #dddddd;
                  padding: 10px;
                  text-align: left;
              }
              .team-table th {
                  background-color: #f2f2f2;
              }
              .app-badges {
                  text-align: center;
                  margin: 20px 0;
              }
              .app-badges img {
                  height: 40px;
                  margin: 0 5px;
              }
          </style>
        </head>
        <body>
          <div class="container">
              <div class="header">
                  <!-- Replace with your logo image -->
                  <img src="https://laxstatclock.com/wp-content/uploads/2024/12/drawer-e1733686747371.png" alt="Laxstat Logo">
              </div>
              <div class="content">
                  <h2>Thank You, ${guestName}, for Accepting My Invitation!</h2>
                  <p>You now have access to <strong>Laxstatclock</strong> as a <strong>${role}</strong> and can view all teams on my account.</p>
                  
                  <p><strong>All you need to do now is install the app:</strong></p>
                  <div class="app-badges">
                    <a href="https://apps.apple.com/ee/app/laxstatclock/id6468321162">
                      <img src="https://laxstatclock.com/wp-content/uploads/2025/05/app-store-1.jpg" alt="Download on the App Store" style="width: 70px; height: auto; margin: 5px;">
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=com.flathman">
                      <img src="https://laxstatclock.com/wp-content/uploads/2025/05/play-store-1-1.jpg" alt="Get it on Google Play" style="width: 70px; height: auto; margin: 5px;">
                    </a>
                  </div>

                  <p><em>Thanks again,</em><br>
                  <strong>${ownerName}</strong></p>
              </div>
          </div>
        </body>
      </html>
    `
  )
}