# frozen_string_literal: true

require 'js-routes'

namespace :js_routes do
  desc 'Generate js routes for webpack'
  task generate: :environment do
    # TODO: refactor with env variable $WORK_DIR
    # ROUTES_DIR = File.join('app', 'javascript', 'routes')
    # FileUtils.mkdir_p(Rails.root.join(ROUTES_DIR))
    # file_name = File.join(ROUTES_DIR, 'ApiRoutes.js')

    JsRoutes.generate!('/rails_app/app/javascript/routes/ApiRoutes.js', camel_case: true)
  end
end
