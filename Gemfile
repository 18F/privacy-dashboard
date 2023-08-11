ruby '>= 2.5.7'

source "https://rubygems.org"

# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!
gem "jekyll", "~> 3.8"


# If you have any plugins, put them here!
group :jekyll_plugins do
  gem 'jekyll-sitemap'
  gem 'jekyll-seo-tag'
end

group :jekyll_plugins, :test do
  gem "jekyll-assets", "~> 3.0", ">= 3.0.12"
end

group :development, :test do
  gem "rspec"
  gem 'selenium-webdriver'
  gem 'webdrivers'
  gem "capybara"
  gem "rack-jekyll"
  gem 'pry'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.0" if Gem.win_platform?

gem "html-proofer", "~> 3.10", ">= 3.10.1"
