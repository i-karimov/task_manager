# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.1.1'

gem 'pg', '~> 1.1'
gem 'puma', '~> 5.0'
gem 'rails', '~> 7.0.8'
gem 'sass-rails', '>= 6'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.7'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use Active Storage variant
# gem 'image_processing', '~> 1.2'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.4.4', require: false

group :development, :test do
  gem 'bullet'
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'factory_bot_rails'
  gem 'ffaker', '~> 2.22'
  gem 'rubocop'
end

group :development do
  gem 'foreman'
  gem 'letter_opener'
  gem 'letter_opener_web'
  gem 'listen', '~> 3.3'
  gem 'pp_sql'
  gem 'pry-rails'
  gem 'rack-mini-profiler', '~> 2.0'
  gem 'web-console', '>= 4.1.0'
end

group :test do
  gem 'capybara', '>= 3.26'
  gem 'selenium-webdriver', '>= 4.0.0.rc1'
  gem 'simplecov', require: false
  gem 'webdrivers', '= 5.3.0'
end

gem 'active_model_serializers'
gem 'bcrypt', '~> 3.1.7'
gem 'coveralls_reborn', require: false
gem 'cssbundling-rails', '~> 1.0'
gem 'jsbundling-rails', '~> 1.0'
gem 'js-routes'
gem 'kaminari'
gem 'newrelic_rpm'
gem 'ransack'
gem 'responders'
gem 'rollbar'
gem 'sidekiq'
gem 'simple_form'
gem 'slim-rails'
gem 'sprockets-rails', '~> 3.4'
gem 'state_machines'
gem 'state_machines-activerecord'
gem 'stimulus-rails'
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
