# frozen_string_literal: true

module Web
  class ApplicationController < ApplicationController
    include Concerns::AuthHelper
    helper_method :current_user
  end
end
