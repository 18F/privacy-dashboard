# Require all of the necessary gems
require 'rspec'
require 'capybara/rspec'
require 'rack/jekyll'
require 'pry'


RSpec.configure do |config|
  config.example_status_persistence_file_path = 'spec/failures'

  Capybara.default_driver = :selenium_chrome_headless
  Capybara.javascript_driver = :selenium_chrome_headless

  # force JEKYLL_ENV=test onto test builds
  system('JEKYLL_ENV=test bundle exec jekyll build')
  Capybara.app = Rack::Jekyll.new
  
  Capybara.server = :webrick
end