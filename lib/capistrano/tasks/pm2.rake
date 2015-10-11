require 'json'

set :app_command, 'server.js'

namespace :pm2 do
  def start_app
    within current_path do
      execute :pm2, :start, fetch(:app_command)
    end
  end

  def restart_app
    within current_path do
      execute :pm2, :restart, fetch(:app_command)
    end
  end

  def stop_app
    within current_path do
      execute :pm2, :stop, fetch(:app_command)
    end
  end

  def force_stop_app
    within current_path do
      execute :pm2, :stop, fetch(:app_command), '--force'
    end
  end

  def graceful_reload_app
    within current_path do
      execute :pm2, :gracefulReload, fetch(:app_command)
    end
  end

  def delete_app
    within current_path do
      execute :pm2, :delete, fetch(:app_command)
    end
  end

  def app_status
    within current_path do
      ps = JSON.parse(capture :pm2, :jlist, fetch(:app_command))
      if ps.empty?
        return nil
      else
        # status: online, errored, stopped
        return ps[0]["pm2_env"]["status"]
      end
    end
  end

  desc 'Start app'
  task :start do
    on roles(:app) do
      start_app
    end
  end

  desc 'Stop app'
  task :stop do
    on roles(:app) do
      stop_app
    end
  end

  desc 'Restart app gracefully'
  task :restart do
    on roles(:app) do
      case app_status
      when nil
        info 'App is not registerd'
        start_app
      when 'stopped'
        info 'App is stopped'
        restart_app
      when 'errored'
        info 'App has errored'
        restart_app
      when 'online'
        info 'App is online'
        graceful_reload_app
      end
    end
  end

  desc 'Stop app immediately'
  task :force_stop do
    on roles(:app) do
      force_stop_app
    end
  end

  desc 'Delete app'
  task :delete do
    on roles(:app) do
      delete_app
    end
  end
end