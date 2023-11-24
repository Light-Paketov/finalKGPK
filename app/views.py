from cgi import test
from cmath import log
from django.conf import settings
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render, redirect

from .forms import EstimationForm
from .models import Team, Computer, Round, Tasks, Result
import os

def adminPanel(request):
    context = request.session.get('context', {})
    team = context.get('team', None)
    
    computers = Computer.objects.filter(team__teamName=team)
    # Получаем все задания
    
    all_tasks = []
    for i in range(len(computers)):
        all_tasks.append(Result.objects.filter(computer=computers[i]))

    con = {
        'computers': computers,
        'all_tasks': all_tasks,
        'title': 'Панель администратора',
        'team' : team
    }
    context={
       'team' : team 
    }

    request.session['context'] = context

    return render(request, 'app/adminPanel.html', con)


def save_estimation(request):
    if request.method == 'POST':
        result_id = request.POST.get('result_id')
        rating = request.POST.get('rating')

        # Преобразуйте rating в число (если это не пустая строка)
        rating = int(rating) if rating.strip() else None

        # Используйте метод get с пустой строкой в качестве значения по умолчанию
        comment = request.POST.get('comment', '')

        # Обновление данных
        Result.objects.filter(id=result_id).update(rating=rating, comment=comment)

    return redirect('adminPanel')

def save_time(request): #====================================
    user = request.session.get('user', {})
    login = user.get('login', None)
    password = user.get('password', None)
    computer = Computer.objects.get(team__teamName=login,pcNumber=password)
    if request.method == 'POST':
        timer_value = request.POST.get('timer_value')
        print(timer_value)
        Result.objects.filter(computer=computer ).update(time=timer_value)

        return HttpResponse('Данные успешно сохранены')
    else:
        return HttpResponse('Метод не разрешен')

def active_next_round(request):
    active_round = Round.objects.get(active=True)
    Round.activate_next_round(active_round)
    return redirect('adminPanel')

def login(request):
    context = {
        'title': 'Войти'
    }

    return render(request, 'app/login.html', context)

def create_folder(request):
    if request.method == 'POST':

        team_name = request.POST.get('teamName')
        pc_number = request.POST.get('pcNumber')

        if team_name == 'Команда - 28' and pc_number == '99' or team_name == 'Команда - 27' and pc_number == '99' or team_name == 'Команда - 26' and pc_number == '99':
            context = {'team':team_name, 'pc_number':pc_number}
            request.session['context'] = context
            return redirect('adminPanel')

        else:
            # Путь к папке team_name
            team_folder_path = os.path.join(settings.MEDIA_ROOT, team_name)

            # Если папка team_name не существует, создаем ее
            if not os.path.exists(team_folder_path):
                os.makedirs(team_folder_path, exist_ok=True)

            # Путь к папке pc_number
            pc_number_path = os.path.join(team_folder_path,pc_number)

            # Если папка pc_number не существует, создаем
            if not os.path.exists(pc_number_path):
                os.makedirs(pc_number_path, exist_ok=True)

            # Проверяем наличие команды с указанным именем
            existing_team = Team.objects.filter(teamName=team_name).first()

            if not existing_team:
                # Если команды нет, создаем новую
                team = Team.objects.create(teamName=team_name)
            else:
                team = existing_team  # Используем существующую команду

            # Проверяем, существует ли компьютер с указанным номером внутри команды
            computer = Computer.objects.filter(pcNumber=pc_number, team=team).first()

            if not computer:
                # Если компьютер не существует, создаем его
                computer = Computer.objects.create(pcNumber=pc_number, team=team)

            context = {
                'title': 'Главная',
                'result_path': pc_number_path,
            }
            request.session['context'] = context

            # Возвращаем результат с контекстом
            return redirect('index')


