# frozen_string_literal: true

FactoryBot.define do
  factory :task do
    name
    description { FFaker::LoremRU.sentence }
    association :author, factory: :manager
    association :assignee, factory: :developer
    expired_at
  end
end
