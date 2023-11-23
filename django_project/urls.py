"""django_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from app.views import login, index, create_folder, result, adminPanel, wait, active_next_round, save_estimation, results, save_time

#�������
urlpatterns = [
	path('admin/', admin.site.urls),
	path('adminPanel/', adminPanel, name='adminPanel'),
	path('save_estimation/', save_estimation, name='save_estimation'),
	path('active_next_round/',active_next_round,name='active_next_round'),
	path('results/', results, name='results'),
	path('save_time/', save_time, name='save_time'),
]

#����� � �����������
urlpatterns += [
	path('', login, name="login"),
	path('index/', index, name='index'),
	path('wait/', wait, name='wait')
]

urlpatterns += [
	path('create_folder/',create_folder, name='create_folder'),
	path('result/', result, name ="result")
]