def index(request):
    # Получаем текущий активный раунд
    active_round = Round.objects.get(active=True)

    task_id = request.GET.get('task_id')
    if task_id == None:
        task_id = 1
    else:
        task_id = int(task_id)

    context = request.session.get('context', {})
    result_path = context.get('result_path', None)

    active_round_tasks = Tasks.objects.filter(round=active_round)
    active_round = Round.objects.filter(active=True)

    path_parts = result_path.split(os.path.sep)
    team = path_parts[-2]
    computer = path_parts[-1]

    computer = Computer.objects.get(pcNumber=computer, team__teamName=team)
    result = Result.objects.filter(computer=computer)

    active_round_task_list = [0,1,2,3,4]

    # test_inputs=[]
    #
    # for i in range(1,11):
    #     test_inputs.append(Tasks.objects.get(id=i).test_input.split('/'))
    #
    #
    # test_outputs=[]
    #
    # for i in range(1,11):
    #     test_outputs.append(Tasks.objects.get(id=i).test_output.split('/'))
    
    login = path_parts[-2]
    password = path_parts[-1]

    context = {'login':login, 'password':password, 'title': 'Главная', 'results': result, 'active_round': active_round, 'active_task_id': task_id,
               'active_round_tasks': active_round_tasks, 'active_round_task_list' : active_round_task_list}

    user = {
        'login' : login,
        'password' : password
    }
    request.session['user'] = user

    active_task = {'active_task_id': task_id}
    request.session['active_task'] = active_task

    computer = path_parts[-1]
    check_result = {
        'computer': computer,
    }
    request.session['check_result'] = check_result

    return render(request, 'app/index.html', context)

def results(request):
    check_result = request.session.get('check_result', {})
    computer = check_result.get('computer', None)
    results = Result.objects.filter(computer__pcNumber=computer)
    rounds = Round.objects.all()

    context = {
        'computers': computer,
        'results': results,
        'rounds': rounds,
        'title': 'Посмотреть результаты',
    }
    return render(request, 'app/results.html', context)

def wait(request):
    return render(request, 'app/Ожидание.html')


def result(request):
    round = Round.objects.get(active=True)

    round_id = request.POST.get('round_id')

    active_task = request.session.get('active_task', {})
    active_task_id = active_task.get('active_task_id', None)

    if request.method == 'POST':
        titles = request.POST.getlist('title[]')
        contents = request.POST.getlist('content[]')
        languages = request.POST.getlist('language')
        result = request.POST.get('result')
    title = titles[active_task_id-1]
    content = contents[active_task_id-1]
    language = languages[active_task_id-1]
    # if 0 <= active_task_id < len(titles):
    #     title = titles[active_task_id]
    #     content = contents[active_task_id]
    # else:
    #     title = titles[active_task_id - (5 * (int(round_id) - 2)) - 1]
    #     content = contents[active_task_id - (5 * (int(round_id) - 2)) - 1]

    context = request.session.get('context', {})
    result_path = context.get('result_path', None)

    save_result(round, title, content,language, result, result_path)

    return redirect('index')


def save_result(round, task_title, task_content,language, result, result_path):
    path = result_path

    result_path = os.path.join(path, task_title)
    with open(result_path + f'_{language}.txt', 'w',  encoding='utf-8') as file:
        file.write(result)

    path_parts = path.split(os.path.sep)

    team = path_parts[-2]
    computer = path_parts[-1]

    try:
        computer = Computer.objects.get(pcNumber=computer, team__teamName=team)
    except Computer.DoesNotExist:
        computer = None

    try:
        task_title_db = Tasks.objects.get(title=task_title)
    except Tasks.DoesNotExist:
        task_title_db = None
    
    try:
        task_content_db = Tasks.objects.get(content=task_content)
    except Tasks.DoesNotExist:
        task_content_db = None

    values_for_update = {'result': result}

    obj, created = Result.objects.update_or_create(
        computer=computer,
        round=round,
        task_title=task_title_db,
        language = language,
        task_content=task_content_db,
        defaults=values_for_update
    )
