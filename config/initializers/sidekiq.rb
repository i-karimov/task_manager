# frozen_string_literal: true

require 'sidekiq/web'
require 'sidekiq_unique_jobs/web'


Sidekiq.configure_server do |config|
  config.redis = { url: ENV['REDIS_URL'] }
end

Sidekiq.configure_client do |config|
  config.redis = { url: ENV['REDIS_URL'] }
end
