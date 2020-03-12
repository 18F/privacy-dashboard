/**
 * Adapted from: https://github.com/18F/fedramp-data/blob/master/scripts/google-sheets-script.gs
 *
 * This script uses a [personal access token](https://github.com/blog/1509-personal-api-tokens) for authentication, which I recommend.
 * Refs: https://developer.github.com/v3/repos/contents/#create-a-file
 */

/**
 * @OnlyCurrentDoc
 */

// TODO:
// √talk to GH API (token) √
// √commit a message to a new file in GH √
// √set up a trigger √
// √update a file in GH √
// √commit spreadsheet export .csv to GH √
// 
// √ fix csv formatting - quote everything? safe quotes?
// how can we access token without committing in code?
// can we checkout and activate script automatically?
// why does the spreadsheet have to be re-authorized?

function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var menuEntries = [
    {name: "Export csv", functionName: "run"}
  ];
  ss.addMenu("Export CSV", menuEntries);
}
 
function makeLabel(app, text, id) {
  var lb = app.createLabel(text);
  if (id) lb.setId(id);
  return lb;
}

function makeListBox(app, name, items) {
  var listBox = app.createListBox().setId(name).setName(name);
  listBox.setVisibleItemCount(1);
  
  var cache = CacheService.getPublicCache();
  var selectedValue = cache.get(name);
  Logger.log(selectedValue);
  for (var i = 0; i < items.length; i++) {
    listBox.addItem(items[i]);
    if (items[1] == selectedValue) {
      listBox.setSelectedIndex(i);
    }
  }
  return listBox;
}

function makeButton(app, parent, name, callback) {
  var button = app.createButton(name);
  app.add(button);
  var handler = app.createServerClickHandler(callback).addCallbackElement(parent);;
  button.addClickHandler(handler);
  return button;
}

function makeTextBox(app, name) { 
  var textArea    = app.createTextArea().setWidth('100%').setHeight('200px').setId(name).setName(name);
  return textArea;
}


var github = {
        'username': 'peterrowland', // Update
        'accessToken': '',
        'repository': 'test-GS-commits', // Update
        'branch': 'master', // Update
        'commitMessage': Utilities.formatString('publish data on %s', Utilities.formatDate(new Date(), 'UTC', 'yyyy-MM-dd'))
    };

var gSheets = {
        'sheetId': "1cB5Wn-TD6JTi4mchtaQ61ic4Hjosd0Dsn6M0Qx0dXZ0" // Update
    };

function getToken() {

    // open spreadsheet and get value
    // var ss = SpreadsheetApp.openById(gSheets.sheetId); // Should be by id
    var ss = SpreadsheetApp.getActiveSpreadsheet()
    var sheet = ss.getSheetByName('credentials') // Update
    var range = sheet.getRange('A1');
    var result = range.getValues();
    
    // Set Github access token
    github.accessToken = result[0][0];
    
    return false;
}

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
    var ss = SpreadsheetApp.getActiveSpreadsheet()
    // var ss = SpreadsheetApp.openById(gSheets.sheetId);
    var sheet = ss.getSheetByName('output');

    // variables for export
    var range = sheet.getDataRange();
    var data = range.getValues();
    var csv = "";

    // build export string
    for (var r = 0; r < data.length; r++) {
        
        // create empty row
        var row = ""

        // loop through cells in row
        for (var c = 0; c < data[r].length; c++) {
            
            // replace single quotes with double quotes, for clean csv
            data[r][c] = data[r][c].toString().replace(/"/g,'""')

            // add quotes to fields with commas, for clean csv
            if (data[r][c].toString().indexOf(",") != -1) {
                    data[r][c] = "\"" + data[r][c] + "\"";
            }    
            
            // add data to row 
            row = row + data[r][c]

            // add comma, if not last cell in row
            if (c < data[r].length - 1) {
                row = row + ","
            }
        }
    
    // add row to csv
    csv = csv + row
    
    // add newline to csv, if not last row
    if (r < data.length - 1) 
        csv = csv + '\n'
    }
    
return csv
}

function run() {
    
    csv = saveCsv();

    getToken(); 

    var filename = 'test2.csv' // DEBUG
    var lastSha = (getLastSha(filename)) // DEBUG

    commitToGithub(filename, csv, lastSha)
}
    

