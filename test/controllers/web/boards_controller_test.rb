# frozen_string_literal: true

require 'test_helper'

module Web
  class BoardsControllerTest < ActionController::TestCase
    setup do
      user = create(:user)
      sign_in user
    end

    test 'should get new' do
      get :show
      assert_response :success
    end
  end
end
