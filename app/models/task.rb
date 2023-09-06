class Task < ApplicationRecord
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
      transition new_task: :in_archive
    end

    event :start_test do
      transition in_development: :in_qa
    end

    event :send_back do
      transition in_qa: :in_development
    end

    event :review do
      transition in_qa: :code_review
    end

    event :prepare_for_release do
      transition code_review: :ready_for_release
    end

    event :unapprove do
      transition code_review: :unapprove
    end
  end
end
