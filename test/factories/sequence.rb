# frozen_string_literal: true

FactoryBot.define do
  sequence :string, aliases: %i[first_name last_name password name description] do |n|
    "string#{n}"
  end

  sequence(:email) { "#{SecureRandom.uuid.gsub('-', '')}@mail.com" }

  # sequence :date, aliases: %i[expired_at] do
  #   rand(2.years).seconds.from_now.strftime('%F')
  # end

  sequence :date, aliases: %i[expired_at] do
    rand(2.years).seconds.from_now.to_date
  end
end
