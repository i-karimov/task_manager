# frozen_string_literal: true

class TestFailuresJob
  include Sidekiq::Worker

  def perform
    raise
  end
end
