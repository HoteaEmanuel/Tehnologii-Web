from django.shortcuts import render, HttpResponse


def loadingscreen(request):
    return render(request, "./html/loading.html")


def login(request):
    return render(request, "./html/login.html")


def register(request):
    return render(request, "./html/register.html")


def home(request):
    return render(request, "./html/home.html")


def universities(request):
    return render(request, "./html/universities.html")


def galerie(request):
    return render(request, "./html/galerie.html")


def chatbot(request):
    return render(request, "./html/chatbot.html")


def characters(request):
    return render(request, "./html/characters.html")
