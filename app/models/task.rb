# frozen_string_literal: true

class Task < ApplicationRecord
  def self.ransackable_attributes(_auth_object = nil)
    %w[assignee_id author_id created_at description expired_at id name state updated_at]
  end

  belongs_to :author, class_name: 'User'
  belongs_to :assignee, class_name: 'User', optional: true

  validates :name, presence: true
  validates :description, presence: true
  validates :author, presence: true
  validates :description, length: { maximum: 500 }

  state_machine initial: :new_task do
    event :start_development do
      transition new_task: :in_development
    end

    event :archive do
      transition new_task: :archived
    end

    event :start_test do
      transition in_development: :in_qa
    end

    event :send_back do
      transition in_qa: :in_development
    end

    event :review do
      transition in_qa: :in_code_review
    end

    event :prepare_for_release do
      transition in_code_review: :ready_for_release
    end

    event :unapprove do
      transition in_code_review: :in_development
    end

    event :release do
      transition in_code_review: :released
    end
  end
end
