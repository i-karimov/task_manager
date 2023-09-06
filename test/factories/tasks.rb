# frozen_string_literal: true

FactoryBot.define do
  factory :task do
    name { 'MyString' }
    description { 'MyText' }
    association :author, factory: :manager
    association :assignee, factory: :developer
    expired_at { '2023-09-06' }
  end
end
