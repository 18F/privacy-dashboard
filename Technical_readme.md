
## Running Locally

Clone the repository.

    $ git clone https://github.com/18F/federalist-uswds-jekyll
    $ cd federalist-uswds-jekyll

Install the Node.js dependencies.

    $ npm install

Build the site.

    $ npm run build

Run the site locally.

    $ npm start

Open your web browser to [localhost:4000](http://localhost:4000/) to view your
site.

After you make changes, be sure to run the tests.

    $ npm test

Note that when built by Federalist, `npm run federalist` is used instead of the
`build` script.

## Data Source and Updating

The data this tool presents is stored in a Google spreadsheet, owned and maintained by GSA's Privacy Office. `github.js` is  the Google Apps script that runs attached to the spreadsheet. 

The script adds a menu item which calls the script and updates the data in the repo by exporting the current contents of the spreadsheet as a .csv and committing it to this projects repository.

The script uses a Github personal access token with public repo permissions to make commits to this repository. 

## Running Tests
To run tests:

```
npm install
bundle install
bundle exec rspec
```

To see the tests run on each push to github go to: https://github.com/18F/privacy-dashboard/actions

## Technologies Used

- [Jekyll](https://jekyllrb.com/docs/) - The primary site engine that builds your code and content.
- [Front Matter](https://jekyllrb.com/docs/frontmatter) - The top of each page/post includes keywords within `--` tags. This is meta data that helps Jekyll build the site, but you can also use it to pass custom variables.
- [U.S. Web Design System v 2.0](https://v2.designsystem.digital.gov) 
- rspec
- list.JS
- Google Apps Script, clasp

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md) for additional information.

## Public domain

This project is in the worldwide [public domain](LICENSE.md). As stated in [CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within the United States, and copyright
> and related rights in the work worldwide are waived through the [CC0 1.0
> Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0 dedication.
> By submitting a pull request, you are agreeing to comply with this waiver of
> copyright interest.
