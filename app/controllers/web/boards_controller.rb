# frozen_string_literal: true

module Web
  class BoardsController < Web::ApplicationController
    before_action :authenticate_user!

    def show
      puts '=' * 100
      render react_component: 'TaskBoard', props: {}
    end
  end
end
