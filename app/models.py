from django.db import models
from datetime import timedelta


# python manage.py dumpdata app.Round > fixtures/Round.json
# python manage.py dumpdata app.Tasks > fixtures/Tasks.json

# python manage.py loaddata fixtures/Round.json
# python manage.py loaddata fixtures/Tasks.json

class Team(models.Model):
    teamName = models.CharField(max_length=10, unique=True)


class Computer(models.Model):
    pcNumber = models.CharField(max_length=10)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)


class Round(models.Model):
    active = models.BooleanField(default=False, null=True)
    title = models.CharField(max_length=10, unique=True)
    computer = models.ForeignKey(Computer, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.title

    @classmethod
    def activate_next_round(cls, current_round):
        # Деактивируем текущий раунд
        current_round.active = False
        current_round.save()

        # Находим следующий раунд
        next_round = cls.objects.filter(id__gt=current_round.id).first()

        if next_round:
            # Активируем следующий раунд
            next_round.active = True
            next_round.save()

        return next_round


class Tasks(models.Model):
    round = models.ForeignKey(Round, on_delete=models.CASCADE)
    title = models.CharField(max_length=10, unique=True)
    content = models.TextField(unique=True)
    input_data = models.TextField()
    output_data = models.TextField()
    task_rating = models.IntegerField(default=0)
    test_output = models.TextField(default="0")
    test_input = models.TextField(default="0")

    def __str__(self):
        return self.title


class Result(models.Model):
    computer = models.ForeignKey(Computer, on_delete=models.CASCADE)
    round = models.ForeignKey(Round, on_delete=models.CASCADE, related_name='round_title_result')
    task_title = models.ForeignKey(Tasks, on_delete=models.CASCADE, related_name='task_title_result')
    language = models.TextField(null=True, default='PASCAL ABC')
    task_content = models.ForeignKey(Tasks, on_delete=models.CASCADE, related_name='task_content_result')
    result = models.TextField(null=True, default=None)
    rating = models.IntegerField(null=True, default=0)
    comment = models.TextField(null=True, default="None")
    time = models.TextField(null=True, default="00:00")

    def __str__(self):
        return f"{self.computer} - {self.task_title} - {self.result} - {self.task_content} - {self.comment} "
