/**
 * Adapted from: https://github.com/18F/fedramp-data/blob/master/scripts/google-sheets-script.gs
 *
 * This script uses a [personal access token](https://github.com/blog/1509-personal-api-tokens) for authentication, which I recommend.
 * Refs: https://developer.github.com/v3/repos/contents/#create-a-file
 */

// TODO:
// talk to GH API (token) √
// commit a message to a new file in GH √
// set up a trigger √
// update a file in GH √
// commit spreadsheet export .csv to GH

var github = {
        'username': 'peterrowland',
        'accessToken': 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        'repository': 'test-GS-commits',
        'branch': 'master',
        'commitMessage': Utilities.formatString('publish data on %s', Utilities.formatDate(new Date(), 'UTC', 'yyyy-MM-dd'))
    };

var gSheets = {
        'sheetId': 'xxxxxxxxx'
    };

function getLastSha(filename) {
    var requestUrl = Utilities.formatString(
    'https://api.github.com/repos/%s/%s/contents/%s',
    github.username,
    github.repository,
    filename
    ),
    response = UrlFetchApp.fetch(requestUrl, {
        'method': 'GET',
        'headers': {
          'Authorization': Utilities.formatString('token %s', github.accessToken)
        }
    }),
    jsonResponse = JSON.parse(response.getContentText());

    return jsonResponse.sha;
}

// lastSha argument is optional, only needed to update files
function commitToGithub (filename, content, lastSha) {
    
    var requestUrl = Utilities.formatString(
    'https://api.github.com/repos/%s/%s/contents/%s',
    github.username,
    github.repository,
    filename
    )

    response = UrlFetchApp.fetch(requestUrl, {
      'method': 'PUT',
      'headers': {
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
          'Authorization': Utilities.formatString('token %s', github.accessToken)
      },
      'payload': JSON.stringify({
          'message': github.commitMessage,
          'content': Utilities.base64Encode(content, Utilities.Charset.UTF_8), // Testing with committing current date
          'sha': lastSha,
          'branch': github.branch
      })
    });

return false
}

/**
 * Adapted from: https://gist.github.com/mrkrndvs/a2c8ff518b16e9188338cb809e06ccf1
 */
function saveCsv() {
    // get the active spreadsheet
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
    // create a folder from the name of the spreadsheet
    var fileName = spreadsheet + ".csv";
    
    // variables for export
    var range = spreadsheet.getDataRange();
    var data = range.getValues();
    var csv = "";

    // build export string
    for (var r = 0; r < data.length; r++) {
        var row = ""
        for (var c = 0; c < data[r].length; c++) {
            row = row + data[r][c] + ','
        }
        csv = csv + row + '\n'
    }
    
return csv
}

function run() {
    
    csv = saveCsv()

    var filename = 'test2.csv' // DEBUG
    // var lastSha = (getLastSha(filename)) // DEBUG

    // Logger.log(lastSha)

    commitToGithub(filename, csv)
}
    

