class Api::ApplicationController < ApplicationController
  include AuthHelper
  helper_method :current_user

  def self.responder
    JsonResponder
  end
end
