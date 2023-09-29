# frozen_string_literal: true

class UserMailer < ApplicationMailer
  default from: 'noreply@taskmanager.com'

  def task_created
    @user = params[:user]
    @task = params[:task]

    mail(from: 'noreply@taskmanager.com', to: @user.email, subject: 'New Task Created')
  end
end
