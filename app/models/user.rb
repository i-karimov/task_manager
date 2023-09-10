# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password

  has_many :my_tasks, class_name: 'Task', foreign_key: :author_id
  has_many :assigned_tasks, class_name: 'Task', foreign_key: :assignee_id

  def self.ransackable_attributes(_auth_object = nil)
    %w[avatar created_at email first_name id last_name password_digest type updated_at]
  end
end
