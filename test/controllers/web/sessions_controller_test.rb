# frozen_string_literal: true

require 'test_helper'

module Web
  class SessionsControllerTest < ActionController::TestCase
    test 'should get new' do
      get :new
      assert_response :success
    end
  end
end
