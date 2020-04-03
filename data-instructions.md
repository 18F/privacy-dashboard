# Instructions for getting data into the dashboard

## How to Use
When you open the [GSA PII Dashboard Data spreadsheet](https://docs.google.com/a/gsa.gov/spreadsheets/d/1GCDRoneF4rx_5CcxHpZHWb_HKm1GsCjcW6wDxk-P3PM/edit?usp=drive_web), a new menu option will appear labeled `Save data to dashboard`.

Clicking this menu item will update the data presented on [GSA's PII Dashboard](https://cg-9341b8ea-025c-4fe2-aa6c-850edbebc499.app.cloud.gov/site/18f/privacy-dashboard/) by committing the changes to the project’s [GitHub repository](https://github.com/18F/privacy-dashboard). 
 
## How it Works
Clicking `Save data to dashboard` will run a [Google Script](https://script.google.com/a/gsa.gov/d/1K_DwNjL0NHNP1wUgbzY517y2dWn9Jk0T_5I2tkajdpuNwnIPdQ0Az06X/edit?mid=ACjPJvEObjbabMhzCWxhtu2NZQ0fAAWxEoCSe_IwHTY7aWCvVgVTcfhTbP55guuJpH10GrFKI9-rh8gy9Y6kT80ad0sg0vHdcNHVH1ku3wruQDlAQUCcWJXePjLND76jvSwH2Wj9QCqIxkI&uiv=2) connected to this spreadsheet. Anyone with permission to access the spreadsheet can see the script under Tools > Script editor.
Running the script will [commit a csv](https://github.com/18F/privacy-dashboard/commits) of the spreadsheet's data to the dashboard's GitHub repository. The commits will be made by the `rspeidel` GitHub account.

Every time a commit is made to that repository, it will trigger Federalist to rebuild the site using the new data. It typically takes a few minutes for those builds to complete. Occasionally, Federalist will fail to rebuild after a commit and it can usually be fixed by trying again. If your changes aren't appearing on the dashboard after you have committed them, press the "Save data to dashboard" button again to create another commit, and trigger another build.
Google may ask for your permission the first time you run the script to save the data. The script will request permission to read the data from the spreadsheet and to communicate with an outside service (Github). We’ve configured the script to only be able access to this spreadsheet.

## Data
The columns in the spreadsheet map to fields with the same names in the dashboard. PII is entered in the spreadsheet as a comma separated list, which is split into a bulleted list and alphabetized on the dashboard.
 
## Permissions and Security
Richard is the spreadsheet owner and can grant and revoke permission to view and edit the document. Moving the spreadsheet to another folder in Google Drive won’t affect the ability to save and update the dashboard. Please don’t copy it though!

We recommend Richard remains the owner and gives edit access to anyone on the GSA Privacy staff who will manage the inventory. Please leave the edit permissions for our team and the 10x team while the project is ongoing.

The Google script has been whitelisted by the Cloudlock team.

The Personal Access Token that the script uses to commit new data is stored in another tab of the spreadsheet labeled `credentials`. This token should not be moved and should not be copied or shared with anyone else. The token’s access permissions have been restricted as much as possible.
