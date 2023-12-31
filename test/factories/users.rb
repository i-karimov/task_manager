# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    first_name
    last_name
    password
    email
    avatar { 'MyString' }
    type { '' }

    factory :developer do
      type { 'Developer' }
    end

    factory :admin do
      type { 'Admin' }
    end

    factory :manager do
      type { 'Manager' }
    end
  end
end
