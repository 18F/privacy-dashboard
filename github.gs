/**
 * Adapted from: https://github.com/18F/fedramp-data/blob/master/scripts/google-sheets-script.gs
 *
 * This script uses a [personal access token](https://github.com/blog/1509-personal-api-tokens) for authentication, which I recommend.
 * Refs: https://developer.github.com/v3/repos/contents/#create-a-file
 */

// TODO:
// talk to GH API (token)
// commit a message to a new file in GH
// set up a trigger
// update a file in GH
// commit spreadsheet export .csv to GH

var github = {
        'username': 'peterrowland',
        'accessToken': '20b7803daa0bbe2d1e4b03f55548e0abf6a2ee03',
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

function run() {
    
    Logger.log(getLastSha('gs1.txt'))
    
    // var requestUrl = Utilities.formatString(
    // 'https://api.github.com/repos/%s/%s/contents/%s',
    // github.username,
    // github.repository,
    // 'gs1.txt'
    // )
    
    // response = UrlFetchApp.fetch(requestUrl, {
    //   'method': 'PUT',
    //   'headers': {
    //       'Accept': 'application/vnd.github.v3+json',
    //       'Content-Type': 'application/json',
    //       'Authorization': Utilities.formatString('token %s', github.accessToken)
    //   },
    //   'payload': JSON.stringify({
    //       'message': github.commitMessage,
    //       'content': Utilities.base64Encode('test_content', Utilities.Charset.UTF_8),        
    //     //   'sha': lastSha,
    //       'branch': github.branch
    //   })
    // });
    // Logger.log(response)
}
    

