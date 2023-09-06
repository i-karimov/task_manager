# frozen_string_literal: true

FactoryBot.define do
  sequence :string, aliases: %i[first_name last_name password] do |n|
    "string#{n}"
  end
end
