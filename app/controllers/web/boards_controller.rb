# frozen_string_literal: true

module Web
  class BoardsController < Web::ApplicationController
    before_action :authenticate_user!

    def index; end

    def show; end
  end
end
