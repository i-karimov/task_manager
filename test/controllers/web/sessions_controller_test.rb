# frozen_string_literal: true

require 'test_helper'

module Web
  class SessionsControllerTest < ActionController::TestCase
    test 'should post create' do
      password = generate(:string)
      user = create(:user, { password: password })
      attrs = {
        email: user.email,
        password: password
      }
      post :create, params: { session_form: attrs }
      assert_response :redirect
    end

    test 'should delete destroy' do
      delete :destroy
      assert_response :redirect
    end
  end
end
