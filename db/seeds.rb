# frozen_string_literal: true

# admin = Admin.find_or_create_by(first_name: 'admin', last_name: 'admin', email: 'admin@localhost')
# admin.password = 'admin'
# admin.save

# 60.times do |i|
#   u = [Manager, Developer].sample.new
#   u.email = "email#{i}@mail.gen"
#   u.first_name = "FN#{i}"
#   u.last_name = "LN#{i}"
#   u.password = "#{i}"
#   u.save
# end

authors = Manager.all
assignees = Developer.all
states = Task.state_machine.states.keys

100.times do
  the_task = FactoryBot.build(:task)
  the_task.state = states.sample
  the_task.author = authors.sample
  the_task.assignee = assignees.sample
  the_task.save
end

Task.order(:id).find_each.with_index do |task, ix|
  task.update(id: ix, name: "Task #{ix + 1}")
end
