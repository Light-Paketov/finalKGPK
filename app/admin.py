from django.contrib import admin

from .models import Computer, Team, Tasks, Round, Result

class TeamAdmin(admin.ModelAdmin):
	list_display = ('teamName',)

class ComputerAdmin(admin.ModelAdmin):
	list_display = ('pcNumber','team')
		
class TasksAdmin(admin.ModelAdmin):
	list_display = ('round','title', 'content','task_rating',"test_input", "test_output")

class RoundAdmin(admin.ModelAdmin):
	list_display = ('active','title','computer')

class ResultAdmin(admin.ModelAdmin):
	list_display = ('computer', 'round', 'task_title','language', 'task_content', 'result', 'rating','time')


admin.site.register(Computer, ComputerAdmin)
admin.site.register(Team, TeamAdmin)
admin.site.register(Tasks, TasksAdmin)
admin.site.register(Round, RoundAdmin)
admin.site.register(Result, ResultAdmin)
